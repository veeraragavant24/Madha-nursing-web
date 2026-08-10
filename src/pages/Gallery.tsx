import { useState } from 'react'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'
interface Props { navigate: (p: Page) => void }

const CATEGORIES = ['All', 'Campus', 'Clinical', 'Laboratory', 'Events', 'Students']

const IMAGES = [
  { id: '/gallery/lamplight2026/lamp-1.jpeg', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 280 },
  { id: '/gallery/lamplight2026/lamp-2.jpeg', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 200 },
  { id: '/gallery/lamplight2026/lamp-3.jpeg', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 540 },
  { id: '/gallery/lamplight2026/lamp-4.jpeg', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 220 },
  { id: '/gallery/lamplight2026/lamp-5.jpeg', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 260 },
  { id: '/gallery/lamplight2026/lamp-6.jpeg', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 190 },
  { id: '/gallery/lamplight2026/lamp-7.jpeg', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 230 },
  { id: '/gallery/lamplight2026/lamp-8.jpeg', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 210 },
  { id: '/gallery/lamplight2026/lamp-9.jpeg', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 270 },
  { id: '/gallery/lamplight2026/lamp-10.jpeg', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 200 },
  { id: '/gallery/lamplight2026/lamp-11.jpeg', cat: 'Events', event: 'Lamplighting Ceremony', alt: 'Lamplighting Cermonoy', h: 240 },
 

  { id: '/gallery/pongal-2025/1.jpg', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/2.jpg', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/3.jpg', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/4.jpg', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/5.jpg', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/6.jpg', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/7.jpg', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/8.jpg', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/9.jpg', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  { id: '/gallery/pongal-2025/10.jpg', cat: 'Events', event: 'Pongal Celebration', alt: 'Pongal Cermonoy', h: 280 },
  
  { id: '/gallery/Xmas 25/1.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/2.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/3.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/4.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/5.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/6.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/7.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/8.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/9.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/10.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/11.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/12.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/13.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/14.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/15.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/16.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/17.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/18.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/19.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/20.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/21.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/22.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },
{ id: '/gallery/Xmas 25/23.JPG', cat: 'Events', event: 'Christmas Celebration', alt: 'Christmas Celebration', h: 280 },

 
]

export default function Gallery({ navigate }: Props) {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<null | typeof IMAGES[0]>(null)
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>(() => {
  try {
    return JSON.parse(
      sessionStorage.getItem('madha-gallery-loaded') || '{}'
    )
  } catch {
    return {}
  }
})

  const filtered = filter === 'All' ? IMAGES : IMAGES.filter(img => img.cat === filter)

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
     FILTER BAR
  ======================================== */

  .gallery-filter-bar {
    background: white;
    border-bottom: 1px solid rgba(11, 37, 69, 0.07);
    position: sticky;
    top: 42px;
    z-index: 100;
  }

  .gallery-filter-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 16px 40px;
    display: flex;
    gap: 10px;
    overflow-x: auto;
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

  .event-gallery-item {
  position: relative;
  width: 100%;
  height: 280px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 16px;
  background: #e8edf3;
}

/* Loading background */
.event-gallery-item img.image-loaded {
  position: absolute;
  inset: 0;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 8px;

  background: #e9eef4;
  color: #0B2545;

  font-size: 12px;
  font-weight: 600;

  overflow: hidden;
}

/* Moving shimmer */
.gallery-loader-shimmer {
  position: absolute;
  inset: 0;

  background: linear-gradient(
    110deg,
    transparent 25%,
    rgba(255,255,255,0.7) 45%,
    rgba(255,255,255,0.9) 50%,
    rgba(255,255,255,0.7) 55%,
    transparent 75%
  );

  transform: translateX(-100%);
  animation: galleryShimmer 1.4s infinite;
}

@keyframes galleryShimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Small loading icon */
.gallery-loader-icon {
  position: relative;
  z-index: 3;

  font-size: 24px;
  color: #18C6C8;

  animation: galleryPulse 1.2s ease-in-out infinite;
}

.gallery-image-loader span {
  position: relative;
  z-index: 3;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@keyframes galleryPulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.9);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

/* Image before loading */
.event-gallery-item img.image-loading {
  opacity: 0;
  transform: scale(1.04);
}

/* Image after loading */
.event-gallery-item img.image-loaded {
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 0.6s ease,
    transform 0.8s ease;
}

  .event-gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }

  .event-gallery-item:hover img {
    transform: scale(1.04);
  }
/* ========================================
   PREMIUM IMAGE REVEAL
======================================== */

.gallery-reveal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  opacity: 0;

  transition:
    opacity 1.2s ease,
    transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);

  will-change: transform, opacity;
}


/* IMAGE 1 — COMES FROM BOTTOM */

.gallery-reveal-image.reveal-0 {
  transform: translateY(100px) scale(0.96);
}


/* IMAGE 2 — COMES FROM TOP */

.gallery-reveal-image.reveal-1 {
  transform: translateY(-100px) scale(0.96);
}


