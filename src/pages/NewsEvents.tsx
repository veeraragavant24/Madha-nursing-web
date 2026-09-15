import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal'
import Stagger from '../components/Stagger'

import { EVENT_IMAGE_FALLBACK, type NewsEventRow } from '../lib/newsEvents'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal' | 'news-events'
interface Props { navigate: (p: Page) => void }

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

function dateBlock(dateStr: string) {
  if (!dateStr) {
    return { day: '--', month: '---', year: '----' }
  }

  const date = new Date(dateStr)

  if (Number.isNaN(date.getTime())) {
    return { day: '--', month: '---', year: '----' }
  }

  const day = String(date.getDate())
  const month = MONTHS[date.getMonth()]
  const year = String(date.getFullYear())

  return { day, month, year }
} 

function displayDate(dateStr: string) {
  const { day, month, year } = dateBlock(dateStr)
  return `${day} ${month} ${year}`
}

const API_BASE_URL =
  'https://invisible-beverly-casting-teens.trycloudflare.com'

function getEventImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return EVENT_IMAGE_FALLBACK

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl
      .replace(/^http:\/\/localhost:5021/i, API_BASE_URL)
      .replace(/^https?:\/\/[^/]+\.trycloudflare\.com/i, API_BASE_URL)
  }

  if (
    imageUrl.startsWith('/uploads/') ||
    imageUrl.startsWith('/images/events/')
  ) {
    return `${API_BASE_URL}${imageUrl}`
  }

  return imageUrl
}

function eventImage(row: NewsEventRow) {
  return getEventImageUrl(row.image_url)
}

