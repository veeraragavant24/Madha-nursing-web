import { useState } from 'react'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'
interface Props { navigate: (p: Page) => void }

const CATEGORIES = ['All', 'Campus', 'Clinical', 'Laboratory', 'Events', 'Students']

const IMAGES = [
  { id: 'photo-1758270704262-ecc82b23dc37', cat: 'Students', alt: 'Professor lecturing students', h: 280 },
  { id: 'photo-1691139601099-932c01ec198b', cat: 'Clinical', alt: 'Nurse caring for patient', h: 200 },
  { id: 'photo-1614935151651-0bea6508db6b', cat: 'Laboratory', alt: 'Research laboratory', h: 240 },
  { id: 'photo-1680084521816-cc1ad0433ceb', cat: 'Campus', alt: 'College campus building', h: 220 },
  { id: 'photo-1765896387387-0538bc9f997e', cat: 'Clinical', alt: 'Nurse smiling with patient', h: 260 },
  { id: 'photo-1758270705067-0d7edee57af0', cat: 'Students', alt: 'Students in class', h: 190 },
  { id: 'photo-1511174511562-5f7f18b874f8', cat: 'Laboratory', alt: 'Microscopy research', h: 230 },
  { id: 'photo-1639772823849-6efbd173043c', cat: 'Laboratory', alt: 'Lab work with test tubes', h: 210 },
  { id: 'photo-1758270704286-83476deb3bd1', cat: 'Students', alt: 'Students raising hands', h: 270 },
  { id: 'photo-1758206523766-7c5380ce2f47', cat: 'Clinical', alt: 'Clinical training session', h: 200 },
  { id: 'photo-1656321717360-be568acc171b', cat: 'Campus', alt: 'Campus view', h: 240 },
  { id: 'photo-1758270705482-cee87ea98738', cat: 'Students', alt: 'Students discussion', h: 220 },
  { id: 'photo-1582719471384-894fbb16e074', cat: 'Clinical', alt: 'Medical professional', h: 280 },
  { id: 'photo-1783519890730-3436fd0bf965', cat: 'Clinical', alt: 'Medical students practice', h: 200 },
  { id: 'photo-1582560475093-ba66accbc424', cat: 'Laboratory', alt: 'Laboratory research', h: 230 },
]

export default function Gallery({ navigate }: Props) {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<null | typeof IMAGES[0]>(null)

  const filtered = filter === 'All' ? IMAGES : IMAGES.filter(img => img.cat === filter)

 return (
  <div className="gallery-page" style={{ paddingTop: 72 }}>
      {/* Banner */}
      <style>{`
  .gallery-page {
    width: 100%;
    overflow-x: hidden;
  }

  .gallery-banner {
    padding: 100px 40px;
  }

  .gallery-filter-bar {
    background: white;
    border-bottom: 1px solid rgba(11,37,69,.07);
    position: sticky;
    top: 72px;
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

  .gallery-section {
    padding: 60px 40px 100px;
  }

  .gallery-lightbox {
    position: fixed;
    inset: 0;
    background: rgba(7,26,54,.97);
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

  @media (max-width: 768px) {
    .gallery-banner {
      padding: 70px 20px !important;
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

    .masonry-grid {
      column-count: 2 !important;
      column-gap: 12px !important;
    }

    .masonry-item {
      margin-bottom: 12px !important;
    }

    .gallery-lightbox {
      padding: 20px !important;
    }

    .gallery-lightbox-content {
      max-height: 75vh !important;
    }
  }

  @media (max-width: 480px) {
    .gallery-banner {
      padding: 58px 16px !important;
    }

    .gallery-banner h1 {
      font-size: 34px !important;
    }

    .gallery-section {
      padding: 32px 16px 52px !important;
    }

    .masonry-grid {
      column-count: 1 !important;
    }

    .masonry-item {
      width: 100% !important;
      height: 260px !important;
      margin-bottom: 14px !important;
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
          <h1 className="font-jakarta" style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-.03em', marginTop: 16 }}>
            Life at<br/>
            <span className="text-teal-g">Madha College</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 18, maxWidth: 500, margin: '24px auto 0', lineHeight: 1.75 }}>
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
              fontFamily: 'var(--font-jakarta)', fontWeight: 700, fontSize: 13,
              background: filter === cat ? '#0B2545' : '#F3F7FB',
              color: filter === cat ? 'white' : '#6A7A96',
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
          <div className="masonry-grid">
            {filtered.map((img, i) => (
              <div key={`${img.id}-${i}`} className="masonry-item" style={{ height: img.h, position: 'relative', cursor: 'pointer' }} onClick={() => setLightbox(img)}>
                <img
                  src={`https://images.unsplash.com/${img.id}?w=600&h=${img.h * 2}&fit=crop&auto=format`}
                  alt={img.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, display: 'block' }}
                />
                {/* Hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 16,
                  background: 'rgba(11,37,69,0)', transition: 'background .3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(11,37,69,.5)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(11,37,69,0)' }}
                >
                  <div style={{ opacity: 0, transition: 'opacity .3s', color: 'white', textAlign: 'center' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                  </div>
                  <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, opacity: 0, transition: 'opacity .3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
                  >
                    <span style={{
                      background: 'rgba(24,198,200,.9)', color: 'white', padding: '4px 12px', borderRadius: 100,
                      fontFamily: 'var(--font-jakarta)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em',
                    }}>
                      {img.cat}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              src={`https://images.unsplash.com/${lightbox.id}?w=900&h=700&fit=crop&auto=format`}
              alt={lightbox.alt}
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 20 }}
            />
            <div
  className="gallery-lightbox-caption"
  style={{ textAlign: 'center', marginTop: 20 }}
>
              <span className="font-jakarta" style={{ color: 'rgba(255,255,255,.7)', fontSize: 14 }}>{lightbox.alt}</span>
              <span style={{
                marginLeft: 12, background: 'rgba(24,198,200,.2)', border: '1px solid rgba(24,198,200,.35)',
                color: '#18C6C8', padding: '3px 10px', borderRadius: 100,
                fontFamily: 'var(--font-jakarta)', fontSize: 11, fontWeight: 700,
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
