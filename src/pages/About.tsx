import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'

interface Props {
  navigate: (p: Page) => void
}

const JOURNEY = [
  {
    year: '1998',
    title: 'Establishment with B.Sc. (N) degree course',
    description:
      'Madha College of Nursing established in Chennai with a vision to produce world-class nursing professionals.',
  },
  {
    year: '1998',
    title: 'University Affiliation',
    description:
      'Formally affiliated to The Tamil Nadu Dr. M.G.R. Medical University, gaining recognition across Tamil Nadu.',
  },
  {
    year: '1998',
    title: 'Indian Nursing Council Recognition',
    description:
    'Received recognition from the Indian Nursing Council, establishing the institution’s commitment to national nursing education standards.',
  },
  {
    year: '2006',
    title: 'Infrastructure Expansion',
    description:
      'New campus building inaugurated with state-of-the-art nursing labs, simulation centre, and modern hostel facilities.',
  },
  {
    year: '2009',
    title: 'M.Sc. (N) with four specialties',
    description:
    'Started the M.Sc. (N) degree programme with four specialties: Medical-Surgical Nursing, Paediatric Nursing, OBG Nursing, and Community Health Nursing.',
  },
  {
    year: '2010',
    title: 'P.B.B.Sc. (N) degree course',
    description:
    'Introduced the P.B.B.Sc. (N) degree programme to provide registered nurses with opportunities for advanced professional education.',
  },
  {
    year: '2010',
    title: 'Research Centre Launch',
    description:
      'Dedicated nursing research centre established. First DST-funded project awarded to faculty.',
  },
  {
    year: '2015',
    title: 'Seat enhancement ',
    description:
    'Enhanced B.Sc. (N) seats from 50 to 100 and M.Sc. (N) seats from 15 to 30, with Mental Health Nursing added as the fifth specialty.',
  },
  {
    year: '2018',
    title: 'Smart Campus Initiative',
    description:
      'Launched fully digital classrooms, e-library, and online patient simulation systems across all departments.',
  },
  {
    year: '2026',
    title: 'Silver Jubilee: 25 Years of Legacy',
    description:
      'Celebrating 25 years of excellence with 3,200+ alumni serving across 35+ countries worldwide.',
  },
];

const ACHIEVEMENTS = [
  { icon: '🎓', label: '3,200+ Alumni', sub: 'Across 35 Countries' },
  { icon: '🏥', label: '18 Hospitals', sub: 'Clinical Affiliations' },
  { icon: '📚', label: '48 Research Papers', sub: 'Published Nationally' },
  { icon: '🌍', label: 'INC Approved', sub: 'Indian Nursing Council' },
  { icon: '💼', label: '98% Placement', sub: '2024 Batch' },
]