export default function NewsEvents({ navigate }: Props) {
 const [items, setItems] = useState<NewsEventRow[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [selectedEvent, setSelectedEvent] = useState<NewsEventRow | null>(null)
 useEffect(() => {
  let cancelled = false

  async function load() {
    setLoading(true)
    setError(null)

    try {
const response = await fetch(
        `${API_BASE_URL}/api/news-events`,
      )
      if (!response.ok) {
        throw new Error('Failed to load events')
      }

      const data = await response.json()

      if (cancelled) return

      const today = new Date().toISOString().split('T')[0]

      const upcomingEvents: NewsEventRow[] = data
        .filter((event: any) => {
          if (!event.published) return false

          const eventDate = event.eventDate.split('T')[0]

          return eventDate >= today
        })
        .sort((a: any, b: any) => {
          return (
            new Date(a.eventDate).getTime() -
            new Date(b.eventDate).getTime()
          )
        })
        .map((event: any) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          category: event.category,
          event_date: event.eventDate,
          location: event.location,
          image_url: event.imageUrl,
          published: event.published,
          featured: event.featured,
          created_at: event.createdAt,
          updated_at: event.updatedAt,
        }))

      setItems(upcomingEvents)
    } catch (err) {
      console.error('News & Events API error:', err)

      if (!cancelled) {
        setError(
          'Unable to load upcoming events. Please try again later.'
        )
      }
    } finally {
      if (!cancelled) {
        setLoading(false)
      }
    }
  }

  load()

  return () => {
    cancelled = true
  }
}, [])

  // Events returned are already published, future-or-today, sorted ascending.
  const upcoming = items
  const moreEvents = upcoming

  return (
    <div className="news-events-page">
      <style>{`
  /* ========================================
     NEWS & EVENTS — PAGE BASE
  ======================================== */

  .news-events-page {
    width: 100%;
    overflow-x: hidden;
  }

  .news-events-banner {
    padding: 190px 40px 100px;
  }

  /* ========================================
     FEATURED UPCOMING EVENT
  ======================================== */

  .featured-section {
    padding: 96px 40px 120px;
    background: #FAFBFD;
  }

  .featured-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .featured-card {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr);
    background: #ffffff;
    border: 1px solid rgba(11, 37, 69, 0.08);
    border-radius: 28px;
    box-shadow: 0 30px 70px rgba(11, 37, 69, 0.10);
    overflow: hidden;
  }

  .featured-media-cell {
    display: flex;
    min-width: 0;
  }

  .featured-media {
    flex: 1;
    position: relative;
    min-height: 460px;
    background: #0B2545;
  }

  .featured-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .featured-body {
    padding: 64px 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  .featured-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    align-self: flex-start;
    padding: 8px 16px;
    border-radius: 100px;
    background: rgba(24, 198, 200, 0.12);
    color: #0E8F91;
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  .featured-eyebrow-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #18C6C8;
    flex-shrink: 0;
  }

  .featured-date-block {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-start;
    background: linear-gradient(160deg, #071A36 0%, #0B2545 100%);
    color: #ffffff;
    border-radius: 18px;
    padding: 20px 22px 18px;
    margin-bottom: 30px;
    box-shadow: 0 18px 40px rgba(11, 37, 69, 0.22);
  }

  .featured-date-icon {
    color: #18C6C8;
    margin-bottom: 10px;
  }

  .featured-date-day {
    font-family: var(--font-sans);
    font-weight: 800;
    font-size: 46px;
    line-height: 1;
  }

  .featured-date-month {
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: .2em;
    color: #18C6C8;
    margin-top: 8px;
  }

  .featured-date-year {
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .16em;
    color: #E6EDF7;
    margin-top: 4px;
  }

  .featured-title {
    font-family: var(--font-sans);
    font-weight: 800;
    font-size: clamp(30px, 3.2vw, 46px);
    line-height: 1.12;
    letter-spacing: -.02em;
    color: #0B2545;
    margin-bottom: 22px;
  }

  .featured-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 20px;
    margin-bottom: 24px;
  }

  .featured-meta-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-sans);
    font-size: 15px;
    font-weight: 600;
    color: #163B72;
  }

  .featured-meta-item svg {
    color: #18C6C8;
    flex-shrink: 0;
  }

  .featured-category {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 100px;
    background: rgba(24, 198, 200, 0.14);
    color: #0E8F91;
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .featured-desc {
    font-family: var(--font-sans);
    font-size: 17px;
    line-height: 1.85;
    color: #1E293B;
    margin-bottom: 36px;
    max-width: 540px;
  }

  .featured-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    align-self: flex-start;
    padding: 16px 34px;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, #18C6C8 0%, #10A9AC 100%);
    color: #062B3A;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 16px;
    box-shadow: 0 14px 32px rgba(24, 198, 200, 0.35);
    transition: transform .3s cubic-bezier(.16, 1, .3, 1), box-shadow .3s cubic-bezier(.16, 1, .3, 1);
  }

  .featured-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 40px rgba(24, 198, 200, 0.45);
  }

  .featured-btn svg {
    transition: transform .3s cubic-bezier(.16, 1, .3, 1);
  }

  .featured-btn:hover svg {
    transform: translateX(4px);
  }

  /* ========================================
     MORE UPCOMING EVENTS
  ======================================== */

  .more-section {
    padding: 96px 40px 120px;
    background: #F3F7FB;
  }

  .more-inner {
    max-width: 1280px;
    margin: 0 auto;
  }

  .more-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;
    width: 100%;
  }

  .more-card {
    background: #ffffff;
    border: 1px solid rgba(11, 37, 69, 0.07);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-shadow: 0 8px 24px rgba(11, 37, 69, 0.06);
    transition: transform .4s cubic-bezier(.16, 1, .3, 1), box-shadow .4s cubic-bezier(.16, 1, .3, 1);
  }

  .more-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 22px 44px rgba(11, 37, 69, 0.12);
  }

  .more-card-img-wrap {
    position: relative;
    height: 200px;
    overflow: hidden;
    background: #0B2545;
  }

  .more-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .6s cubic-bezier(.16, 1, .3, 1);
  }

  .more-card:hover .more-card-img {
    transform: scale(1.04);
  }

  .more-card-body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .more-card-date {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #1E5AA8;
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: .04em;
    margin-bottom: 10px;
  }

  .more-card-date svg {
    color: #18C6C8;
    flex-shrink: 0;
  }

  .more-card-category {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    padding: 5px 11px;
    border-radius: 100px;
    background: rgba(24, 198, 200, 0.12);
    color: #0E8F91;
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .more-card-title {
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 20px;
    color: #0B2545;
    line-height: 1.3;
    margin-bottom: 10px;
  }

  .more-card-desc {
    font-family: var(--font-sans);
    font-size: 15px;
    line-height: 1.7;
    color: #1E293B;
    flex: 1;
    margin-bottom: 18px;
  }

  .more-card-btn {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 15px;
    color: #18C6C8;
    transition: color .25s;
  }

  .more-card-btn:hover {
    color: #0B2545;
  }

  .more-card-btn svg {
    transition: transform .3s cubic-bezier(.16, 1, .3, 1);
  }

  .more-card-btn:hover svg {
    transform: translateX(4px);
  }

  /* ========================================
     EMPTY STATE
  ======================================== */

  .empty-section {
    padding: 96px 40px 140px;
    background: #FAFBFD;
  }

  .empty-card {
    max-width: 560px;
    margin: 0 auto;
    text-align: center;
    background: #ffffff;
    border: 1px solid rgba(11, 37, 69, 0.07);
    border-radius: 24px;
    padding: 72px 40px;
    box-shadow: 0 24px 60px rgba(11, 37, 69, 0.08);
  }

  .empty-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 22px;
    border-radius: 50%;
    background: rgba(24, 198, 200, 0.12);
    color: #18C6C8;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-title {
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 24px;
    color: #0B2545;
    margin-bottom: 10px;
  }

  .empty-sub {
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.7;
    color: #475569;
  }

  .ne-spinner {
    display: inline-block;
    width: 28px;
    height: 28px;
    border: 3px solid rgba(11, 37, 69, 0.14);
    border-top-color: #18C6C8;
    border-radius: 50%;
    animation: ne-spin .7s linear infinite;
  }

  @keyframes ne-spin {
    to { transform: rotate(360deg); }
  }

  /* ========================================
     RESPONSIVE
  ======================================== */

  @media (max-width: 1024px) {
    .featured-card {
      grid-template-columns: 1fr;
    }

    .featured-media {
      min-height: 340px;
    }

    .featured-body {
      padding: 48px 40px;
    }

    .more-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 768px) {
    .news-events-banner {
      padding: 160px 20px 70px !important;
    }

    .news-events-banner h1 {
      font-size: 40px !important;
      line-height: 1.08 !important;
    }

    .news-events-banner p {
      font-size: 15px !important;
      line-height: 1.7 !important;
    }

    .featured-section {
      padding: 64px 20px 80px;
    }

    .featured-body {
      padding: 40px 28px;
    }

    .more-section {
      padding: 64px 20px 80px;
    }

    .more-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 480px) {
    .news-events-banner {
      padding: 155px 16px 58px !important;
    }

    .news-events-banner h1 {
      font-size: 34px !important;
    }

    .featured-section {
      padding: 48px 16px 64px;
    }

    .featured-media {
      min-height: 260px;
    }

    .featured-body {
      padding: 32px 22px;
    }

    .more-section {
      padding: 48px 16px 64px;
    }

    .more-grid {
      grid-template-columns: 1fr;
    }

    .empty-section {
      padding: 56px 16px 72px;
    }

    .empty-card {
      padding: 56px 24px;
    }
  }
`}</style>

      {/* Banner */}
      <section
        className="news-events-banner"
        style={{
          background: 'linear-gradient(160deg,#071A36 0%,#0B2545 100%)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(24,198,200,.1) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Stagger>
            <div>
              <span className="section-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>News &amp; Events</span>
            </div>
            <div>
              <h1 className="font-sans" style={{ fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 700, color: 'white', lineHeight: 1.1, letterSpacing: '-.03em', marginTop: 16 }}>
                News &amp; <span className="text-teal-g">Events</span>
              </h1>
            </div>
            <div>
              <p style={{ color: '#F1F5F9', fontSize: 20, maxWidth: 560, margin: '24px auto 0', lineHeight: 1.75 }}>
                Stay updated with the latest news, announcements, achievements, and events from Madha College of Nursing.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <section className="empty-section">
          <Reveal type="up">
            <div className="empty-card">
              <div className="empty-icon">
                <span className="ne-spinner" />
              </div>
              <div className="empty-title">Loading upcoming events…</div>
              <p className="empty-sub">Please wait a moment.</p>
            </div>
          </Reveal>
        </section>
      )}

      {/* Error */}
      {!loading && error && (
        <section className="empty-section">
          <Reveal type="up">
            <div className="empty-card">
              <div className="empty-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
              <div className="empty-title">Unable to load upcoming events.</div>
              <p className="empty-sub">{error}</p>
            </div>
          </Reveal>
        </section>
      )}

      {/* =====================================================
          ALL UPCOMING EVENTS
      ===================================================== */}
      {!loading && !error && moreEvents.length > 0 && (
        <section className="more-section">
          <div className="more-inner">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <Reveal>
                <span className="section-tag">Up Next</span>
              </Reveal>
              <Reveal delay={1}>
                <h2
                  className="font-sans"
                  style={{
                    fontSize: 'clamp(34px, 4vw, 56px)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: '-.02em',
                    color: '#0B2545',
                    marginTop: 20,
                  }}
                >
                  All Upcoming <span className="text-teal-g">Events</span>
                </h2>
              </Reveal>
            </div>

            <div className="more-grid">
              {moreEvents.map((ev, i) => (
                <Reveal key={ev.id} delay={(i % 3) + 1}>
                  <article className="more-card">
                    <div className="more-card-img-wrap">
                      <img
                        className="more-card-img"
                        src={eventImage(ev)}
                        alt={ev.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget
                          target.onerror = null
                          target.src = EVENT_IMAGE_FALLBACK
                        }}
                      />
                    </div>

                    <div className="more-card-body">
                      <div className="more-card-date">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        {displayDate(ev.event_date)}
                      </div>

                      <span className="more-card-category">
                        {ev.category || 'Event'}
                      </span>

                      <h3 className="more-card-title">{ev.title}</h3>

                      <p className="more-card-desc">
                        {ev.description || ''}
                      </p>

                      <button
                        className="more-card-btn"
                        onClick={() => setSelectedEvent(ev)}
                        aria-label={`View details for ${ev.title}`}
                      >
                        View Details
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* =====================================================
    EVENT DETAILS
===================================================== */}

{selectedEvent && (
  <section className="featured-section">
    <div className="featured-inner">

      {/* BACK BUTTON */}
      <button
        className="more-card-btn"
        onClick={() => setSelectedEvent(null)}
        style={{
          marginBottom: 24,
          fontSize: 16,
        }}
      >
        ← Back to Events
      </button>

      {/* EVENT DETAILS CARD */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid rgba(11, 37, 69, 0.08)',
          borderRadius: 28,
          boxShadow: '0 30px 70px rgba(11, 37, 69, 0.10)',
          padding: '48px 56px',
        }}
      >

        {/* DATE */}
        <div
          style={{
            marginBottom: 28,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: '#0E8F91',
              marginBottom: 8,
            }}
          >
            Date
          </div>

          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#0B2545',
            }}
          >
            {displayDate(selectedEvent.event_date)}
          </div>
        </div>


        {/* LOCATION */}
        <div
          style={{
            marginBottom: 28,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: '#0E8F91',
              marginBottom: 8,
            }}
          >
            Location
          </div>

          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#163B72',
            }}
          >
            {selectedEvent.location || 'Location not specified'}
          </div>
        </div>


        {/* STATUS */}
        <div
          style={{
            marginBottom: 28,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: '#0E8F91',
              marginBottom: 8,
            }}
          >
            Status
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '7px 14px',
              borderRadius: 100,
              background: selectedEvent.published
                ? 'rgba(24, 198, 200, 0.14)'
                : 'rgba(239, 68, 68, 0.12)',
              color: selectedEvent.published
                ? '#0E8F91'
                : '#DC2626',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {selectedEvent.published ? 'Published' : 'Not Published'}
          </span>
        </div>


        {/* DESCRIPTION */}
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: '#0E8F91',
              marginBottom: 10,
            }}
          >
            Description
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 17,
              lineHeight: 1.85,
              color: '#1E293B',
            }}
          >
            {selectedEvent.description || 'No description available.'}
          </p>
        </div>

      </div>

    </div>
  </section>
)}

      {/* No upcoming events */}
      {!loading && !error && upcoming.length === 0 && (
        <section className="empty-section">
          <Reveal type="up">
            <div className="empty-card">
              <div className="empty-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <div className="empty-title">No upcoming events at the moment.</div>
              <p className="empty-sub">New events will be announced here soon. Please check back later.</p>
            </div>
          </Reveal>
        </section>
      )}
    </div>
  )
}
