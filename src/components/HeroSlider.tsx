import { useCallback, useEffect, useRef, useState } from 'react'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'

interface HeroSliderProps {
  navigate: (p: Page) => void
  scrollY: number
  heroIn: boolean
}

interface Slide {
  id: string
  img: string
  imgPos: string
  badge: string
  headline: string[]           // lines — second line rendered in teal gradient
  sub: string
  ctaLabel: string
  ctaPage: Page
  ctaSecondaryLabel: string
  ctaSecondaryPage: Page
}

const SLIDES: Slide[] = [
  {
    id: 'campus',
    img: '/hero/slide-1.jpg',
    imgPos: 'center 35%',
    badge: 'Estd. 1998 · Chennai, Tamil Nadu',
    headline: ['A Legacy of', 'Healthcare Excellence'],
    sub: 'Madha College of Nursing — 25 years of transforming passionate students into world-class nursing professionals. INC approved · TNMGRMU affiliated.',
    ctaLabel: 'Explore Our Campus',
    ctaPage: 'about',
    ctaSecondaryLabel: 'Apply for Admission',
    ctaSecondaryPage: 'contact',
  },
  {
    id: 'education',
    img: '/hero/slide-2.jpg',
    imgPos: 'center 40%',
    badge: 'Academic Excellence',
    headline: ['Where Compassion', 'Meets Clinical Mastery'],
    sub: 'Rigorous, evidence-based nursing education delivered by doctorate-qualified faculty with state-of-the-art simulation labs and modern digital classrooms.',
    ctaLabel: 'View All Programmes',
    ctaPage: 'courses',
    ctaSecondaryLabel: 'Meet Our Faculty',
    ctaSecondaryPage: 'departments',
  },
  {
    id: 'clinical',
    img: '/hero/slide-3.jpg',
    imgPos: 'center 30%',
    badge: 'Hospital-Integrated Training',
    headline: ['50% of Your Journey', 'Happens at the Bedside'],
    sub: 'Live clinical rotations across 18 affiliated hospitals in Chennai. Real patients, real responsibility, real confidence — from your very first year.',
    ctaLabel: 'Our Hospital Partners',
    ctaPage: 'departments',
    ctaSecondaryLabel: 'Student Experiences',
    ctaSecondaryPage: 'gallery',
  },
  {
    id: '/hero/slide-4.jpg',
    img: '/hero/slide-4.jpg',
    imgPos: 'center 50%',
    badge: 'Research & Innovation',
    headline: ['Laboratories Built', 'for the Next Decade'],
    sub: 'Cutting-edge simulation suites, anatomy labs, pharmacology rooms, and a research centre backed by DST and ICMR grants with 48+ published papers.',
    ctaLabel: 'Research & Departments',
    ctaPage: 'departments',
    ctaSecondaryLabel: 'Our Facilities',
    ctaSecondaryPage: 'about',
  },
  {
    id: 'studentlife',
    img: '/hero/slide-5.jpg',
    imgPos: 'center 45%',
    badge: 'Campus Life',
    headline: ['More Than a Degree —', 'A Complete Experience'],
    sub: 'Hostel accommodation, sports, cultural events, mentorship programmes, and a vibrant student community that becomes your lifelong professional network.',
    ctaLabel: 'Gallery & Campus Life',
    ctaPage: 'gallery',
    ctaSecondaryLabel: 'Contact Us',
    ctaSecondaryPage: 'contact',
  },
  {
    id: 'admissions',
    img: '/hero/slide-6.jpg',
    imgPos: 'center 25%',
    badge: 'Admissions 2026–27 Open',
    headline: ['Your Future in', 'Healthcare Starts Here'],
    sub: 'Applications for B.Sc., M.Sc., and Post Basic B.Sc. Nursing are now open. Limited seats. Early applicants receive priority counselling.',
    ctaLabel: 'Apply Now — 2026 Batch',
    ctaPage: 'contact',
    ctaSecondaryLabel: 'Admission Process',
    ctaSecondaryPage: 'courses',
  },
]

const INTERVAL = 5500
const TRANSITION_MS = 900