export default function About({ navigate }: Props) {
    const journeyRef = useRef<HTMLDivElement | null>(null)
  const [journeyVisible, setJourneyVisible] = useState(false)

  useEffect(() => {
    const element = journeyRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setJourneyVisible(entry.isIntersecting)
      },
      {
        threshold: 0.25,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])
  return (
    <div className="about-page">

      <style>{`
/* =====================================================
   JOURNEY - CONNECTED ANIMATED TIMELINE
   ===================================================== */

.about-journey-timeline {
  position: relative;
  width: 100%;
  padding: 10px 0 35px;
}

/* CONTINUOUS CENTER LINE */

.about-journey-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 3px;
  background: #d7dee8;
  transform: translateX(-50%);
  border-radius: 10px;
  z-index: 0;
}

/* ONE ROW = LEFT CARD + DOT + RIGHT CARD */

.about-journey-row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 48px minmax(0, 1fr);
  align-items: center;
  width: 100%;
  min-height: 205px;
  box-sizing: border-box;
  z-index: 1;
}

/* LEFT / RIGHT AREAS */

.about-journey-left,
.about-journey-right {
  display: flex;
  align-items: center;
  min-width: 0;
}

.about-journey-left {
  justify-content: flex-end;
}

.about-journey-right {
  justify-content: flex-start;
}

/* =====================================================
   CARDS
   ===================================================== */

.about-journey-card {
  position: relative;
  width: 100%;
  max-width: 390px;
  min-height: 165px;
  background: #ffffff;
  border: 1px solid rgba(11, 37, 69, 0.08);
  border-radius: 16px;
  padding: 22px 24px;
  box-sizing: border-box;
  box-shadow: 0 10px 28px rgba(11, 37, 69, 0.08);
  z-index: 3;
  opacity: 0;
  will-change: transform, opacity;
  transition:
    transform 0.35s cubic-bezier(.16,1,.3,1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

/* LEFT CARD STARTS FROM LEFT */

.about-journey-left .about-journey-card {
  transform: translateX(-120px) scale(.96);
}

/* LEFT CARD ANIMATION */

.about-journey-timeline.journey-visible
.about-journey-left .about-journey-card {
  animation:
    journeyLeftCard .55s cubic-bezier(.16,1,.3,1) forwards;
}

/* RIGHT CARD STARTS FROM RIGHT */

.about-journey-right .about-journey-card {
  transform: translateX(120px) scale(.96);
}

/* RIGHT CARD ANIMATION */

.about-journey-timeline.journey-visible
.about-journey-right .about-journey-card {
  animation:
    journeyRightCard .55s cubic-bezier(.16,1,.3,1) forwards;
}

/* =====================================================
   LEFT CARD → CENTER
   ===================================================== */

@keyframes journeyLeftCard {

  0% {
    opacity: 0;
    transform: translateX(-120px) scale(.96);
  }

  55% {
    opacity: 1;
    transform: translateX(14px) scale(1.02);
    box-shadow: 0 18px 38px rgba(11,37,69,.14);
  }

  78% {
    transform: translateX(-4px) scale(1.005);
  }

  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
    box-shadow: 0 10px 28px rgba(11,37,69,.08);
  }

}

/* =====================================================
   RIGHT CARD → CENTER
   ===================================================== */

@keyframes journeyRightCard {

  0% {
    opacity: 0;
    transform: translateX(120px) scale(.96);
  }

  55% {
    opacity: 1;
    transform: translateX(-14px) scale(1.02);
    box-shadow: 0 18px 38px rgba(11,37,69,.14);
  }

  78% {
    transform: translateX(4px) scale(1.005);
  }

  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
    box-shadow: 0 10px 28px rgba(11,37,69,.08);
  }

}

/* =====================================================
   HORIZONTAL CONNECTORS
   ===================================================== */

.about-journey-left::after,
.about-journey-right::before {
  content: '';
  display: block;
  width: 42px;
  height: 2px;
  background: #18C6C8;
  flex-shrink: 0;
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}

/* CONNECTOR ANIMATION */

.about-journey-timeline.journey-visible
.about-journey-left::after,
.about-journey-timeline.journey-visible
.about-journey-right::before {
  animation:
    journeyConnector .25s ease-out forwards;
}

/* LEFT CONNECTOR GROWS TOWARD DOT */

.about-journey-left::after {
  transform-origin: right center;
}

/* RIGHT CONNECTOR GROWS TOWARD DOT */

.about-journey-right::before {
  transform-origin: left center;
}

@keyframes journeyConnector {

  0% {
    opacity: 0;
    transform: scaleX(0);
  }

  100% {
    opacity: 1;
    transform: scaleX(1);
  }

}

/* =====================================================
   CENTER DOT
   ===================================================== */

.about-journey-dot {
  position: relative;
  width: 18px;
  height: 18px;
  margin: 0 auto;
  border-radius: 50%;
  background: #18C6C8;
  border: 4px solid #ffffff;
  box-shadow:
    0 0 0 3px rgba(24,198,200,.18),
    0 0 18px rgba(24,198,200,.35);
  box-sizing: border-box;
  opacity: 0;
  transform: scale(0);
  z-index: 5;
}

/* DOT ANIMATION */

.about-journey-timeline.journey-visible
.about-journey-dot {
  animation:
    journeyDot .30s cubic-bezier(.16,1,.3,1) forwards;
}

@keyframes journeyDot {

  0% {
    opacity: 0;
    transform: scale(0);
  }

  55% {
    opacity: 1;
    transform: scale(1.35);
  }

  75% {
    transform: scale(.92);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }

}

/* =====================================================
   YEAR / TITLE / DESCRIPTION
   ===================================================== */

.about-journey-year {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 68px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(24,198,200,.10);
  color: #18C6C8;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: .08em;
  margin-bottom: 9px;
}

.about-journey-title {
  font-size: 19px;
  font-weight: 800;
  color: #0B2545;
  margin-bottom: 9px;
}

.about-journey-desc {
  color: #475569;
  font-size: 14px;
  line-height: 1.65;
  margin: 0;
}

/* =====================================================
   FAST ANIMATION ORDER
   ===================================================== */

/* 1998 */

.about-journey-row:nth-child(1)
.about-journey-left .about-journey-card {
  animation-delay: 0s;
}

.about-journey-row:nth-child(1)
.about-journey-right .about-journey-card {
  animation-delay: .35s;
}

.about-journey-row:nth-child(1)
.about-journey-left::after {
  animation-delay: .25s;
}

.about-journey-row:nth-child(1)
.about-journey-right::before {
  animation-delay: .60s;
}

.about-journey-row:nth-child(1)
.about-journey-dot {
  animation-delay: .75s;
}


/* 2006 */

.about-journey-row:nth-child(2)
.about-journey-left .about-journey-card {
  animation-delay: .90s;
}

.about-journey-row:nth-child(2)
.about-journey-right .about-journey-card {
  animation-delay: 1.25s;
}

.about-journey-row:nth-child(2)
.about-journey-left::after {
  animation-delay: 1.15s;
}

.about-journey-row:nth-child(2)
.about-journey-right::before {
  animation-delay: 1.50s;
}

.about-journey-row:nth-child(2)
.about-journey-dot {
  animation-delay: 1.65s;
}


/* 2014 */

.about-journey-row:nth-child(3)
.about-journey-left .about-journey-card {
  animation-delay: 1.80s;
}

.about-journey-row:nth-child(3)
.about-journey-right .about-journey-card {
  animation-delay: 2.15s;
}

.about-journey-row:nth-child(3)
.about-journey-left::after {
  animation-delay: 2.05s;
}

.about-journey-row:nth-child(3)
.about-journey-right::before {
  animation-delay: 2.40s;
}

.about-journey-row:nth-child(3)
.about-journey-dot {
  animation-delay: 2.55s;
}


/* 2026 */

.about-journey-row:nth-child(4)
.about-journey-left .about-journey-card {
  animation-delay: 2.70s;
}

.about-journey-row:nth-child(4)
.about-journey-left::after {
  animation-delay: 2.95s;
}

.about-journey-row:nth-child(4)
.about-journey-dot {
  animation-delay: 3.10s;
}



/* ROW 5 */

.about-journey-row:nth-child(5)
.about-journey-left .about-journey-card {
  animation-delay: 3.60s;
}

.about-journey-row:nth-child(5)
.about-journey-right .about-journey-card {
  animation-delay: 3.95s;
}

.about-journey-row:nth-child(5)
.about-journey-left::after {
  animation-delay: 3.85s;
}

.about-journey-row:nth-child(5)
.about-journey-right::before {
  animation-delay: 4.20s;
}

.about-journey-row:nth-child(5)
.about-journey-dot {
  animation-delay: 4.35s;
}


/* =====================================================
   HOVER
   ===================================================== */

.about-journey-card:hover {

  border-color: rgba(24,198,200,.35);

  box-shadow:
    0 20px 42px rgba(11,37,69,.13),
    0 0 20px rgba(24,198,200,.06);

  transform: translateY(-5px) !important;

}
  /* =====================================================
   MOBILE — VISION / MISSION BOX SIZE
   EXISTING ANIMATION UNCHANGED
   ===================================================== */

@media (max-width: 768px) {

  .about-vision-section {
    padding: 64px 16px !important;
    overflow-x: hidden !important;
  }

  .about-vision-grid {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
    width: 100% !important;
  }

  .about-vision-card {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    padding: 28px 24px !important;
    border-radius: 22px !important;
  }

/* =====================================================
   MOBILE — JOURNEY TIMELINE
   ===================================================== */

@media (max-width: 768px) {

  .about-timeline-section {
    padding: 70px 16px !important;
    overflow-x: hidden !important;
  }

  .about-timeline-section > div {
    width: 100% !important;
    max-width: 100% !important;
  }

  .about-journey-timeline {
    width: 100% !important;
    padding: 10px 0 20px 28px !important;
    box-sizing: border-box !important;
  }

  /* Timeline line moves to the LEFT */
  .about-journey-timeline::before {
    left: 12px !important;
    width: 3px !important;
    transform: none !important;
  }

  /* One column on mobile */
  .about-journey-row {
    display: block !important;
    width: 100% !important;
    min-height: 0 !important;
    margin-bottom: 28px !important;
    box-sizing: border-box !important;
  }

  /* Both sides become full-width */
  .about-journey-left,
  .about-journey-right {
    display: block !important;
    width: 100% !important;
    min-width: 0 !important;
  }

  .about-journey-left {
    padding: 0 !important;
  }

  .about-journey-right {
    padding: 0 !important;
    margin-top: 20px !important;
  }

  /* Timeline cards */
  .about-journey-card {
    width: 100% !important;
    max-width: none !important;
    min-height: 0 !important;
    padding: 24px 20px !important;
    border-radius: 20px !important;
    box-sizing: border-box !important;
  }

  /* Remove desktop horizontal animation distance on mobile */
  .about-journey-left .about-journey-card,
  .about-journey-right .about-journey-card {
    transform: translateX(0) scale(.96) !important;
  }

  /* Keep cards visible after animation */
  .about-journey-timeline.journey-visible
  .about-journey-left .about-journey-card,
  .about-journey-timeline.journey-visible
  .about-journey-right .about-journey-card {
    animation-name: journeyMobileCard !important;
  }

  /* Connectors are not needed horizontally on mobile */
  .about-journey-left::after,
  .about-journey-right::before {
    display: none !important;
  }

  /* Mobile timeline dot */
  .about-journey-dot {
    position: absolute !important;
    left: -23px !important;
    top: 50% !important;
    width: 16px !important;
    height: 16px !important;
    margin: 0 !important;
    transform: translateY(-50%) scale(0) !important;
  }

  .about-journey-timeline.journey-visible
  .about-journey-dot {
    animation-name: journeyMobileDot !important;
  }

  /* Mobile year */
  .about-journey-year {
    min-width: 64px !important;
    padding: 6px 12px !important;
    font-size: 13px !important;
    margin-bottom: 10px !important;
  }

  /* Mobile title */
  .about-journey-title {
    font-size: 18px !important;
    line-height: 1.4 !important;
    margin-bottom: 10px !important;
  }

  /* Mobile description */
  .about-journey-desc {
    font-size: 15px !important;
    line-height: 1.7 !important;
  }

}

/* =====================================================
   MOBILE JOURNEY ANIMATION
   ===================================================== */

@keyframes journeyMobileCard {

  0% {
    opacity: 0;
    transform: translateX(0) scale(.96);
  }

  60% {
    opacity: 1;
    transform: translateX(0) scale(1.01);
  }

  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

}

@keyframes journeyMobileDot {

  0% {
    opacity: 0;
    transform: translateY(-50%) scale(0);
  }

  60% {
    opacity: 1;
    transform: translateY(-50%) scale(1.25);
  }

  100% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }

}

/* =====================================================
   VERY SMALL MOBILE
   EXISTING ANIMATION UNCHANGED
   ===================================================== */

@media (max-width: 480px) {

  .about-vision-card {
    padding: 24px 20px !important;
  }

  .about-journey-timeline {
    padding-left: 20px !important;
  }

  .about-journey-row {
    grid-template-columns: minmax(0, 1fr) 24px minmax(0, 1fr) !important;
  }

  .about-journey-card {
    padding: 18px 16px !important;
    border-radius: 16px !important;
  }

  .about-journey-title {
    font-size: 16px !important;
  }

  .about-journey-desc {
    font-size: 14px !important;
  }

}
@media (max-width: 480px) {

  .about-vision-card {
    padding: 24px 20px !important;
    border-radius: 20px !important;
  }

  .about-journey-timeline {
    padding-left: 24px !important;
  }

  .about-journey-timeline::before {
    left: 10px !important;
  }

  .about-journey-dot {
    left: -21px !important;
  }

  .about-journey-card {
    padding: 22px 18px !important;
    border-radius: 18px !important;
  }

  .about-journey-title {
    font-size: 17px !important;
  }

  .about-journey-desc {
    font-size: 14px !important;
    line-height: 1.65 !important;
  }

}
       
      `}</style>


      {/* =====================================================
          BANNER
          ===================================================== */}

      <section
        className="about-banner"
        style={{
          position: 'relative',
          height: 520,
          overflow: 'hidden',
          background: '#0B2545'
        }}
      >

        <img
          src="/campus/madaha-nursing-college-9.webp"
          alt="Madha College students"
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.25
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(11,37,69,.9) 0%, rgba(30,90,168,.6) 100%)'
          }}
        />

        <div
          className="about-hero-content"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            textAlign: 'center',
            padding: '190px 40px 0'
          }}
        >

          <span
            className="section-tag"
            style={{ marginBottom: 20 }}
          >
            About Us
          </span>

          <h1
            className="font-sans"
            style={{
              fontSize: 'clamp(40px, 5vw, 80px)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-.03em'
            }}
          >
            Our Story &<br />
            <span className="text-teal-g">
              Our Mission
            </span>
          </h1>

          <p
            style={{
              color: '#F1F5F9',
              fontSize: 20,
              maxWidth: 560,
              marginTop: 20,
              lineHeight: 1.7
            }}
          >
            25 years of transforming lives through compassionate nursing education
          </p>

        </div>
      </section>


      {/* =====================================================
          VISION & MISSION
          ===================================================== */}

      <section
        className="about-vision-section"
        style={{
          background: '#FAFBFD',
          padding: '100px 40px'
        }}
      >

        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto'
          }}
        >

          <div
            className="about-vision-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48
            }}
          >

            {[
              {
                icon: '🎯',
                title: 'Our Vision',
                text:
                  'To nurture students by developing their dedication, commitment, compassion, and goodwill towards patient care in both hospital and community settings.To establish a centre of excellence in nursing that offers outstanding, evidence-based educational programmes to advance patient care.',
                color: '#0B2545',
              },
              {
                icon: '💡',
                title: 'Our Mission',
                text:
                  'Madha College of Nursing is dedicated to educating and producing nurses prepared to lead within the profession while advancing nursing research. We place immense importance on preparing highly trained professionals who are caring, innovative, and capable of addressing evolving healthcare needs while adhering to ethical and cultural values.',
                color: '#1E5AA8',
              },
            ].map((item, i) => (

              <Reveal
                key={item.title}
                delay={(i + 1) as 1 | 2}
                type="scale"
              >

                <div
                  className="about-vision-card"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(11,37,69,.04) 0%, rgba(24,198,200,.04) 100%)',
                    border:
                      '1px solid rgba(11,37,69,.08)',
                    borderRadius: 28,
                    padding: '48px',
                    transition:
                      'all .4s cubic-bezier(.16,1,.3,1)',
                  }}

                  onMouseEnter={e => {
                    const el =
                      e.currentTarget as HTMLDivElement

                    el.style.borderColor =
                      'rgba(24,198,200,.3)'

                    el.style.boxShadow =
                      '0 24px 48px rgba(11,37,69,.1)'

                    el.style.transform =
                      'translateY(-6px)'
                  }}

                  onMouseLeave={e => {
                    const el =
                      e.currentTarget as HTMLDivElement

                    el.style.borderColor =
                      'rgba(11,37,69,.08)'

                    el.style.boxShadow = 'none'

                    el.style.transform = 'none'
                  }}
                >

                  <div
                    style={{
                      fontSize: 40,
                      marginBottom: 20
                    }}
                  >
                    {item.icon}
                  </div>

                  <h3
                    className="font-sans"
                    style={{
                      fontSize: 28,
                      fontWeight: 600,
                      color: item.color,
                      marginBottom: 16,
                      letterSpacing: '-.01em'
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      color: '#1E293B',
                      fontSize:
                        'clamp(16px, 1.35vw, 18px)',
                      lineHeight: 1.8
                    }}
                  >
                    {item.text}
                  </p>

                  <div
                    style={{
                      marginTop: 24,
                      width: 48,
                      height: 3,
                      background:
                        'linear-gradient(90deg,#18C6C8,#1E5AA8)',
                      borderRadius: 2
                    }}
                  />

                </div>

              </Reveal>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          OUR JOURNEY
          ===================================================== */}

      <section
        className="about-timeline-section"
        style={{
          background: '#F3F7FB',
          padding: '100px 40px'
        }}
      >

        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto'
          }}
        >

          {/* JOURNEY HEADING */}

          <div
            style={{
              textAlign: 'center',
              marginBottom: 55
            }}
          >

            <Reveal>
              <span className="section-tag">
                Our Journey
              </span>
            </Reveal>

            <Reveal delay={1}>

              <h2
                className="font-sans"
                style={{
                  fontSize: 'clamp(28px, 3vw, 44px)',
                  fontWeight: 700,
                  color: '#0B2545',
                  marginTop: 16,
                  lineHeight: 1.1,
                  letterSpacing: '-.02em'
                }}
              >
                25 Years of{' '}
                <span className="text-teal-g">
                  Excellence
                </span>
              </h2>

            </Reveal>

          </div>


          {/* =================================================
              PROFESSIONAL CONNECTED JOURNEY TIMELINE
              ================================================= */}

