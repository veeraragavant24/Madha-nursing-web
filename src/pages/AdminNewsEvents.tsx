import { useEffect, useMemo, useState } from 'react'
import { localDateStr, isUpcomingDate } from '../lib/dates'
import { EVENT_IMAGE_FALLBACK, type NewsEventRow } from '../lib/newsEvents'

const API_BASE =

  'https://invisible-beverly-casting-teens.trycloudflare.com/api'

function getEventImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return EVENT_IMAGE_FALLBACK

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl.replace(
      /^http:\/\/localhost:5021/i,
      API_BASE.replace(/\/api$/, ''),
    )
  }

  return `${API_BASE.replace(/\/api$/, '')}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
}

function getAdminToken() {
  return localStorage.getItem('adminToken')
}

async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = getAdminToken()

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...(options.headers || {}),
    },
  })

  if (response.status === 401 || response.status === 403) {
    throw new Error('UNAUTHORIZED')
  }

  if (!response.ok) {
    let message = 'API request failed.'

    try {
      const data = await response.json()
      message = data?.message || data?.title || message
    } catch {
      // ignore invalid JSON
    }

    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}


interface Props {
  goToLogin: () => void
  goHome: () => void
}

type StatusFilter = 'all' | 'upcoming' | 'expired' | 'published' | 'draft'
type FormMode = 'create' | 'edit'

interface FormState {
  title: string
  description: string
  category: string
  event_date: string
  location: string
  image_url: string
  published: boolean
  featured: boolean
}

const emptyForm: FormState = {
  title: '',
  description: '',
  category: '',
  event_date: '',
  location: '',
  image_url: '',
  published: true,
  featured: false,
}

function eventLifecycle(e: NewsEventRow): 'upcoming' | 'expired' | 'draft' {
  if (!e.published) return 'draft'
  return isUpcomingDate(e.event_date) ? 'upcoming' : 'expired'
}

export default function AdminNewsEvents({ goToLogin, goHome }: Props) {
  const [authState, setAuthState] = useState<'loading' | 'ok' | 'denied'>('loading')
  const [events, setEvents] = useState<NewsEventRow[]>([])
  const [fetching, setFetching] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<FormMode>('create')
  const [formEventId, setFormEventId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<NewsEventRow | null>(null)
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    if (!notice) return
    const t = setTimeout(() => setNotice(null), 4000)
    return () => clearTimeout(t)
  }, [notice])

  async function fetchEvents() {
  setFetching(true)

  try {
    const data = await apiRequest('/news-events')

    const mapped: NewsEventRow[] = (data ?? [])
      .map((event: any) => ({
        id: event.id,
        title: event.title,
        description: event.description ?? null,
        category: event.category ?? null,
        event_date: event.eventDate
          ? event.eventDate.split('T')[0]
          : '',
        location: event.location ?? null,
        image_url: event.imageUrl ?? null,
        published: Boolean(event.published),
        featured: Boolean(event.featured),
        created_at: event.createdAt,
        updated_at: event.updatedAt ?? null,
      }))
      .sort(
        (a: NewsEventRow, b: NewsEventRow) =>
          b.event_date.localeCompare(a.event_date)
      )

    setEvents(mapped)
  } catch (error) {
    console.error('News Events API error:', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      goToLogin()
      return
    }

    setNotice({
      type: 'error',
      message: 'Unable to load events.',
    })
  } finally {
    setFetching(false)
  }
}

  useEffect(() => {
  let cancelled = false

  async function boot() {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      if (!cancelled) {
        goToLogin()
      }
      return
    }

    try {
      if (!cancelled) {
        setAuthState('ok')
      }

      await fetchEvents()
    } catch (error) {
      console.error('Admin dashboard error:', error)

      if (!cancelled) {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        setAuthState('denied')
      }
    }
  }

  boot()

  return () => {
    cancelled = true
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  const counts = useMemo(() => ({
    total: events.length,
    upcoming: events.filter(e => eventLifecycle(e) === 'upcoming').length,
    expired: events.filter(e => eventLifecycle(e) === 'expired').length,
    published: events.filter(e => e.published).length,
    draft: events.filter(e => !e.published).length,
  }), [events])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return events.filter(e => {
      const matchesQ = !q
        || e.title.toLowerCase().includes(q)
        || (e.location ?? '').toLowerCase().includes(q)
        || (e.category ?? '').toLowerCase().includes(q)
      const matchesS = statusFilter === 'all' || eventLifecycle(e) === statusFilter
      return matchesQ && matchesS
    })
  }, [events, search, statusFilter])

  function openCreate() {
    setFormMode('create')
    setFormEventId(null)
    setForm({ ...emptyForm, event_date: localDateStr() })
    setPreviewUrl('')
    setFormError(null)
    setFormOpen(true)
  }

  function openEdit(e: NewsEventRow) {
    setFormMode('edit')
    setFormEventId(e.id)
    setForm({
      title: e.title,
      description: e.description ?? '',
      category: e.category ?? '',
      event_date: e.event_date,
      location: e.location ?? '',
      image_url: e.image_url ?? '',
      published: e.published,
      featured: e.featured,
    })
    setPreviewUrl(getEventImageUrl(e.image_url))
    setFormError(null)
    setFormOpen(true)
  }

 async function handleImageUpload(file: File) {
  const allowed = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ]

  if (!allowed.includes(file.type)) {
    setFormError('Only JPG, PNG or WEBP images are allowed.')
    return
  }

  const maxSize = 20 * 1024 * 1024

  if (file.size > maxSize) {
    setFormError('Image must be 20 MB or smaller.')
    return
  }

  setFormError(null)
  setUploading(true)

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(
      'https://invisible-beverly-casting-teens.trycloudflare.com/api/news-events/upload',
      {
        method: 'POST',
        body: formData,
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data?.message || 'Image upload failed.'
      )
    }

    const imageUrl = `https://invisible-beverly-casting-teens.trycloudflare.com${data.imageUrl}`

    setPreviewUrl(imageUrl)

    setForm((current) => ({
      ...current,
      image_url: imageUrl,
    }))
  } catch (error) {
    console.error('Image upload error:', error)

    setFormError(
      error instanceof Error
        ? error.message
        : 'Unable to upload image.'
    )
  } finally {
    setUploading(false)
  }
}

  async function handleSave(e: React.FormEvent) {
  e.preventDefault()

  if (!form.title.trim() || !form.event_date) {
    setFormError('Title and date are required.')
    return
  }

  setSaving(true)
  setFormError(null)

  try {
    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category.trim() || null,
      eventDate: form.event_date,
      location: form.location.trim() || null,
      imageUrl: form.image_url.trim() || null,
      published: form.published,
      featured: form.featured,
    }

    if (formMode === 'edit' && formEventId) {
      await apiRequest(`/news-events/${formEventId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })

      setNotice({
        type: 'success',
        message: 'Event updated.',
      })
    } else {
      await apiRequest('/news-events', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      setNotice({
        type: 'success',
        message: 'Event created.',
      })
    }

    setFormOpen(false)
    await fetchEvents()

  } catch (error) {
    console.error('Save event error:', error)

    if (
      error instanceof Error &&
      error.message === 'UNAUTHORIZED'
    ) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      goToLogin()
      return
    }

    setFormError(
      error instanceof Error
        ? error.message
        : 'Unable to save the event. Please try again.'
    )
  } finally {
    setSaving(false)
  }
}

  async function handleTogglePublished(e: NewsEventRow) {
  setBusyId(e.id)

  try {
    await apiRequest(`/news-events/${e.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: e.title,
        description: e.description,
        category: e.category,
        eventDate: e.event_date,
        location: e.location,
        imageUrl: e.image_url,
        published: !e.published,
        featured: e.featured,
      }),
    })

    await fetchEvents()

    setNotice({
      type: 'success',
      message: e.published
        ? 'Event unpublished.'
        : 'Event published.',
    })

  } catch (error) {
    console.error('Publish status error:', error)

    if (
      error instanceof Error &&
      error.message === 'UNAUTHORIZED'
    ) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      goToLogin()
      return
    }

    setNotice({
      type: 'error',
      message: 'Unable to update publish status.',
    })

  } finally {
    setBusyId(null)
  }
}

  async function handleDeleteConfirm() {
  if (!deleteTarget) return

  setDeleting(true)

  try {
    await apiRequest(`/news-events/${deleteTarget.id}`, {
      method: 'DELETE',
    })

    setDeleteTarget(null)

    await fetchEvents()

    setNotice({
      type: 'success',
      message: 'Event deleted.',
    })

  } catch (error) {
    console.error('Delete event error:', error)

    if (
      error instanceof Error &&
      error.message === 'UNAUTHORIZED'
    ) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      goToLogin()
      return
    }

    setNotice({
      type: 'error',
      message: 'Unable to delete the event.',
    })

  } finally {
    setDeleting(false)
  }
}

 function handleLogout() {
  localStorage.removeItem('adminToken')
  localStorage.removeItem('adminUser')

  goToLogin()
}

  return (
    <div className="admin-page">
      <style>{`
  .admin-page {
    min-height: 100vh;
    background: #F3F7FB;
    font-family: var(--font-sans);
  }

  /* ---------- Top bar ---------- */
  .admin-topbar {
    background: linear-gradient(160deg, #071A36 0%, #0B2545 100%);
    padding: 18px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .admin-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .admin-brand-mark {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, #18C6C8 0%, #10A9AC 100%);
    color: #062B3A;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .admin-brand-name {
    color: #ffffff;
    font-size: 17px;
    font-weight: 800;
    letter-spacing: .02em;
    line-height: 1.2;
  }

  .admin-brand-sub {
    color: rgba(255,255,255,.6);
    font-size: 12px;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .admin-topbar-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .admin-top-btn {
    padding: 10px 18px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 14px;
    transition: transform .2s, box-shadow .2s, opacity .2s;
  }

  .admin-top-btn.site {
    background: rgba(255,255,255,.12);
    color: #ffffff;
  }

  .admin-top-btn.site:hover {
    background: rgba(255,255,255,.2);
  }

  .admin-top-btn.logout {
    background: #ffffff;
    color: #0B2545;
  }

  .admin-top-btn.logout:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(0,0,0,.2);
  }

  .admin-top-btn:disabled {
    opacity: .7;
    cursor: not-allowed;
  }

  /* ---------- Layout ---------- */
  .admin-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 36px 32px 80px;
  }

  .admin-heading-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 26px;
    flex-wrap: wrap;
  }

  .admin-title {
    font-size: 26px;
    font-weight: 800;
    color: #0B2545;
    letter-spacing: -.01em;
    margin: 0;
  }

  .admin-title-teal {
    color: #18C6C8;
  }

  .admin-add-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 24px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    background: linear-gradient(135deg, #18C6C8 0%, #10A9AC 100%);
    color: #062B3A;
    font-family: var(--font-sans);
    font-weight: 800;
    font-size: 15px;
    box-shadow: 0 12px 28px rgba(24,198,200,.35);
    transition: transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s;
  }

  .admin-add-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 34px rgba(24,198,200,.45);
  }

  /* ---------- Stats ---------- */
  .admin-stats {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 26px;
  }

  .admin-stat {
    background: #ffffff;
    border: 1px solid rgba(11,37,69,.07);
    border-radius: 16px;
    padding: 18px 20px;
    box-shadow: 0 8px 22px rgba(11,37,69,.05);
  }

  .admin-stat-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #64748B;
    margin-bottom: 6px;
  }

  .admin-stat-value {
    font-size: 28px;
    font-weight: 800;
    color: #0B2545;
    line-height: 1;
  }

  /* ---------- Toolbar ---------- */
  .admin-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .admin-search {
    flex: 1;
    min-width: 200px;
    position: relative;
  }

  .admin-search svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #94A3B8;
    pointer-events: none;
  }

  .admin-search-input {
    width: 100%;
    padding: 12px 14px 12px 40px;
    border: 1px solid rgba(11,37,69,.14);
    border-radius: 12px;
    background: #ffffff;
    font-family: var(--font-sans);
    font-size: 15px;
    color: #0B2545;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }

  .admin-search-input:focus {
    border-color: #18C6C8;
    box-shadow: 0 0 0 3px rgba(24,198,200,.16);
  }

  .admin-filter-select {
    padding: 12px 14px;
    border: 1px solid rgba(11,37,69,.14);
    border-radius: 12px;
    background: #ffffff;
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 600;
    color: #0B2545;
    cursor: pointer;
    outline: none;
  }

  /* ---------- Table ---------- */
  .admin-table-card {
    background: #ffffff;
    border: 1px solid rgba(11,37,69,.07);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(11,37,69,.06);
    overflow: hidden;
  }

  .admin-row {
    display: grid;
    grid-template-columns: 64px minmax(0, 2.2fr) 120px minmax(0, 1.2fr) 130px 190px;
    gap: 16px;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(11,37,69,.06);
  }

  .admin-row.header {
    background: #F8FAFD;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: #64748B;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .admin-row:last-child {
    border-bottom: none;
  }

  .admin-row.body {
    transition: background .2s;
  }

  .admin-row.body:hover {
    background: #FAFCFE;
  }

  .admin-thumb {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    object-fit: cover;
    background: #E9EEF6;
    display: block;
  }

  .admin-cell-title {
    font-weight: 700;
    font-size: 15px;
    color: #0B2545;
    line-height: 1.35;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .admin-cell-sub {
    font-size: 13px;
    color: #64748B;
    margin-top: 2px;
  }

  .admin-star {
    color: #18C6C8;
    flex-shrink: 0;
  }

  .admin-cell-muted {
    font-size: 14px;
    color: #334155;
  }

  .admin-cell-loc {
    font-size: 14px;
    color: #334155;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .admin-pills {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
  }

  .admin-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .06em;
    text-transform: uppercase;
  }

  .admin-pill.published {
    background: rgba(22,163,74,.12);
    color: #15803D;
  }

  .admin-pill.draft {
    background: rgba(245,158,11,.16);
    color: #B45309;
  }

  .admin-pill.upcoming {
    background: rgba(37,99,235,.12);
    color: #1D4ED8;
  }

  .admin-pill.expired {
    background: rgba(100,116,139,.14);
    color: #475569;
  }

  .admin-actions {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: flex-end;
  }

  .admin-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 13px;
    border-radius: 10px;
    border: 1px solid rgba(11,37,69,.12);
    background: #ffffff;
    cursor: pointer;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 13px;
    color: #0B2545;
    transition: background .2s, border-color .2s, transform .2s;
  }

  .admin-action-btn:hover {
    border-color: #18C6C8;
    transform: translateY(-1px);
  }

  .admin-action-btn.pub:hover {
    background: rgba(24,198,200,.08);
  }

  .admin-action-btn.del {
    color: #B91C1C;
    border-color: rgba(220,38,38,.2);
  }

  .admin-action-btn.del:hover {
    background: #FEF2F2;
    border-color: rgba(220,38,38,.4);
  }

  .admin-action-btn:disabled {
    opacity: .6;
    cursor: not-allowed;
    transform: none;
  }

  .admin-spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(11,37,69,.2);
    border-top-color: #0B2545;
    border-radius: 50%;
    animation: admin-spin .7s linear infinite;
  }

  @keyframes admin-spin {
    to { transform: rotate(360deg); }
  }

  .admin-empty {
    padding: 64px 24px;
    text-align: center;
    color: #64748B;
    font-size: 15px;
  }

  .admin-empty strong {
    color: #0B2545;
  }

  /* ---------- Loading / states ---------- */
  .admin-state {
    max-width: 640px;
    margin: 90px auto;
    background: #ffffff;
    border: 1px solid rgba(11,37,69,.08);
    border-radius: 20px;
    box-shadow: 0 20px 50px rgba(11,37,69,.08);
    padding: 56px 44px;
    text-align: center;
  }

  .admin-state-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 18px;
    border-radius: 50%;
    background: rgba(24,198,200,.12);
    color: #18C6C8;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .admin-state-title {
    font-size: 20px;
    font-weight: 800;
    color: #0B2545;
    margin-bottom: 8px;
  }

  .admin-state-sub {
    font-size: 14px;
    line-height: 1.7;
    color: #64748B;
    margin-bottom: 20px;
  }

  .admin-state code {
    display: block;
    background: #F1F5F9;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 13px;
    color: #0B2545;
    margin-bottom: 18px;
    word-break: break-all;
  }

  /* ---------- Modal ---------- */
  .admin-overlay {
    position: fixed;
    inset: 0;
    background: rgba(7,26,54,.5);
    z-index: 2000;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 40px 16px;
    overflow-y: auto;
  }

  .admin-modal {
    width: 100%;
    max-width: 560px;
    background: #ffffff;
    border-radius: 22px;
    box-shadow: 0 40px 90px rgba(0,0,0,.3);
    padding: 34px 34px 30px;
    margin: auto 0;
  }

  .admin-modal-title {
    font-size: 21px;
    font-weight: 800;
    color: #0B2545;
    margin-bottom: 22px;
  }

  .admin-form-field {
    margin-bottom: 16px;
  }

  .admin-form-label {
    display: block;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #0B2545;
    margin-bottom: 7px;
  }

  .admin-form-input,
  .admin-form-textarea {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid rgba(11,37,69,.16);
    border-radius: 11px;
    background: #F8FAFD;
    font-family: var(--font-sans);
    font-size: 15px;
    color: #0B2545;
    outline: none;
    transition: border-color .2s, box-shadow .2s, background .2s;
  }

  .admin-form-input:focus,
  .admin-form-textarea:focus {
    border-color: #18C6C8;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(24,198,200,.16);
  }

  .admin-form-textarea {
    min-height: 96px;
    resize: vertical;
  }

  .admin-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .admin-upload {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .admin-upload-preview {
    width: 100%;
    height: 160px;
    border-radius: 14px;
    object-fit: cover;
    background: #E9EEF6;
    border: 1px solid rgba(11,37,69,.08);
  }

  .admin-upload-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 18px;
    border-radius: 10px;
    border: 1px dashed rgba(11,37,69,.28);
    background: #F8FAFD;
    cursor: pointer;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 14px;
    color: #0B2545;
    transition: border-color .2s, background .2s;
  }

  .admin-upload-btn:hover {
    border-color: #18C6C8;
    background: rgba(24,198,200,.05);
  }

  .admin-upload-btn input {
    display: none;
  }

  .admin-upload-hint {
    font-size: 12px;
    color: #94A3B8;
  }

  .admin-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 16px;
    border: 1px solid rgba(11,37,69,.12);
    border-radius: 12px;
    background: #F8FAFD;
  }

  .admin-toggle-label {
    font-size: 14px;
    font-weight: 700;
    color: #0B2545;
  }

  .admin-switch {
    position: relative;
    width: 46px;
    height: 26px;
    border-radius: 100px;
    background: #CBD5E1;
    border: none;
    cursor: pointer;
    transition: background .25s;
    flex-shrink: 0;
  }

  .admin-switch.on {
    background: #18C6C8;
  }

  .admin-switch-knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0,0,0,.25);
    transition: transform .25s cubic-bezier(.16,1,.3,1);
  }

  .admin-switch.on .admin-switch-knob {
    transform: translateX(20px);
  }

  .admin-form-error {
    padding: 11px 14px;
    border-radius: 11px;
    background: #FEF2F2;
    border: 1px solid rgba(220,38,38,.18);
    color: #B91C1C;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .admin-modal-actions {
    display: flex;
    gap: 12px;
    margin-top: 22px;
  }

  .admin-modal-btn {
    flex: 1;
    padding: 13px;
    border: none;
    border-radius: 11px;
    cursor: pointer;
    font-family: var(--font-sans);
    font-weight: 800;
    font-size: 15px;
    transition: transform .2s, box-shadow .2s, opacity .2s;
  }

  .admin-modal-btn.save {
    background: linear-gradient(135deg, #18C6C8 0%, #10A9AC 100%);
    color: #062B3A;
    box-shadow: 0 10px 24px rgba(24,198,200,.35);
  }

  .admin-modal-btn.save:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .admin-modal-btn.cancel {
    background: #E9EEF6;
    color: #0B2545;
  }

  .admin-modal-btn.danger {
    background: #DC2626;
    color: #ffffff;
  }

  .admin-modal-btn:disabled {
    opacity: .65;
    cursor: not-allowed;
  }

  .admin-confirm-text {
    font-size: 15px;
    color: #475569;
    line-height: 1.7;
    margin-bottom: 22px;
  }

  .admin-confirm-text strong {
    color: #0B2545;
  }

  /* ---------- Toast ---------- */
  .admin-toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3000;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    border-radius: 14px;
    box-shadow: 0 16px 40px rgba(0,0,0,.2);
    font-size: 14px;
    font-weight: 700;
    max-width: min(92vw, 520px);
  }

  .admin-toast.success {
    background: #0B2545;
    color: #ffffff;
  }

  .admin-toast.error {
    background: #B91C1C;
    color: #ffffff;
  }

  /* ---------- Responsive ---------- */
  @media (max-width: 1024px) {
    .admin-stats {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .admin-row {
      grid-template-columns: 56px minmax(0, 2fr) 110px minmax(0, 1fr);
    }

    .admin-row.header {
      display: none;
    }

    .admin-col-date,
    .admin-col-loc {
      display: none;
    }

    .admin-actions {
      justify-content: flex-start;
    }
  }

  @media (max-width: 768px) {
    .admin-main {
      padding: 24px 16px 60px;
    }

    .admin-topbar {
      padding: 14px 16px;
    }

    .admin-stats {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .admin-row {
      grid-template-columns: 48px minmax(0, 1fr);
      padding: 14px;
      gap: 12px;
    }

    .admin-thumb {
      width: 48px;
      height: 48px;
    }

    .admin-cell-loc,
    .admin-pills,
    .admin-col-date,
    .admin-col-loc {
      display: block;
    }

    .admin-actions {
      grid-column: 1 / -1;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .admin-form-row {
      grid-template-columns: 1fr;
    }
  }
`}</style>

      {/* ================= Top bar ================= */}
      <header className="admin-topbar">
        <div className="admin-brand">
          <div className="admin-brand-mark" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
            </svg>
          </div>
          <div>
            <div className="admin-brand-name">News &amp; Events Admin</div>
            <div className="admin-brand-sub">Madha College of Nursing</div>
          </div>
        </div>
        <div className="admin-topbar-actions">
          <button className="admin-top-btn site" onClick={goHome}>View site</button>
          <button className="admin-top-btn logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* ================= Auth states ================= */}
      {authState === 'loading' && (
        <div className="admin-state">
          <div className="admin-state-icon">
            <span className="admin-spinner" style={{ width: 22, height: 22, borderWidth: 3 }} />
          </div>
          <div className="admin-state-title">Checking authorization…</div>
          <p className="admin-state-sub">Please wait while we verify your admin access.</p>
        </div>
      )}

      {authState === 'denied' && (
        <div className="admin-state">
          <div className="admin-state-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="admin-state-title">
            Admin session expired
          </div>
         <p className="admin-state-sub">
  Your admin session is no longer valid. Please log in again.
</p>
          <button className="admin-modal-btn cancel" style={{ maxWidth: 220, margin: '0 auto', display: 'block', width: '100%' }} onClick={goToLogin}>
            Go to login
          </button>
        </div>
      )}

      {/* ================= Dashboard ================= */}
      {authState === 'ok' && (
        <main className="admin-main">
          <div className="admin-heading-row">
            <h1 className="admin-title">
              NEWS &amp; EVENTS <span className="admin-title-teal">ADMIN</span>
            </h1>
            <button className="admin-add-btn" onClick={openCreate}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add New
            </button>
          </div>

          <div className="admin-stats">
            <div className="admin-stat">
              <div className="admin-stat-label">Total</div>
              <div className="admin-stat-value">{counts.total}</div>
            </div>
            <div className="admin-stat">
              <div className="admin-stat-label">Upcoming</div>
              <div className="admin-stat-value">{counts.upcoming}</div>
            </div>
            <div className="admin-stat">
              <div className="admin-stat-label">Expired</div>
              <div className="admin-stat-value">{counts.expired}</div>
            </div>
            <div className="admin-stat">
              <div className="admin-stat-label">Published</div>
              <div className="admin-stat-value">{counts.published}</div>
            </div>
            <div className="admin-stat">
              <div className="admin-stat-label">Drafts</div>
              <div className="admin-stat-value">{counts.draft}</div>
            </div>
          </div>

          <div className="admin-toolbar">
            <div className="admin-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                className="admin-search-input"
                type="text"
                placeholder="Search events…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="admin-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            >
              <option value="all">All statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="expired">Expired</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="admin-table-card">
            <div className="admin-row header">
              <div>Image</div>
              <div>Title / Category</div>
              <div className="admin-col-date">Date</div>
              <div className="admin-col-loc">Location</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {fetching && events.length === 0 ? (
              <div className="admin-empty"><span className="admin-spinner" style={{ width: 18, height: 18 }} /> Loading events…</div>
            ) : filtered.length === 0 ? (
              <div className="admin-empty">
                <strong>{events.length === 0 ? 'No events yet.' : 'No events match your filters.'}</strong>
                <div style={{ marginTop: 6 }}>{events.length === 0 ? 'Click “Add New” to create your first event.' : 'Try adjusting the search or status filter.'}</div>
              </div>
            ) : (
              filtered.map(e => {
                const lifecycle = eventLifecycle(e)
                return (
                  <div key={e.id} className="admin-row body">
                    <img
                      className="admin-thumb"
                      src={getEventImageUrl(e.image_url)}
                      alt=""
                      loading="lazy"
                      onError={(ev) => {
                        const t = ev.currentTarget
                        t.onerror = null
                        t.src = EVENT_IMAGE_FALLBACK
                      }}
                    />
                    <div>
                      <div className="admin-cell-title">
                        {e.featured && (
                          <span className="admin-star" title="Featured">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                            </svg>
                          </span>
                        )}
                        {e.title}
                      </div>
                      <div className="admin-cell-sub">{e.category || 'Uncategorized'}</div>
                    </div>
                    <div className="admin-cell-muted admin-col-date">{e.event_date}</div>
                    <div className="admin-cell-loc admin-col-loc">{e.location || '—'}</div>
                    <div className="admin-pills">
                      <span className={`admin-pill ${e.published ? 'published' : 'draft'}`}>
                        {e.published ? 'Published' : 'Draft'}
                      </span>
                      <span className={`admin-pill ${lifecycle}`}>
                        {lifecycle === 'draft' ? (isUpcomingDate(e.event_date) ? 'Upcoming' : 'Expired') : lifecycle}
                      </span>
                    </div>
                    <div className="admin-actions">
                      <button
                        className="admin-action-btn pub"
                        onClick={() => handleTogglePublished(e)}
                        disabled={busyId === e.id}
                        title={e.published ? 'Unpublish' : 'Publish'}
                      >
                        {busyId === e.id ? <span className="admin-spinner" /> : e.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button className="admin-action-btn" onClick={() => openEdit(e)}>Edit</button>
                      <button className="admin-action-btn del" onClick={() => setDeleteTarget(e)}>Delete</button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </main>
      )}

      {/* ================= Create / Edit modal ================= */}
      {formOpen && (
        <div className="admin-overlay" role="dialog" aria-modal="true" onClick={() => !saving && setFormOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-modal-title">{formMode === 'create' ? 'Add New Event' : 'Edit Event'}</h2>

            <form onSubmit={handleSave}>
              {formError && <div className="admin-form-error" role="alert">{formError}</div>}

              <div className="admin-form-field">
                <label className="admin-form-label" htmlFor="f-title">Title</label>
                <input
                  id="f-title"
                  className="admin-form-input"
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="National Conference on Nursing Education"
                  required
                />
              </div>

              <div className="admin-form-field">
                <label className="admin-form-label" htmlFor="f-desc">Description</label>
                <textarea
                  id="f-desc"
                  className="admin-form-textarea"
                  value={form.description}
                  onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="A day of talks and workshops…"
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label className="admin-form-label" htmlFor="f-cat">Category</label>
                  <input
                    id="f-cat"
                    className="admin-form-input"
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                    placeholder="Conference"
                  />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label" htmlFor="f-date">Date</label>
                  <input
                    id="f-date"
                    className="admin-form-input"
                    type="date"
                    value={form.event_date}
                    onChange={(e) => setForm(f => ({ ...f, event_date: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="admin-form-field">
                <label className="admin-form-label" htmlFor="f-loc">Location</label>
                <input
                  id="f-loc"
                  className="admin-form-input"
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm(f => ({ ...f, location: e.target.value }))}
                  placeholder="Madha College Auditorium"
                />
              </div>

              <div className="admin-form-field">
                <label className="admin-form-label">Image</label>
                <div className="admin-upload">
                  {(previewUrl || form.image_url) && (
                    <img
                      className="admin-upload-preview"
                      src={getEventImageUrl(previewUrl || form.image_url)}
                      alt="Event preview"
                      loading="lazy"
                      decoding="async"
                      onError={(ev) => {
                        const t = ev.currentTarget
                        t.onerror = null
                        t.src = EVENT_IMAGE_FALLBACK
                      }}
                    />
                  )}
                  <label className="admin-upload-btn">
                    {uploading ? (
                      <>
                        <span className="admin-spinner" /> Uploading…
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                        {previewUrl || form.image_url ? 'Replace image' : 'Upload Image'}
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file)
                        e.target.value = ''
                      }}
                    />
                  </label>
                  <span className="admin-upload-hint">JPG, JPEG, PNG or WEBP · max 20 MB</span>
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-field">
                  <div className="admin-toggle">
                    <span className="admin-toggle-label">Published</span>
                    <button
                      type="button"
                      className={`admin-switch ${form.published ? 'on' : ''}`}
                      onClick={() => setForm(f => ({ ...f, published: !f.published }))}
                      aria-pressed={form.published}
                    >
                      <span className="admin-switch-knob" />
                    </button>
                  </div>
                </div>
                <div className="admin-form-field">
                  <div className="admin-toggle">
                    <span className="admin-toggle-label">Featured</span>
                    <button
                      type="button"
                      className={`admin-switch ${form.featured ? 'on' : ''}`}
                      onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
                      aria-pressed={form.featured}
                    >
                      <span className="admin-switch-knob" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="admin-modal-btn cancel" onClick={() => setFormOpen(false)} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="admin-modal-btn save" disabled={saving}>
                  {saving ? <span className="admin-spinner" /> : formMode === 'create' ? 'Save' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= Delete confirm ================= */}
      {deleteTarget && (
        <div className="admin-overlay" role="dialog" aria-modal="true" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="admin-modal" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-modal-title">Delete this event?</h2>
            <p className="admin-confirm-text">
              <strong>“{deleteTarget.title}”</strong> will be permanently removed. This action cannot be undone.
            </p>
            <div className="admin-modal-actions">
              <button className="admin-modal-btn cancel" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Cancel
              </button>
              <button className="admin-modal-btn danger" onClick={handleDeleteConfirm} disabled={deleting}>
                {deleting ? <span className="admin-spinner" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Toast ================= */}
      {notice && (
        <div className={`admin-toast ${notice.type}`} role="status">
          {notice.type === 'success' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          )}
          {notice.message}
        </div>
      )}
    </div>
  )
}