export default function HeroSlider({ navigate, scrollY, heroIn }: HeroSliderProps) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Touch / swipe
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const goTo = useCallback((idx: number) => {
    if (transitioning || idx === current) return
    setTransitioning(true)
    setPrev(current)
    setCurrent(idx)
    setTimeout(() => { setPrev(null); setTransitioning(false) }, TRANSITION_MS)
  }, [current, transitioning])

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])
  const prev2 = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo])

  // Auto-play
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(next, INTERVAL)
  }, [next])

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [resetTimer])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current)
    if (Math.abs(dx) > 48 && dy < 60) {
      if (dx < 0) { next(); resetTimer() } else { prev2(); resetTimer() }
    }
  }

  const slide = SLIDES[current]

  return (
    <section
  className="hero-slider"
  style={{
    position: 'relative',
    height: '100vh',
    minHeight: 700,
    overflow: 'hidden',
    background: '#071A36'
  }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.08) translateY(0px); }
          100% { transform: scale(1.0)  translateY(-16px); }
        }
        @keyframes kenBurnsAlt {
          0%   { transform: scale(1.06) translate(0px, 0px); }
          100% { transform: scale(1.0)  translate(-12px, -10px); }
        }
        .slide-img-active {
          animation: kenBurns ${INTERVAL + TRANSITION_MS}ms cubic-bezier(.25,.46,.45,.94) forwards;
        }
        .slide-img-active-alt {
          animation: kenBurnsAlt ${INTERVAL + TRANSITION_MS}ms cubic-bezier(.25,.46,.45,.94) forwards;
        }
        .slide-enter { opacity: 0; transition: opacity ${TRANSITION_MS}ms cubic-bezier(.4,0,.2,1); }
        .slide-enter-active { opacity: 1; }
        .slide-exit  { opacity: 1; transition: opacity ${TRANSITION_MS}ms cubic-bezier(.4,0,.2,1); }
        .slide-exit-active  { opacity: 0; }

        .hero-text-line {
          overflow: hidden;
        }
        .hero-text-inner {
          transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
        }
        .hero-text-inner.out {
          opacity: 0;
          transform: translateY(28px);
        }
        .hero-text-inner.in {
          opacity: 1;
          transform: translateY(0);
        }

        .slider-dot {
          transition: all .4s cubic-bezier(.16,1,.3,1);
          cursor: pointer;
          border: none;
          background: none;
          padding: 4px;
        }
        .slider-dot-inner {
          height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,.35);
          transition: all .4s cubic-bezier(.16,1,.3,1);
          position: relative;
          overflow: hidden;
        }
        .slider-dot.active .slider-dot-inner {
          background: rgba(255,255,255,.25);
          width: 52px !important;
        }
        .slider-dot-fill {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          background: #18C6C8;
          border-radius: 2px;
        }
        .slider-dot.active .slider-dot-fill {
          animation: dotFill ${INTERVAL}ms linear forwards;
        }
        @keyframes dotFill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        .arrow-btn {
          width: 52px; height: 52px;
          border-radius: 50%;
          background: rgba(255,255,255,.10);
          border: 1.5px solid rgba(255,255,255,.20);
          color: white;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all .3s cubic-bezier(.16,1,.3,1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .arrow-btn:hover {
          background: rgba(24,198,200,.25);
          border-color: rgba(24,198,200,.50);
          transform: scale(1.08);
        }

        .slide-num {
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 14px; font-weight: 600; letter-spacing: .18em;
          color: rgba(255,255,255,.45);
          text-transform: uppercase;
        }

        /* ========================================
   HERO RESPONSIVE DESIGN
======================================== */

.hero-content {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: 90px 48px 0;
  left: 50%;
  transform: translateX(-50%);
}

.hero-bottom-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding: 48px 48px 36px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

@media (max-width: 768px) {

  .hero-slider {
    height: 100svh !important;
    min-height: 680px !important;
  }

  .hero-content {
    padding: 100px 24px 120px !important;
    justify-content: center;
  }

  .hero-content h1 {
    font-size: clamp(38px, 10vw, 52px) !important;
    line-height: 1.05 !important;
    max-width: 100% !important;
  }

  .hero-content p {
    font-size: 17px !important;
    line-height: 1.65 !important;
    max-width: 100% !important;
    margin-bottom: 28px !important;
  }

  .hero-cta-group {
    width: 100%;
    gap: 10px !important;
  }

  .hero-cta-group button {
    padding: 13px 18px !important;
    font-size: 15px !important;
  }

  .float-badge {
    display: none !important;
  }

  .hero-bottom-controls {
    padding: 20px 24px 24px !important;
  }

  .hero-bottom-counter {
    display: none !important;
  }

  .hero-bottom-arrows {
    display: none !important;
  }

  .hero-bottom-dots {
    width: 100%;
    justify-content: center;
  }

  .slider-dot-inner {
    max-width: 36px;
  }

  .hero-scroll-cue {
    display: none !important;
  }
}

@media (max-width: 480px) {

  .hero-slider {
    min-height: 640px !important;
  }

  .hero-content {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  .hero-content h1 {
    font-size: clamp(38px, 10vw, 44px) !important;
  }

  .hero-cta-group {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-cta-group button {
    width: 100%;
    justify-content: center;
  }
}

      `}</style>


      {/* ── Background slides ── */}
      {SLIDES.map((s, i) => {
        const isActive = i === current
        const isExiting = i === prev
        if (!isActive && !isExiting) return null
        return (
          <div
            key={s.id}
            style={{
              position: 'absolute', inset: 0,
              opacity: isActive ? 1 : 0,
              transition: `opacity ${TRANSITION_MS}ms cubic-bezier(.4,0,.2,1)`,
              zIndex: isActive ? 2 : 1,
            }}
          >
            {/* Parallax wrapper */}
            <div style={{
              position: 'absolute', inset: 0,
              transform: `translateY(${scrollY * 0.28}px)`,
              willChange: 'transform',
            }}>
              <img
                src={s.img}
                alt={s.badge}
                className={isActive ? (i % 2 === 0 ? 'slide-img-active' : 'slide-img-active-alt') : ''}
                style={{
                  width: '100%', height: '115%',
                  objectFit: 'cover', objectPosition: s.imgPos,
                  display: 'block',
                }}
              />
            </div>
            {/* Multi-layer overlay — richer depth */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,26,54,.96) 0%, rgba(7,26,54,.78) 48%, rgba(7,26,54,.35) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,26,54,.92) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 50%, rgba(24,198,200,.08) 0%, transparent 55%)' }} />
          </div>
        )
      })}

      {/* ── Decorative orbs (static) ── */}
      <div style={{ position: 'absolute', top: '18%', right: '7%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(24,198,200,.10) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: '12%', left: '4%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,90,168,.14) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 3 }} />

      {/* ── Slide content ── */}
      <div className="hero-content">
        {/* Badge */}
        <div style={{
          marginBottom: 28,
          opacity: heroIn ? 1 : 0,
          transform: heroIn ? 'none' : 'translateY(16px)',
          transition: 'all .7s .05s cubic-bezier(.16,1,.3,1)',
        }}>
          <span className="hero-badge">
            <span className="badge-dot" />
            {slide.badge}
          </span>
        </div>

        {/* Headline — two lines */}
        <div style={{
          marginBottom: 24,
          opacity: heroIn ? 1 : 0,
          transform: heroIn ? 'none' : 'translateY(28px)',
          transition: 'all .85s .15s cubic-bezier(.16,1,.3,1)',
        }}>
          <h1 key={`h-${current}`} className="font-sans" style={{
            fontSize: 'clamp(38px, 5vw, 76px)',
            fontWeight: 700, lineHeight: 1.06, letterSpacing: '-.03em',
            color: 'white', maxWidth: 780,
            animation: `fadeUp .75s cubic-bezier(.16,1,.3,1) forwards`,
          }}>
            {slide.headline[0]}<br/>
            <span className="text-teal-g">{slide.headline[1]}</span>
          </h1>
        </div>

        {/* Sub */}
        <p key={`p-${current}`} style={{
          fontSize: 20, color: 'rgba(255,255,255,.70)', lineHeight: 1.78,
          maxWidth: 540, marginBottom: 44,
          opacity: heroIn ? 1 : 0,
          transform: heroIn ? 'none' : 'translateY(16px)',
          transition: 'all .85s .28s cubic-bezier(.16,1,.3,1)',
          animation: `fadeUp .7s .1s cubic-bezier(.16,1,.3,1) both`,
        }}>
          {slide.sub}
        </p>

        {/* CTAs */}
        <div className="hero-cta-group" style={{
  display: 'flex', gap: 14, flexWrap: 'wrap',
          opacity: heroIn ? 1 : 0,
          transform: heroIn ? 'none' : 'translateY(16px)',
          transition: 'all .85s .42s cubic-bezier(.16,1,.3,1)',
          animation: `fadeUp .7s .2s cubic-bezier(.16,1,.3,1) both`,
        }}>
          <button onClick={() => navigate(slide.ctaPage)} className="btn-teal" style={{ fontSize: 16, padding: '16px 36px' }}>
            {slide.ctaLabel}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button onClick={() => navigate(slide.ctaSecondaryPage)} className="btn-ghost" style={{ fontSize: 15, padding: '15px 36px' }}>
            {slide.ctaSecondaryLabel}
          </button>
        </div>

        {/* Floating accreditation badge */}
        <div className="float-badge" style={{
          position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
          opacity: heroIn ? 1 : 0, transition: 'opacity 1s .8s ease',
        }}>
          <div className="glass-dark" style={{ borderRadius: 24, padding: '28px 32px', textAlign: 'center', minWidth: 176 }}>
            <div style={{ fontSize: 34, marginBottom: 8 }}>🏆</div>
            <div className="font-sans" style={{ color: '#18C6C8', fontSize: 15, fontWeight: 700, letterSpacing: '.06em', marginBottom: 4 }}>INC Approved</div>
            <div style={{ color: 'rgba(255,255,255,.50)', fontSize: 14 }}>TNMGRMU Affiliated</div>
          </div>
        </div>
      </div>

      {/* ── Bottom controls bar ── */}
      <div
  className="hero-bottom-controls"
  style={{
    background: 'linear-gradient(to top, rgba(7,26,54,.80) 0%, transparent 100%)',
    opacity: heroIn ? 1 : 0,
    transition: 'opacity 1s 1s ease',
  }}
>
        {/* Slide counter */}
        <div
  className="hero-bottom-counter"
  style={{ display: 'flex', alignItems: 'center', gap: 12 }}
>
          <span className="slide-num">
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,.2)' }} />
          <span className="slide-num" style={{ color: 'rgba(255,255,255,.3)' }}>
            {slide.badge.split('·')[0].trim()}
          </span>
        </div>

        {/* Dot progress indicators */}
        <div
  className="hero-bottom-dots"
  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={`slider-dot ${i === current ? 'active' : ''}`}
              onClick={() => { goTo(i); resetTimer() }}
            >
              <div className="slider-dot-inner" style={{ width: i === current ? 52 : 20 }}>
                {i === current && <div key={current} className="slider-dot-fill" />}
              </div>
            </button>
          ))}
        </div>

        {/* Arrow navigation */}
       <div
  className="hero-bottom-arrows"
  style={{ display: 'flex', gap: 10 }}
>
          <button
            className="arrow-btn"
            aria-label="Previous slide"
            onClick={() => { prev2(); resetTimer() }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <button
            className="arrow-btn"
            aria-label="Next slide"
            onClick={() => { next(); resetTimer() }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="hero-scroll-cue" style={{
  position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        opacity: heroIn ? 0.6 : 0, transition: 'opacity 1s 1.4s ease',
      }}>
        <div style={{ width: 26, height: 42, border: '1.5px solid rgba(255,255,255,.25)', borderRadius: 13, display: 'flex', justifyContent: 'center', paddingTop: 7 }}>
          <div style={{ width: 3, height: 8, background: '#18C6C8', borderRadius: 2, animation: 'fadeUp 1.6s ease infinite' }} />
        </div>
      </div>
    </section>
  )
}