/* IMAGE 3 — COMES FROM LEFT */

.gallery-reveal-image.reveal-2 {
  transform: translateX(-100px) scale(0.96);
}


/* IMAGE 4 — COMES FROM RIGHT */

.gallery-reveal-image.reveal-3 {
  transform: translateX(100px) scale(0.96);
}


/* IMAGE HAS FINISHED LOADING */

.gallery-reveal-image.image-loaded {
  opacity: 1;
  transform: translate(0, 0) scale(1);
}


/* DELAY BETWEEN EACH PHOTO */

.event-gallery-item:nth-child(3n + 1) .gallery-reveal-image {
  transition-delay: 0s;
}

.event-gallery-item:nth-child(3n + 2) .gallery-reveal-image {
  transition-delay: 0.18s;
}

.event-gallery-item:nth-child(3n + 3) .gallery-reveal-image {
  transition-delay: 0.36s;
}
  /* ========================================
     LIGHTBOX
  ======================================== */

  .gallery-lightbox {
    position: fixed;
    inset: 0;
    background: rgba(7, 26, 54, 0.97);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  .gallery-lightbox-content {
    width: 100%;
    max-width: 900px;
    max-height: 80vh;
    position: relative;
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

    .gallery-filter-inner {
      padding: 12px 16px !important;
      gap: 8px !important;
      scrollbar-width: none;
    }

    .gallery-filter-inner::-webkit-scrollbar {
      display: none;
    }

    .gallery-filter-inner button {
      padding: 9px 18px !important;
      font-size: 12px !important;
      flex-shrink: 0;
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
   

    .gallery-lightbox {
      padding: 20px !important;
    }

    .gallery-lightbox-content {
      max-height: 75vh !important;
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

    .gallery-lightbox {
      padding: 16px !important;
    }

    .gallery-lightbox-content {
      max-height: 70vh !important;
    }

    .gallery-lightbox-content img {
      max-height: 65vh !important;
    }

    .gallery-lightbox-caption {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .gallery-lightbox-caption span:last-child {
      margin-left: 0 !important;
    }
  }
`}</style>
      <section style={{ background: 'linear-gradient(160deg,#071A36 0%,#0B2545 100%)', padding: '100px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(24,198,200,.08) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>Campus Life</span>
          <h1 className="font-sans" style={{ fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 700, color: 'white', lineHeight: 1.1, letterSpacing: '-.03em', marginTop: 16 }}>
            Life at<br/>
            <span className="text-teal-g">Madha College</span>
          </h1>
          <p style={{ color: '#F1F5F9', fontSize: 20, maxWidth: 500, margin: '24px auto 0', lineHeight: 1.75 }}>
            Glimpses of learning, healing, research, and the vibrant community that defines us.
          </p>
        </div>
      </section>

      {/* Filter pills */}
      <div className="gallery-filter-bar">
        <div className="gallery-filter-inner">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: '10px 24px', borderRadius: 100, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
              background: filter === cat ? '#0B2545' : '#F3F7FB',
              color: filter === cat ? 'white' : '#475569',
              transition: 'all .25s', whiteSpace: 'nowrap',
            }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry gallery */}
      <section
  className="gallery-section"
  style={{ background: '#F3F7FB' }}
>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
         {['Lamplighting Ceremony', 'Pongal Celebration','Christmas Celebration'].map(eventName => {
  const eventImages = filtered.filter(img => img.event === eventName)

  if (eventImages.length === 0) return null

  return (
    <div key={eventName} style={{ marginBottom: 70 }}>

      {/* Event Heading */}
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

      {/* Event Images */}
      <div className="event-gallery-grid">
        {eventImages.map((img, i) => (
          <div
            key={`${img.id}-${i}`}
            className="event-gallery-item"
            onClick={() => setLightbox(img)}
          >
          <img
  src={img.id}
  alt={img.alt}
  loading="lazy"
  decoding="async"
  className={`gallery-reveal-image ${
    loadedImages[img.id] ? 'image-loaded' : ''
  } reveal-${i % 4}`}
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
  )
})}
            
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
  className="gallery-lightbox"
  onClick={() => setLightbox(null)}
>
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)',
            color: 'white', width: 48, height: 48, borderRadius: 12, cursor: 'pointer', fontSize: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            ✕
          </button>
          <div
  className="gallery-lightbox-content"
  onClick={e => e.stopPropagation()}
>
            <img
              src={lightbox.id}
              alt={lightbox.alt}
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 20 }}
            />
            <div
  className="gallery-lightbox-caption"
  style={{ textAlign: 'center', marginTop: 20 }}
>
              <span className="font-sans" style={{ color: '#CBD5E1', fontSize: 15 }}>{lightbox.alt}</span>
              <span style={{
                marginLeft: 12, background: 'rgba(24,198,200,.2)', border: '1px solid rgba(24,198,200,.35)',
                color: '#18C6C8', padding: '3px 10px', borderRadius: 100,
                fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
              }}>
                {lightbox.cat}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