<div
  ref={journeyRef}
  className={`about-journey-timeline ${
    journeyVisible ? 'journey-visible' : ''
  }`}
>

            {/* ROW 1 - 1998 + 1998 */}
            <div className="about-journey-row">
              <div className="about-journey-left">
                <div className="about-journey-card">
                  <div className="about-journey-year">{JOURNEY[0].year}</div>
                  <div className="about-journey-title">{JOURNEY[0].title}</div>
                  {JOURNEY[0].description && (
                    <p className="about-journey-desc">{JOURNEY[0].description}</p>
                  )}
                </div>
              </div>
              <div className="about-journey-dot" />
              <div className="about-journey-right">
                <div className="about-journey-card">
                  <div className="about-journey-year">{JOURNEY[1].year}</div>
                  <div className="about-journey-title">{JOURNEY[1].title}</div>
                  {JOURNEY[1].description && (
                    <p className="about-journey-desc">{JOURNEY[1].description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ROW 2 - 1998 + 2006 */}
            <div className="about-journey-row">
              <div className="about-journey-left">
                <div className="about-journey-card">
                  <div className="about-journey-year">{JOURNEY[2].year}</div>
                  <div className="about-journey-title">{JOURNEY[2].title}</div>
                  {JOURNEY[2].description && (
                    <p className="about-journey-desc">{JOURNEY[2].description}</p>
                  )}
                </div>
              </div>
              <div className="about-journey-dot" />
              <div className="about-journey-right">
                <div className="about-journey-card">
                  <div className="about-journey-year">{JOURNEY[3].year}</div>
                  <div className="about-journey-title">{JOURNEY[3].title}</div>
                  {JOURNEY[3].description && (
                    <p className="about-journey-desc">{JOURNEY[3].description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ROW 3 - 2009 + 2010 */}
            <div className="about-journey-row">
              <div className="about-journey-left">
                <div className="about-journey-card">
                  <div className="about-journey-year">{JOURNEY[4].year}</div>
                  <div className="about-journey-title">{JOURNEY[4].title}</div>
                  {JOURNEY[4].description && (
                    <p className="about-journey-desc">{JOURNEY[4].description}</p>
                  )}
                </div>
              </div>
              <div className="about-journey-dot" />
              <div className="about-journey-right">
                <div className="about-journey-card">
                  <div className="about-journey-year">{JOURNEY[5].year}</div>
                  <div className="about-journey-title">{JOURNEY[5].title}</div>
                  {JOURNEY[5].description && (
                    <p className="about-journey-desc">{JOURNEY[5].description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ROW 4 - 2010 + 2015 */}
            <div className="about-journey-row">
              <div className="about-journey-left">
                <div className="about-journey-card">
                  <div className="about-journey-year">{JOURNEY[6].year}</div>
                  <div className="about-journey-title">{JOURNEY[6].title}</div>
                  {JOURNEY[6].description && (
                    <p className="about-journey-desc">{JOURNEY[6].description}</p>
                  )}
                </div>
              </div>
              <div className="about-journey-dot" />
              <div className="about-journey-right">
                <div className="about-journey-card">
                  <div className="about-journey-year">{JOURNEY[7].year}</div>
                  <div className="about-journey-title">{JOURNEY[7].title}</div>
                  {JOURNEY[7].description && (
                    <p className="about-journey-desc">{JOURNEY[7].description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ROW 5 - 2018 + 2026 */}
            <div className="about-journey-row">
              <div className="about-journey-left">
                <div className="about-journey-card">
                  <div className="about-journey-year">{JOURNEY[8].year}</div>
                  <div className="about-journey-title">{JOURNEY[8].title}</div>
                  {JOURNEY[8].description && (
                    <p className="about-journey-desc">{JOURNEY[8].description}</p>
                  )}
                </div>
              </div>
              <div className="about-journey-dot" />
              <div className="about-journey-right">
                <div className="about-journey-card">
                  <div className="about-journey-year">{JOURNEY[9].year}</div>
                  <div className="about-journey-title">{JOURNEY[9].title}</div>
                  {JOURNEY[9].description && (
                    <p className="about-journey-desc">{JOURNEY[9].description}</p>
                  )}
                </div>
              </div>
            </div>
            </div>

          </div>

      </section>


      {/* =====================================================
          ACHIEVEMENTS
          ===================================================== */}

      <section
        className="about-achievements"
        style={{
          background: '#FAFBFD',
          padding: '100px 40px'
        }}
      >

        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto'
          }}
        >

          <div
            style={{
              textAlign: 'center',
              marginBottom: 64
            }}
          >

            <Reveal>
              <span className="section-tag">
                Achievements
              </span>
            </Reveal>

            <Reveal delay={1}>

              <h2
                className="font-sans"
                style={{
                  fontSize:
                    'clamp(34px, 4vw, 56px)',
                  fontWeight: 700,
                  color: '#0B2545',
                  marginTop: 20,
                  lineHeight: 1.1,
                  letterSpacing: '-.02em'
                }}
              >
                Milestones That{' '}
                <span className="text-teal-g">
                  Define Us
                </span>
              </h2>

            </Reveal>

          </div>


          <div
            className="about-achievements-grid"
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 24
            }}
          >

            {ACHIEVEMENTS.map((a, i) => (

              <Reveal
                key={a.label}
                delay={
                  (i + 1) as
                    | 1
                    | 2
                    | 3
                    | 4
                    | 5
                    | 6
                }
                type="scale"
              >

                <div
                  style={{
                    background: 'white',
                    borderRadius: 24,
                    padding: '36px 24px',
                    textAlign: 'center',
                    border:
                      '1px solid rgba(11,37,69,.07)',
                    transition:
                      'all .4s cubic-bezier(.16,1,.3,1)',
                    boxShadow:
                      '0 2px 12px rgba(11,37,69,.04)'
                  }}

                  onMouseEnter={e => {
                    const el =
                      e.currentTarget as HTMLDivElement

                    el.style.borderColor =
                      'rgba(24,198,200,.35)'

                    el.style.transform =
                      'translateY(-8px)'

                    el.style.boxShadow =
                      '0 24px 48px rgba(11,37,69,.12)'
                  }}

                  onMouseLeave={e => {
                    const el =
                      e.currentTarget as HTMLDivElement

                    el.style.borderColor =
                      'rgba(11,37,69,.07)'

                    el.style.transform = 'none'

                    el.style.boxShadow =
                      '0 2px 12px rgba(11,37,69,.04)'
                  }}
                >

                  <div
                    style={{
                      fontSize: 36,
                      marginBottom: 16
                    }}
                  >
                    {a.icon}
                  </div>

                  <div
                    className="font-sans"
                    style={{
                      fontWeight: 700,
                      fontSize: 19,
                      color: '#0B2545',
                      marginBottom: 6
                    }}
                  >
                    {a.label}
                  </div>

                  <div
                    style={{
                      color: '#18C6C8',
                      fontSize: 14,
                      fontWeight: 600
                    }}
                  >
                    {a.sub}
                  </div>

                </div>

              </Reveal>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CAMPUS PHOTO
          ===================================================== */}

      <section
        className="about-campus-section"
        style={{
          padding: '0 40px 100px'
        }}
      >

        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto'
          }}
        >

          <Reveal type="scale">

            <div
              className="about-campus-card"
              style={{
                borderRadius: 32,
                overflow: 'hidden',
                height: 480,
                position: 'relative'
              }}
            >

              <img
                src="/campus/madaha-nursing-college-9.webp"
                alt="Madha College campus"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to right, rgba(11,37,69,.7) 0%, transparent 60%)'
                }}
              />

              <div
                className="about-campus-content"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 64,
                  transform: 'translateY(-50%)'
                }}
              >

                <div
                  className="font-sans"
                  style={{
                    fontSize: 38,
                    fontWeight: 700,
                    color: 'white',
                    lineHeight: 1.2,
                    marginBottom: 16
                  }}
                >
                  A Campus Built
                  <br />
                  for Excellence
                </div>

                <p
                  style={{
                    color: '#F1F5F9',
                    fontSize:
                      'clamp(16px, 1.35vw, 18px)',
                    maxWidth: 360,
                    lineHeight: 1.7
                  }}
                >
                  80-acre campus with world-class laboratories,
                  hostel, library, and dedicated clinical
                  simulation centre.
                </p>

                <button
                  onClick={() => navigate('contact')}
                  className="btn-teal"
                  style={{ marginTop: 28 }}
                >
                  Plan a Visit
                </button>

              </div>

            </div>

          </Reveal>

        </div>

      </section>

    </div>
  )
}