import { useState, useEffect } from 'react'
import Reveal from '../components/Reveal'
import Stagger from '../components/Stagger'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'
interface Props { navigate: (p: Page) => void }

const CATEGORIES = ['All', 'Campus', 'Clinical', 'Laboratory', 'Events', 'Students']

const CATEGORY_INFO: Record<string, {
  title: string
  description: string
}> = {
  All: {
    title: 'All Gallery',
    description: 'Explore every moment',
  },
  Campus: {
    title: 'Campus',
    description: 'Our campus & facilities',
  },
  Clinical: {
    title: 'Clinical',
    description: 'Clinical learning & practice',
  },
  Laboratory: {
    title: 'Laboratory',
    description: 'Learning through simulation',
  },
  Events: {
    title: 'Events',
    description: 'Celebrations & occasions',
  },
  Students: {
    title: 'Students',
    description: 'Student life & activities',
  },
}

const IMAGES = [
  { id: '/gallery/lamplight2026/lamp-1.webp', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 280 },
  { id: '/gallery/lamplight2026/lamp-2.webp', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 200 },
  { id: '/gallery/lamplight2026/lamp-3.webp', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 540 },
  { id: '/gallery/lamplight2026/lamp-4.webp', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 220 },
  { id: '/gallery/lamplight2026/lamp-5.webp', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 260 },
  { id: '/gallery/lamplight2026/lamp-6.webp', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 190 },
  { id: '/gallery/lamplight2026/lamp-7.webp', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 230 },
  { id: '/gallery/lamplight2026/lamp-8.webp', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 210 },
  { id: '/gallery/lamplight2026/lamp-9.webp', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 270 },
  { id: '/gallery/lamplight2026/lamp-10.webp', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 200 },
  { id: '/gallery/lamplight2026/lamp-11.webp', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 240 },
 

  { id: '/gallery/pongal-2025/1.webp', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/2.webp', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/3.webp', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/4.webp', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/5.webp', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/6.webp', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/7.webp', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/8.webp', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/9.webp', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/10.webp', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  
  { id: '/gallery/Xmas 25/1.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/2.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/3.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/4.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/5.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/6.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/7.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/8.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/9.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/10.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/11.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/12.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/13.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/14.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/15.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/16.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/17.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/18.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/19.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/20.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/21.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/22.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/23.webp', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },



 { id: '/gallery/Independence-Day/1.webp', cat: 'Events', event: 'Independence Day', alt: 'Independence Day', h: 280 },
 { id: '/gallery/Independence-Day/3.webp', cat: 'Events', event: 'Independence Day', alt: 'Independence Day', h: 280 },
 { id: '/gallery/Independence-Day/4.webp', cat: 'Events', event: 'Independence Day', alt: 'Independence Day', h: 280 },
 { id: '/gallery/Independence-Day/5.webp', cat: 'Events', event: 'Independence Day', alt: 'Independence Day', h: 280 },
 { id: '/gallery/Independence-Day/6.webp', cat: 'Events', event: 'Independence Day', alt: 'Independence Day', h: 280 },
 { id: '/gallery/Independence-Day/7.webp', cat: 'Events', event: 'Independence Day', alt: 'Independence Day', h: 280 },
 
]

export default function Gallery({ navigate }: Props) {
  const [filter, setFilter] = useState<string | null>(null)
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>(() => {
  try {
    return JSON.parse(
      sessionStorage.getItem('madha-gallery-loaded') || '{}'
    )
  } catch {
    return {}
  }
})

  const [viewerIndex, setViewerIndex] = useState(0)
  const [slideDir, setSlideDir] = useState(1)
  const [openingAnim, setOpeningAnim] = useState(true)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const filtered = !filter ? [] : filter === 'All' ? IMAGES : IMAGES.filter(img => img.cat === filter)

  const goTo = (dir: 1 | -1) => {
    const total = filtered.length
    if (total === 0) return
    setOpeningAnim(false)
    setSlideDir(dir)
    setViewerIndex(prev => (prev + dir + total) % total)
  }

  const openViewer = (img: typeof IMAGES[0]) => {
    const idx = filtered.findIndex(g => g.id === img.id)
    setOpeningAnim(true)
    setViewerIndex(idx === -1 ? 0 : idx)
    setSlideDir(1)
    setIsViewerOpen(true)
  }

  useEffect(() => {
    if (!isViewerOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prevOverflow }
  }, [isViewerOpen])

  useEffect(() => {
    if (!isViewerOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsViewerOpen(false); return }
      const total = filtered.length
      if (total === 0) return
      if (e.key === 'ArrowRight') {
        setOpeningAnim(false)
        setSlideDir(1)
        setViewerIndex(prev => (prev + 1) % total)
      } else if (e.key === 'ArrowLeft') {
        setOpeningAnim(false)
        setSlideDir(-1)
        setViewerIndex(prev => (prev - 1 + total) % total)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isViewerOpen, filtered])

 return (
  <div className="gallery-page">
      {/* Banner */}
     <style>{`
  /* ========================================
     GALLERY BASE
  ======================================== */

  .gallery-page {
    width: 100%;
    overflow-x: hidden;
  }

  .gallery-banner {
    padding: 190px 40px 100px;
  }

  /* ========================================
     CATEGORY CARDS
  ======================================== */

  .gallery-category-section {
    background: white;
    padding: 42px 40px 52px;
  }

  .gallery-category-grid {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px;
  }

  .gallery-category-card {
    position: relative;
    min-height: 205px;
    padding: 28px 26px;
    border-radius: 24px;
    border: 1px solid rgba(11, 37, 69, 0.10);
    background: linear-gradient(145deg, #F7FAFD 0%, #EDF4F9 100%);
    cursor: pointer;
    overflow: hidden;
    text-align: left;
    color: #0B2545;
    font-family: inherit;
    appearance: none;
    -webkit-appearance: none;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    box-shadow: 0 8px 24px rgba(11,37,69,.07);

    transition:
      transform .4s cubic-bezier(.16,1,.3,1),
      box-shadow .4s ease,
      border-color .35s ease,
      background .35s ease;
  }

  .gallery-category-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        180deg,
        rgba(7,26,54,.04) 0%,
        rgba(7,26,54,.86) 100%
      );
    opacity: 0;
    transition: opacity .35s ease;
  }

  /* Category images are revealed only for the selected card. */
  .gallery-category-card.active.has-image {
    background-size: cover;
    background-position: center;
    color: white;
  }

  .gallery-category-card.active.has-image::before {
    opacity: 1;
  }

  .gallery-category-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 22px 42px rgba(11,37,69,.15);
    border-color: rgba(24,198,200,.45);
  }

  .gallery-category-card:focus-visible {
    outline: 3px solid rgba(24,198,200,.35);
    outline-offset: 4px;
  }

  .gallery-category-card.active {
    transform: translateY(-6px);
    border-color: #18C6C8;
    box-shadow:
      0 22px 46px rgba(24,198,200,.22),
      0 0 0 3px rgba(24,198,200,.12);
  }

  .gallery-category-card.active::after {
    content: '';
    position: absolute;
    top: 16px;
    right: 16px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #18C6C8;
    box-shadow: 0 0 0 6px rgba(24,198,200,.18);
  }

  .gallery-category-content {
    position: relative;
    z-index: 2;
    padding-right: 38px;
  }

  .gallery-category-title {
    font-family: var(--font-sans);
    font-size: 18px;
    font-weight: 750;
    color: #0B2545;
    margin-bottom: 5px;
  }

  .gallery-category-description {
    font-size: 12px;
    color: #64748B;
    line-height: 1.45;
  }

  .gallery-category-count {
    margin-top: 7px;
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 700;
    color: #18C6C8;
    letter-spacing: .04em;
  }

  .gallery-category-card.active.has-image .gallery-category-title {
    color: white;
  }

  .gallery-category-card.active.has-image .gallery-category-description {
    color: rgba(255,255,255,.84);
  }

  .gallery-category-card.active.has-image .gallery-category-count {
    color: #7FF1F2;
  }

  .gallery-category-arrow {
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 2;

    width: 32px;
    height: 32px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(11,37,69,.08);
    color: #0B2545;

    font-size: 17px;
    backdrop-filter: blur(8px);

    opacity: 0;
    transform: translateX(-5px);
    transition: all .3s ease;
  }

  .gallery-category-card.active.has-image .gallery-category-arrow {
    background: rgba(255,255,255,.18);
    color: white;
  }

  .gallery-category-card:hover .gallery-category-arrow,
  .gallery-category-card.active .gallery-category-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* ========================================
     GALLERY SECTION
  ======================================== */

  .gallery-section {
    padding: 60px 40px 100px;
  }

  /* ========================================
     EVENT GRID - DESKTOP
  ======================================== */

  .event-gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    width: 100%;
  }

  .event-gallery-item {
    width: 100%;
    height: 280px;
    cursor: pointer;
    overflow: hidden;
    border-radius: 16px;
    background: #e8edf3;
  }

/* Image before loading */
.event-gallery-item img.image-loading {
  opacity: 0;
}

/* Image after loading */
.event-gallery-item img.image-loaded {
  opacity: 1;
}

  .event-gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease, opacity 0.6s ease;
  }

  .event-gallery-item:hover img {
    transform: scale(1.04);
  }

  .event-gallery-item:focus-visible {
    outline: 3px solid rgba(24,198,200,.45);
    outline-offset: 3px;
  }
  /* ========================================
     FULL-SCREEN IMAGE VIEWER
  ======================================== */

  .gallery-viewer {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: rgba(7, 26, 54, 0.94);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: galleryViewerFade 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes galleryViewerFade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .gallery-viewer-stage {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 96px;
  }

  .gallery-viewer-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
    border-radius: 12px;
    user-select: none;
    animation: galleryViewerOpen 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes galleryViewerOpen {
    from { opacity: 0; transform: scale(0.88); }
    to { opacity: 1; transform: scale(1); }
  }

  .gallery-viewer-img-next { animation-name: galleryViewerNext; }
  .gallery-viewer-img-prev { animation-name: galleryViewerPrev; }

  @keyframes galleryViewerNext {
    from { opacity: 0; transform: translateX(48px) scale(0.97); }
    to { opacity: 1; transform: translateX(0) scale(1); }
  }

  @keyframes galleryViewerPrev {
    from { opacity: 0; transform: translateX(-48px) scale(0.97); }
    to { opacity: 1; transform: translateX(0) scale(1); }
  }

  .gallery-viewer-close {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: #fff;
    font-size: 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), background 0.25s ease, opacity 0.25s ease;
    z-index: 3;
  }

  .gallery-viewer-close:hover {
    transform: scale(1.06);
    background: rgba(255, 255, 255, 0.16);
  }

  .gallery-viewer-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: #fff;
    font-size: 30px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), background 0.25s ease, opacity 0.25s ease;
    z-index: 3;
  }

  .gallery-viewer-nav:hover {
    transform: translateY(-50%) scale(1.08);
    background: rgba(255, 255, 255, 0.16);
  }

  .gallery-viewer-nav-prev { left: 24px; }
  .gallery-viewer-nav-next { right: 24px; }

  .gallery-viewer-counter {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    color: #E2E8F0;
    font-family: var(--font-sans);
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.12em;
    z-index: 3;
  }

  .gallery-viewer-caption {
    position: absolute;
    bottom: 64px;
    left: 50%;
    transform: translateX(-50%);
    color: #94A3B8;
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    max-width: 70vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 3;
  }

  /* ========================================
     TABLET
  ======================================== */

  @media (max-width: 768px) {

    .gallery-banner {
      padding: 160px 20px 70px !important;
    }

    .gallery-banner h1 {
      font-size: 40px !important;
      line-height: 1.08 !important;
    }

    .gallery-banner p {
      font-size: 15px !important;
      line-height: 1.7 !important;
    }

    .gallery-category-section {
      padding: 28px 20px 34px !important;
    }

    .gallery-category-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .gallery-category-card {
      min-height: 190px;
      padding: 22px 18px;
      border-radius: 20px;
    }
    .gallery-category-title {
      font-size: 16px;
    }

    .gallery-category-description {
      font-size: 11px;
    }

    .gallery-category-count {
      font-size: 11px;
    }

    .gallery-category-arrow {
      right: 14px;
      bottom: 14px;
      width: 29px;
      height: 29px;
    }

    .gallery-section {
      padding: 40px 20px 64px !important;
    }

    .event-gallery-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    .event-gallery-item {
      height: 240px;
    }

    .gallery-viewer-stage {
      padding: 0 60px;
    }

    .gallery-viewer-close {
      top: 16px;
      right: 16px;
      width: 46px;
      height: 46px;
      font-size: 20px;
    }

    .gallery-viewer-nav {
      width: 48px;
      height: 48px;
      font-size: 24px;
    }

    .gallery-viewer-nav-prev { left: 12px; }
    .gallery-viewer-nav-next { right: 12px; }

    .gallery-viewer-counter {
      bottom: 24px;
      font-size: 14px;
    }

    .gallery-viewer-caption {
      bottom: 56px;
      font-size: 12px;
    }
  }

  /* ========================================
     MOBILE
  ======================================== */

  @media (max-width: 480px) {

    .gallery-banner {
      padding: 155px 16px 58px !important;
    }

    .gallery-banner h1 {
      font-size: 34px !important;
    }

    .gallery-category-section {
      padding: 22px 16px 28px !important;
    }

    .gallery-category-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .gallery-category-card {
      min-height: 175px;
      padding: 22px 18px;
      border-radius: 18px;
    }
    .gallery-category-content {
      padding-right: 28px;
    }

    .gallery-category-title {
      font-size: 15px;
    }

    .gallery-category-description {
      font-size: 10.5px;
    }

    .gallery-category-count {
      font-size: 10.5px;
    }

    .gallery-category-arrow {
      right: 11px;
      bottom: 11px;
      width: 27px;
      height: 27px;
      font-size: 14px;
    }

    .gallery-section {
      padding: 32px 16px 52px !important;
    }

    .event-gallery-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .event-gallery-item {
      width: 100%;
      height: 260px;
    }

    .gallery-viewer-stage {
      padding: 0 48px;
    }

    .gallery-viewer-nav {
      width: 44px;
      height: 44px;
      font-size: 22px;
    }

    .gallery-viewer-nav-prev { left: 8px; }
    .gallery-viewer-nav-next { right: 8px; }
  }
`}</style>
      <section className="gallery-banner" style={{ background: 'linear-gradient(160deg,#071A36 0%,#0B2545 100%)', padding: '190px 40px 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(24,198,200,.08) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Stagger>
            <div>
              <span className="section-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>Campus Life</span>
            </div>
            <div>
              <h1 className="font-sans" style={{ fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 700, color: 'white', lineHeight: 1.1, letterSpacing: '-.03em', marginTop: 16 }}>
                Life at<br/>
                <span className="text-teal-g">Madha College</span>
              </h1>
            </div>
            <div>
              <p style={{ color: '#F1F5F9', fontSize: 20, maxWidth: 500, margin: '24px auto 0', lineHeight: 1.75 }}>
                Glimpses of learning, healing, research, and the vibrant community that defines us.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Category Cards */}
      <section className="gallery-category-section" aria-label="Gallery categories">
        <div className="gallery-category-grid">
          {CATEGORIES.map(cat => {
            const categoryImages =
              cat === 'All'
                ? IMAGES
                : IMAGES.filter(img => img.cat === cat)

            const previewImage = categoryImages[0]?.id

            return (
              <button
                key={cat}
                type="button"
                className={`gallery-category-card ${
                  filter === cat ? 'active' : ''
                } ${previewImage ? 'has-image' : ''}`}
                style={
                  previewImage
                    ? {
                        backgroundImage: `url("${previewImage}")`,
                      }
                    : undefined
                }
                onClick={() => {
                  setFilter(cat)

                  window.setTimeout(() => {
                    document.querySelector('.gallery-section')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }, 80)
                }}
                aria-pressed={filter === cat}
                aria-label={`Show ${CATEGORY_INFO[cat].title}, ${categoryImages.length} photo${categoryImages.length === 1 ? '' : 's'}`}
              >

                <span className="gallery-category-content">
                  <span className="gallery-category-title">
                    {CATEGORY_INFO[cat].title}
                  </span>

                  <span className="gallery-category-description">
                    {CATEGORY_INFO[cat].description}
                  </span>

                  <span className="gallery-category-count">
                    {categoryImages.length} {categoryImages.length === 1 ? 'Photo' : 'Photos'}
                  </span>
                </span>

                <span className="gallery-category-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Images appear only after a category card is selected */}
      {filter && (
        <section
          className="gallery-section"
          style={{ background: '#F3F7FB' }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
         {filter === 'All' || filter === 'Events' ? (
           ['Lamplighting Ceremony', 'Pongal Celebration', 'Christmas Celebration', 'Independence Day'].map((eventName, i) => {
             const eventImages = filtered.filter(img => img.event === eventName)

             if (eventImages.length === 0) return null

             return (
               <Reveal key={eventName} delay={i % 4}>
                 <div style={{ marginBottom: 70 }}>

                   <h2
                     style={{
                       fontSize: 30,
                       fontWeight: 700,
                       color: '#0B2545',
                       marginBottom: 24,
                     }}
                   >
                     {eventName}
                   </h2>

                   <div className="event-gallery-grid">
                     {eventImages.map((img, i) => (
                       <div
                         key={`${img.id}-${i}`}
                         className="event-gallery-item"
                         onClick={() => openViewer(img)}
                         role="button"
                         tabIndex={0}
                         onKeyDown={(e) => {
                           if (e.key === 'Enter' || e.key === ' ') {
                             e.preventDefault()
                             openViewer(img)
                           }
                         }}
                         aria-label={`Open ${img.alt}`}
                       >
                         <img
                           src={img.id}
                           alt={img.alt}
                           loading="lazy"
                           decoding="async"
                           className={loadedImages[img.id] ? 'image-loaded' : 'image-loading'}
                           onLoad={() => {
                             if (loadedImages[img.id]) return

                             setTimeout(() => {
                               setLoadedImages(prev => {
                                 const updated = {
                                   ...prev,
                                   [img.id]: true,
                                 }

                                 sessionStorage.setItem(
                                   'madha-gallery-loaded',
                                   JSON.stringify(updated)
                                 )

                                 return updated
                               })
                             }, 500)
                           }}
                         />
                       </div>
                     ))}
                   </div>

                 </div>
               </Reveal>
             )
           })
         ) : filtered.length > 0 ? (
           <Reveal>
             <div style={{ marginBottom: 40 }}>
               <h2
                 style={{
                   fontSize: 30,
                   fontWeight: 700,
                   color: '#0B2545',
                   marginBottom: 24,
                 }}
               >
                 {CATEGORY_INFO[filter]?.title || filter}
               </h2>

               <div className="event-gallery-grid">
                 {filtered.map((img, i) => (
                   <div
                     key={`${img.id}-${i}`}
                     className="event-gallery-item"
                     onClick={() => openViewer(img)}
                     role="button"
                     tabIndex={0}
                     onKeyDown={(e) => {
                       if (e.key === 'Enter' || e.key === ' ') {
                         e.preventDefault()
                         openViewer(img)
                       }
                     }}
                     aria-label={`Open ${img.alt}`}
                   >
                     <img
                       src={img.id}
                       alt={img.alt}
                       loading="lazy"
                       decoding="async"
                       className={loadedImages[img.id] ? 'image-loaded' : 'image-loading'}
                       onLoad={() => {
                         if (loadedImages[img.id]) return

                         setTimeout(() => {
                           setLoadedImages(prev => {
                             const updated = {
                               ...prev,
                               [img.id]: true,
                             }

                             sessionStorage.setItem(
                               'madha-gallery-loaded',
                               JSON.stringify(updated)
                             )

                             return updated
                           })
                         }, 500)
                       }}
                     />
                   </div>
                 ))}
               </div>
             </div>
           </Reveal>
         ) : (
           <div
             style={{
               minHeight: 260,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               textAlign: 'center',
               color: '#64748B',
               fontSize: 16,
               fontWeight: 600,
             }}
           >
             No images available in this category yet.
           </div>
         )}
            
          </div>
        </section>
      )}

      {/* Full-screen image viewer */}
      {isViewerOpen && filtered[viewerIndex] && (
        <div
          className="gallery-viewer"
          onClick={() => setIsViewerOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="gallery-viewer-close"
            onClick={(e) => { e.stopPropagation(); setIsViewerOpen(false) }}
            aria-label="Close viewer"
          >
            ✕
          </button>

          <button
            className="gallery-viewer-nav gallery-viewer-nav-prev"
            onClick={(e) => { e.stopPropagation(); goTo(-1) }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="gallery-viewer-stage" onClick={e => e.stopPropagation()}>
            <img
              key={viewerIndex}
              className={`gallery-viewer-img ${openingAnim ? '' : (slideDir === 1 ? 'gallery-viewer-img-next' : 'gallery-viewer-img-prev')}`}
              src={filtered[viewerIndex].id}
              alt={filtered[viewerIndex].alt}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>

          <button
            className="gallery-viewer-nav gallery-viewer-nav-next"
            onClick={(e) => { e.stopPropagation(); goTo(1) }}
            aria-label="Next image"
          >
            ›
          </button>

          <div className="gallery-viewer-caption">
            {filtered[viewerIndex].alt}
          </div>
          <div className="gallery-viewer-counter">
            {String(viewerIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
          </div>
        </div>
      )}
    </div>
  )
}
