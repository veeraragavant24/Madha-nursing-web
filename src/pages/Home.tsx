import { useEffect, useRef, useState } from 'react'
import { useCounter } from '../hooks/useCounter'
import HeroSlider from '../components/HeroSlider'
import Reveal from '../components/Reveal'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'

interface Props {
  navigate: (p: Page) => void
}

/* ─── Stat item ─── */
function StatItem({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCounter(value, 2000, start)
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="font-sans" style={{ fontSize: 'clamp(40px, 4vw, 64px)', fontWeight: 700, lineHeight: 1, color: 'white', letterSpacing: '-.03em' }}>
        <span className="text-gold-g">{count}</span>
        <span style={{ color: '#18C6C8', fontSize: 'clamp(28px, 3vw, 44px)' }}>{suffix}</span>
      </div>
      <div style={{ color: '#CBD5E1', fontSize: 17, fontWeight: 500, marginTop: 8, letterSpacing: '.04em' }}>{label}</div>
    </div>
  )
}

/* ─── Department cards data ─── */
const DEPTS = [
  { name: 'Medical Surgical Nursing', tag: 'MSN', img: '/departments/msn.webp' },
  { name: 'Paediatric Nursing', tag: 'PDN', img: '/departments/pdn.webp' },
  { name: 'Community Health Nursing', tag: 'CHN', img: '/departments/chn.webp' },
  { name: 'Obstetrics & Gynaecology', tag: 'OBG', img: '/departments/obg.webp' },
  { name: 'Psychiatric Nursing', tag: 'PSY', img: '/departments/psy.webp' },
  { name: 'Research & Development', tag: 'R&D', img: '/departments/r&d.webp' },
]

const PROGRAMS = [
  { code: 'B.Sc', name: 'Bachelor of Science in Nursing', duration: '4 Years', intake: '100 Seats', level: 'Undergraduate' },
  { code: 'M.Sc', name: 'Master of Science in Nursing', duration: '2 Years', intake: '30 Seats', level: 'Postgraduate' },
  { code: 'P.B.B.Sc', name: 'Post Basic B.Sc. Nursing', duration: '2 Years', intake: '30 Seats', level: 'Undergraduate' },
]

const TESTIMONIALS = [
  {
    quote: 'Madha College transformed me from a student to a confident healthcare professional. The clinical training at affiliated hospitals gave me exposure that I couldn\'t have gotten anywhere else.',
    name: 'Priya Venkatesh', role: 'B.Sc. Nursing, Batch 2022', hospital: 'Apollo Hospitals, Chennai',
    avatar: 'PV',
  },
  {
    quote: 'The faculty here are not just teachers — they are mentors who genuinely care about your growth. The research opportunities and the state-of-the-art labs prepared me for my M.Sc. specialisation.',
    name: 'Arjun Krishnamurthy', role: 'M.Sc. Nursing, Batch 2023', hospital: 'AIIMS, New Delhi',
    avatar: 'AK',
  },
  {
    quote: 'From the moment I stepped into Madha College, I knew this was where I would become the nurse I always dreamed of being. The holistic education approach here is truly world-class.',
    name: 'Kavitha Rajan', role: 'Post Basic B.Sc., Batch 2021', hospital: 'Fortis Healthcare, Bengaluru',
    avatar: 'KR',
  },
]

const RESEARCH_ITEMS = [
  { icon: '🔬', title: 'Infectious Disease Management',  desc: 'Researchers have explored the post-pandemic impact on health, transformation needs, and challenges brought by the pandemic to the field of infectious disease management.' },
  { icon: '🧬', title: 'Paediatric Care Innovation',  desc: 'Our faculty are actively involved in original research papers, reviews, and commentaries on the etiology and treatment of diseases and disorders affecting children.' },
  { icon: '🏥', title: 'Community Health Outreach',  desc: 'The institution recognizes the importance of integrating social responsibility and community engagement into research projects to achieve its vision and mission of enhancing the quality of teaching, research, and service.' },
  { icon: '📊', title: 'Evidence-Based Practice',  desc: 'Our researchers focus on integrating the best available evidence with healthcare educators’ expertise and clients’ needs while considering the practice environment for students.' },
]

const GALLERY_IMGS = [
  { src: '/campus/madaha-nursing-college-9.webp', h: 260, alt: 'Madha College campus' },
{ src: '/gallery/lamplight2026/lamp-5.webp', h: 260, alt: 'Lamplighting' },
{ src: '/gallery/Xmas 25/16.webp', h: 260, alt: 'Chirstmas celebration' },
  
  
  { src: '/departments/Mental Health Nrsing/1.webp', h: 240, alt: 'Nursing students' },
  { src: '/gallery/pongal-2025/3.webp', h: 260, alt: 'Pongal Festivel' },
  { src: '/gallery/graduation-2026/7.webp', h: 260, alt: 'Graduation Day' },
  
  
  { src: '/departments/Medical-Surgical-Nursing/1.webp', h: 220, alt: 'Nursing students' },
  { src: '/gallery/Xmas 25/10.webp', h: 260, alt: 'Chirstmas celebration' },
  { src: '/gallery/graduation-2026/6.webp', h: 260, alt: 'Graduation Day' },
]

const ADMISSION_STEPS = [
  { num: '01', title: 'Check Eligibility', desc: 'Passed 10+2 with Physics, Chemistry, Biology and English. Minimum 45% aggregate marks for general category.' },
  { num: '02', title: 'Submit Application', desc: 'Fill the online application form with academic documents, photograph and identification proof.' },
  { num: '03', title: 'Entrance Examination', desc: 'Appear for the TNMGRMU entrance exam or apply through management quota counselling.' },
  { num: '04', title: 'Counselling & Admission', desc: 'Attend counselling session. Submit original certificates and pay the first semester fee.' },
  { num: '05', title: 'Begin Your Journey', desc: 'Report on the designated date for orientation, hostel allotment and academic induction.' },
]


const SEMESTER_SUBJECTS = [
  {
    semester: 'SEMESTER I',
    subjects: [
      'Communicative English',
      'Applied Anatomy',
      'Applied Physiology',
      'Applied Sociology',
      'Applied Psychology',
      'Nursing Foundations I',
    ],
    mandatoryModules: [
      'First Aid as part of Nursing Foundation I Course',
    ],
  },
  {
    semester: 'SEMESTER II',
    subjects: [
      'Applied Biochemistry',
      'Applied Nutrition and Dietetics',
      'Nursing Foundations II',
      'Health/Nursing Informatics & Technology',
    ],
    mandatoryModules: [
      'Health Assessment as part of Nursing Foundation II Course',
    ],
  },
  {
    semester: 'SEMESTER III',
    subjects: [
      'Applied Microbiology and Infection Control including Safety',
      'Pharmacology I',
      'Pathology I',
      'Adult Health (Medical Surgical) Nursing I with integrated pathophysiology',
    ],
    mandatoryModules: [
      'BCLS as part of Adult Health Nursing I',
    ],
  },
  {
    semester: 'SEMESTER IV',
    subjects: [
      'Pharmacology II',
      'Pathology II & Genetics',
      'Adult Health Nursing II with integrated pathophysiology including Geriatric Nursing',
      'Professionalism, Professional Values & Ethics including Bioethics',
    ],
    mandatoryModules: [
      'Fundamentals of Prescribing under Pharmacology II',
      'Palliative care module under Adult Health Nursing II',
    ],
  },
  {
    semester: 'SEMESTER V',
    subjects: [
      'Child Health Nursing I',
      'Mental Health Nursing I',
      'Community Health Nursing I (including Environmental Science & Epidemiology)',
      'Educational Technology/Nursing Education',
      'Introduction to Forensic Nursing and Indian Laws',
    ],
    mandatoryModules: [
      'Essential Newborn Care (ENBC)',
      'Facility Based Newborn Care (FBNBC)',
      'IMNCI and PLS as part of Child Health Nursing',
    ],
  },
  {
    semester: 'SEMESTER VI',
    subjects: [
      'Child Health Nursing II',
      'Mental Health Nursing II',
      'Nursing Management & Leadership',
      'Midwifery/Obstetrics and Gynecology (OBG) Nursing I',
    ],
    mandatoryModules: [
      'SBA Module under OBG Nursing I/II (VI/VII Semester)',
    ],
  },
  {
    semester: 'SEMESTER VII',
    subjects: [
      'Community Health Nursing II',
      'Nursing Research & Statistics',
      'Midwifery/Obstetrics and Gynecology (OBG) Nursing II',
    ],
    mandatoryModules: [
      'Safe delivery app under OBG Nursing I/II (VI/VII Semester)',
    ],
  },
  {
    semester: 'SEMESTER VIII',
    subjects: [
      'Internship (Intensive Practicum/Residency Posting)',
    ],
    mandatoryModules: [],
  },
]

export default function Home({ navigate }: Props) {
  /* Semester accordion */
  const [openSemester, setOpenSemester] = useState<number | null>(null)

  /* Hero parallax */
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Stats trigger */
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Hero text stagger */
  const [heroIn, setHeroIn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setHeroIn(true), 100); return () => clearTimeout(t) }, [])

  return (
  <>
    <style>{`
  .home-page {
    width: 100%;
    overflow-x: hidden;
  }

  .home-responsive-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .home-departments-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .home-dept-card {
  width: 100%;
  height: 300px;
}

.home-dept-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

  .home-feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 40px;
  }

  .home-research-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .home-admissions-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 80px;
    align-items: start;
  }

  .home-admissions-intro {
    position: sticky;
    top: 120px;
  }

  /* ================================
     CLINICAL TRAINING - DESKTOP
  ================================= */

  .home-clinical-section {
    padding: 140px 40px;
  }

  .home-clinical-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  .home-clinical-content,
  .home-clinical-timeline {
    min-width: 0;
    width: 100%;
  }

  .home-clinical-step {
    display: flex;
    gap: 24px;
    width: 100%;
  }

  /* ================================
     SEMESTER HOVER / CLICK DETAILS
  ================================= */

  .home-semester-accordion {
    width: 100%;
  }

  /* Clean, spacious semester list — no divider lines or boxes */
  .home-semester-item {
    width: 100%;
    margin-bottom: 28px;
  }

  .home-semester-item:last-child {
    margin-bottom: 0;
  }

  .home-semester-header {
    width: 100%;
    min-height: 44px;
    padding: 6px 0;
    margin: 0;
    border: none;
    outline: none;
    background: transparent;
    color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
  }

  .home-semester-title {
    font-family: var(--font-sans);
    font-size: 19px;
    font-weight: 750;
    letter-spacing: .10em;
    color: #18C6C8;
    transition: color .25s ease, transform .25s ease;
  }

  .home-semester-item:hover .home-semester-title,
  .home-semester-item.open .home-semester-title {
    color: #5FE3E5;
    transform: translateX(5px);
  }

  .home-semester-content {
    display: block;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    padding: 0;
    margin: 0;
    transition: max-height .4s ease, opacity .3s ease, padding .4s ease, margin .4s ease;
  }

  .home-semester-item:hover .home-semester-content,
  .home-semester-item.open .home-semester-content {
    max-height: 700px;
    opacity: 1;
    padding: 18px 20px 20px;
    margin-top: 8px;
    background: rgba(255,255,255,.035);
    border-radius: 14px;
  }

  .home-semester-subject {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 8px 0;
    color: #E2E8F0;
    font-size: 16px;
    line-height: 1.65;
  }

  .home-semester-number {
    min-width: 26px;
    color: #18C6C8;
    font-weight: 700;
  }

  .home-semester-subject-name {
    flex: 1;
    color: #E8F0F7;
    font-size: 16px;
    line-height: 1.65;
  }

  .home-semester-mandatory {
    margin-top: 14px;
    padding: 13px 16px;
    border: none;
    border-radius: 10px;
    background: rgba(24,198,200,.07);
  }

  .home-semester-mandatory-title {
    margin-bottom: 8px;
    color: #18C6C8;
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  .home-semester-mandatory-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 4px 0;
    color: #CBD5E1;
    font-size: 15px;
    line-height: 1.55;
  }

  /* ================================
     TABLET
  ================================= */

  /* ================================
   HOME STATS
================================ */

.home-stats-section {
  padding: 80px 40px;
}

.home-stats-grid {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr) 1px
    minmax(0, 1fr) 1px
    minmax(0, 1fr) 1px
    minmax(0, 1fr) 1px
    minmax(0, 1fr);
  gap: 32px;
  align-items: center;
}

.home-stat-divider {
  width: 1px;
  height: 80px;
  background: rgba(255,255,255,.08);
  margin: auto;
}
  @media (max-width: 1024px) {

    .home-responsive-grid {
      grid-template-columns: 1fr;
      gap: 48px;
    }

    .home-departments-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }


  /* ================================
     MOBILE
  ================================= */

  @media (max-width: 768px) {

  .home-stats-section {
  padding: 56px 20px !important;
}

/* =====================================================
   MOBILE STATS
   3 ITEMS FIRST ROW
   2 ITEMS SECOND ROW
   ===================================================== */

.home-stats-grid {
  display: grid !important;
  grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
  gap: 42px 6px !important;
  align-items: center !important;
}


/* HIDE ALL DIVIDER ELEMENTS ON MOBILE */

.home-stats-grid > div:nth-child(2),
.home-stats-grid > div:nth-child(4),
.home-stats-grid > div:nth-child(6),
.home-stats-grid > div:nth-child(8) {
  display: none !important;
}


/* =====================================================
   FIRST ROW
   25+ | 3200+ | 18
   ===================================================== */

.home-stats-grid > div:nth-child(1) {
  grid-column: 1 / span 2 !important;
}

.home-stats-grid > div:nth-child(3) {
  grid-column: 3 / span 2 !important;
}

.home-stats-grid > div:nth-child(5) {
  grid-column: 5 / span 2 !important;
}


/* =====================================================
   SECOND ROW
   98% | 120+
   CENTERED
   ===================================================== */

.home-stats-grid > div:nth-child(7) {
  grid-column: 2 / span 2 !important;
}

.home-stats-grid > div:nth-child(9) {
  grid-column: 4 / span 2 !important;
}

.home-stat-divider {
  display: none;
}

    .home-admissions-grid {
      grid-template-columns: 1fr;
      gap: 48px;
    }

    .home-admissions-intro {
      position: static;
    }

    .home-research-cards {
      grid-template-columns: 1fr;
    }

    .home-responsive-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .home-departments-grid {
      grid-template-columns: 1fr;
    }

    .home-feature-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .home-mobile-section {
      padding-left: 20px !important;
      padding-right: 20px !important;
      padding-top: 64px !important;
      padding-bottom: 64px !important;
    }

    .home-why-image {
      width: 100%;
      max-width: 100%;
    }

    .home-floating-stat {
      right: 12px !important;
      bottom: 12px !important;
      min-width: 150px !important;
      padding: 16px 18px !important;
    }

    .home-inc-badge {
      left: 12px !important;
      top: 12px !important;
    }

    .home-dept-card {
      height: 260px !important;
    }


    /* CLINICAL TRAINING MOBILE */

    .home-clinical-section {
      padding: 64px 20px !important;
    }

    .home-clinical-grid {
      display: grid !important;
      grid-template-columns: 1fr !important;
      gap: 52px !important;
      width: 100% !important;
    }

    .home-clinical-content {
      width: 100% !important;
      min-width: 0 !important;
    }

    .home-clinical-timeline {
      width: 100% !important;
      min-width: 0 !important;
      padding-top: 8px;
    }

    .home-clinical-step {
      display: flex !important;
      width: 100% !important;
      gap: 18px !important;
    }

    .home-clinical-section h2 {
      font-size: 34px !important;
    }

    .home-clinical-section p {
      max-width: 100% !important;
      overflow-wrap: break-word;
    }
  }


  /* ================================
     SMALL MOBILE
  ================================= */

  @media (max-width: 480px) {

  .home-stats-section {
  padding: 48px 16px !important;
}

.home-stats-grid {
  display: grid !important;
  grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
  gap: 36px 4px !important;
  align-items: center !important;
}

.home-stats-grid > div:nth-child(2),
.home-stats-grid > div:nth-child(4),
.home-stats-grid > div:nth-child(6),
.home-stats-grid > div:nth-child(8) {
  display: none !important;
}
  portant;
}

.home-stats-grid > div:nth-child(3) {
  grid-column: 3 / span 2 !important;
}

.home-stats-grid > div:nth-child(5) {
  grid-column: 5 / span 2 !important;
}

.home-stats-grid > div:nth-child(7) {
  grid-column: 2 / span 2 !important;
}

.home-stats-grid > div:nth-child(9) {
  grid-column: 4 / span 2 !important;
}


    .home-mobile-section {
      padding-left: 16px !important;
      padding-right: 16px !important;
      padding-top: 52px !important;
      padding-bottom: 52px !important;
    }

    .home-clinical-section {
      padding: 56px 16px !important;
    }

    .home-clinical-grid {
      grid-template-columns: 1fr !important;
      gap: 40px !important;
    }

    .home-clinical-step {
      gap: 14px !important;
    }

    .home-clinical-section h2 {
      font-size: 32px !important;
    }

    .home-clinical-section p {
      font-size: 15px !important;
    }

    .home-floating-stat {
      position: relative !important;
      right: auto !important;
      bottom: auto !important;
      width: 100%;
      margin-top: 14px;
    }

    .home-dept-card {
      height: 230px !important;
    }
  }
    
`}</style>

    <div className="home-page">
      {/* ═══════════════════════════════════════════
          1. HERO — Cinematic slider
      ═══════════════════════════════════════════ */}
      <HeroSlider navigate={navigate} scrollY={scrollY} heroIn={heroIn} />

      {/* ═══════════════════════════════════════════
          2. ANIMATED STATS
      ═══════════════════════════════════════════ */}
     <section
  ref={statsRef}
  className="home-stats-section"
  style={{
    background:
      'linear-gradient(160deg, #071A36 0%, #0B2545 50%, #0E3060 100%)'
  }}
>
  <div style={{ maxWidth: 1280, margin: '0 auto' }}>
    <div className="home-stats-grid">
            <StatItem value={25} suffix="+" label="Years of Excellence" start={statsVisible} />
            <div className="home-stat-divider" />
            <StatItem value={3200} suffix="+" label="Alumni Placed Globally" start={statsVisible} />
            <div style={{ width: 1, height: 80, background: 'rgba(255,255,255,.08)', margin: 'auto' }} />
            <StatItem value={18} suffix="" label="Affiliated Hospitals" start={statsVisible} />
            <div style={{ width: 1, height: 80, background: 'rgba(255,255,255,.08)', margin: 'auto' }} />
            <StatItem value={98} suffix="%" label="Placement Rate" start={statsVisible} />
            <div style={{ width: 1, height: 80, background: 'rgba(255,255,255,.08)', margin: 'auto' }} />
            <StatItem value={120} suffix="+" label="Faculty Members" start={statsVisible} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. WHY MADHA — Magazine editorial
      ═══════════════════════════════════════════ */}
      <section
  className="home-mobile-section"
  style={{ background: '#FAFBFD', padding: '120px 40px' }}
>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
         <div className="home-responsive-grid">
            {/* Video */}
<Reveal type="left">
  <div className="home-why-image" style={{ position: 'relative' }}>
    <div
      style={{
        borderRadius: 28,
        overflow: 'hidden',
        aspectRatio: '4/5',
        position: 'relative',
        background: '#0B2545',
        transition: 'transform .6s cubic-bezier(.16,1,.3,1)',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      >
        <source src="/videos/why-madha.mp4" type="video/mp4" />
      </video>
    </div>
                {/* Floating stat card */}
                <div className="glass-card home-floating-stat" style={{
                  position: 'absolute', bottom: -24, right: -24,
                  borderRadius: 20, padding: '24px 28px', minWidth: 200,
                  boxShadow: '0 24px 48px rgba(11,37,69,.15)',
                }}>
                  <div className="font-sans" style={{ fontSize: 'clamp(40px, 4vw, 64px)', fontWeight: 700, color: '#0B2545', letterSpacing: '-.03em', lineHeight: 1 }}>98%</div>
                  <div style={{ color: '#1E5AA8', fontSize: 17, fontWeight: 600, marginTop: 6 }}>Placement Rate</div>
                  <div style={{ color: '#475569', fontSize: 15, marginTop: 2 }}>2024 Batch</div>
                </div>
                {/* Accreditation badge */}
                <div className="home-inc-badge" style={{
  position: 'absolute', top: 24, left: -24,
                  background: 'linear-gradient(135deg,#18C6C8,#1E5AA8)', borderRadius: 16, padding: '14px 20px',
                  boxShadow: '0 16px 32px rgba(24,198,200,.35)',
                }}>
                  <div className="font-sans" style={{ color: 'white', fontWeight: 700, fontSize: 17 }}>INC</div>
                  <div style={{ color: '#F1F5F9', fontSize: 14, fontWeight: 600, letterSpacing: '.08em' }}>APPROVED</div>
                </div>
              </div>
            </Reveal>

            {/* Content */}
            <div>
              <Reveal delay={1}>
                <span className="section-tag">Why Madha College</span>
              </Reveal>
              <Reveal delay={2}>
                <h2 className="font-sans" style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em', color: '#0B2545', marginTop: 20, marginBottom: 24 }}>
                  Where Compassion<br/>Meets Clinical<br/>
                  <span className="text-teal-g">Excellence</span>
                </h2>
              </Reveal>
              <Reveal delay={3}>
                <p style={{ color: '#1E293B', fontSize: 18, lineHeight: 1.8, marginBottom: 36 }}>
                  At Madha College of Nursing, we believe that great nurses are made through rigorous academic training, hands-on clinical exposure, and character development rooted in compassion. Our 25-year legacy reflects a deep commitment to producing healthcare professionals who lead with both skill and heart.
                </p>
              </Reveal>

              <div className="home-feature-grid">
                {[
                  { icon: '🏥', title: '18 Affiliated Hospitals', desc: 'Live clinical rotations across premier hospitals in Chennai and beyond' },
                  { icon: '🔬', title: 'Modern Laboratories', desc: 'A specialized educational environment with high-fidelity simulation stations, clinical practice beds and workstations, task trainers, and anatomy models.' },
                  { icon: '📚', title: 'Research Culture', desc: 'Research activities in an institution involve systematic investigations and scholarly publications presented at national and international forums.' },
                  { icon: '🌍', title: 'Global Alumni Network', desc: 'Graduates working in USA, UK, UAE, Canada, Australia, and 25+ countries' },
                ].map((item, i) => (
                  <Reveal key={item.title} delay={(i + 3) as 1 | 2 | 3 | 4 | 5 | 6} type="scale">
                    <div style={{
  background: '#F3F7FB',
  borderRadius: 20,
  padding: '22px',
  border: '1px solid rgba(11,37,69,.06)',
  transition: 'all .3s cubic-bezier(.16,1,.3,1)',
  height: '100%',
  minHeight: 240,
  boxSizing: 'border-box',
}}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'white'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(24,198,200,.3)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 32px rgba(11,37,69,.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#F3F7FB'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(11,37,69,.06)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'none' }}
                    >
                      <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
                      <div className="font-sans" style={{ fontWeight: 700, fontSize: 20, color: '#0B2545', marginBottom: 6 }}>{item.title}</div>
                      <div style={{ color: '#1E293B', fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.7 }}>{item.desc}</div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={5}>
                <button onClick={() => navigate('about')} className="btn-outline-navy">
                  Discover Our Story
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

{/* =====================================================
    FULL SCREEN COLLEGE DRONE VIDEO
===================================================== */}
<section className="relative w-full h-screen overflow-hidden bg-[#061B36]">

  <video
    className="absolute inset-0 w-full h-full object-cover"
    src="/videos/college-drone.mp4"
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
  />

  {/* Premium dark overlay */}
  <div className="absolute inset-0 bg-[#061B36]/25 pointer-events-none" />

</section>

      {/* ═══════════════════════════════════════════
          4. PROGRAMS — Premium horizontal cards
      ═══════════════════════════════════════════ */}
      <section style={{ background: '#F3F7FB', padding: '120px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <Reveal><span className="section-tag">Academic Programmes</span></Reveal>
            <Reveal delay={1}>
              
              <h2 className="font-sans" style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em', color: '#0B2545', marginTop: 20 }}>
                Pathways to a<br/>
                <span className="text-navy-g">Nursing Career</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p style={{ color: '#1E293B', fontSize: 18, maxWidth: 520, margin: '20px auto 0', lineHeight: 1.7 }}>
                Affiliated to TNMGRMU, our programmes are designed to meet global healthcare standards with strong clinical exposure from day one.
              </p>
            </Reveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.code} delay={(i + 1) as 1 | 2 | 3 | 4} type="scale">
                <div className="prog-card" onClick={() => navigate('courses')} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex' }}>
                    <div className="prog-bar" style={{ minHeight: 180 }} />
                    <div style={{ padding: '32px 28px', flex: 1 }}>
                      <div style={{
                        display: 'inline-block', background: 'rgba(11,37,69,.06)', borderRadius: 8,
                        padding: '4px 12px', marginBottom: 16,
                        fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, letterSpacing: '.1em', color: '#1E5AA8',
                      }}>
                        {p.level}
                      </div>
                      <div className="font-sans" style={{ fontSize: 40, fontWeight: 700, color: '#0B2545', letterSpacing: '-.02em', lineHeight: 1, marginBottom: 12 }}>
                        {p.code}
                      </div>
                      <div className="font-sans" style={{ fontWeight: 600, fontSize: 17, color: '#16213E', lineHeight: 1.4, marginBottom: 20 }}>
                        {p.name}
                      </div>
                      <div style={{ display: 'flex', gap: 20 }}>
                        <div>
                          <div style={{ color: '#475569', fontSize: 15, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 3 }}>Duration</div>
                          <div className="font-sans" style={{ fontWeight: 700, fontSize: 17, color: '#0B2545' }}>{p.duration}</div>
                        </div>
                        <div>
                          <div style={{ color: '#475569', fontSize: 15, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 3 }}>Intake</div>
                          <div className="font-sans" style={{ fontWeight: 700, fontSize: 17, color: '#0B2545' }}>{p.intake}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    borderTop: '1px solid rgba(11,37,69,.06)', padding: '18px 28px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <span style={{ color: '#18C6C8', fontSize: 16, fontWeight: 600 }}>View Programme</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#18C6C8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Reveal>
              <button onClick={() => navigate('courses')} className="btn-navy">
                View All Programmes & Curriculum
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. CLINICAL TRAINING — Dark immersive
      ═══════════════════════════════════════════ */}
      <section
  className="home-clinical-section"
  style={{
    position: 'relative',
    overflow: 'hidden',
    background: '#071A36'
  }}
>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/departments/Medical-Surgical-Nursing/1.webp')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.18,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(7,26,54,.98) 0%, rgba(7,26,54,.75) 60%, rgba(7,26,54,.50) 100%)',
        }} />

        {/* Teal glow */}
        <div style={{ position: 'absolute', bottom: -200, right: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(24,198,200,.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="home-clinical-grid">
          {/* Left — content */}
<div className="home-clinical-content">
              <Reveal type="left">
                <span className="section-tag" style={{ color: '#18C6C8' }}>Clinical Excellence</span>
              </Reveal>
              <Reveal type="left" delay={1}>
                <h2 className="font-sans" style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em', color: 'white', marginTop: 20, marginBottom: 24 }}>
                  Hands-On Training<br/>at Premier<br/>
                  <span className="text-teal-g">Hospitals</span>
                </h2>
              </Reveal>
              <Reveal type="left" delay={2}>
                <p style={{ color: '#F1F5F9', fontSize: 18, lineHeight: 1.8, marginBottom: 48 }}>
                  Our students spend 50% of their academic time in live hospital environments. Through structured rotations across 18 affiliated hospitals, they develop clinical competency that employers recognise from day one.
                </p>
              </Reveal>

              {/* Hospital list */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                marginBottom: 48,
              }}>
                <Reveal type="left">
                  <div>
                    <span style={{
                      background: 'rgba(24,198,200,.10)',
                      border: '1px solid rgba(24,198,200,.22)',
                      color: '#F1F5F9',
                      padding: '8px 16px',
                      borderRadius: 100,
                      fontSize: 15,
                      fontWeight: 500,
                      display: 'inline-block',
                    }}>
                      Madha Medical College & Hospital
                    </span>

                    <div style={{
                      color: '#F1F5F9',
                      fontSize: 15,
                      fontWeight: 500,
                      marginTop: 12,
                      paddingLeft: 4,
                      lineHeight: 1.6,
                    }}>
                      Affiliated with Accredited Health Care Organizations in Tamilnadu
                    </div>
                  </div>
                </Reveal>
              </div>

<Reveal type="left" delay={3}>
                <button onClick={() => navigate('departments')} className="btn-teal">
                  Explore Departments
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </Reveal>
            </div>

           {/* Right — Timeline */}
<div className="home-clinical-timeline">
              <div className="home-semester-accordion">
              {SEMESTER_SUBJECTS.map((semester, index) => {
                const isOpen = openSemester === index

                return (
                  <div
                    key={semester.semester}
                    className={`home-semester-item ${isOpen ? 'open' : ''}`}
                  >
                    <button
                      type="button"
                      className="home-semester-header"
                      onClick={() =>
                        setOpenSemester(isOpen ? null : index)
                      }
                      aria-expanded={isOpen}
                    >
                      <span className="home-semester-title">
                        {semester.semester}
                      </span>
                    </button>

                    <div className="home-semester-content">
                      {semester.subjects.map((subject, subjectIndex) => (
                        <div
                          key={subject}
                          className="home-semester-subject"
                        >
                          <span className="home-semester-number">
                            {subjectIndex + 1}.
                          </span>
                          <span className="home-semester-subject-name">
                            {subject}
                          </span>
                        </div>
                      ))}

                      {semester.mandatoryModules.length > 0 && (
                        <div className="home-semester-mandatory">
                          <div className="home-semester-mandatory-title">
                            Mandatory Module{semester.mandatoryModules.length > 1 ? 's' : ''}
                          </div>

                          {semester.mandatoryModules.map((module) => (
                            <div
                              key={module}
                              className="home-semester-mandatory-item"
                            >
                              <span>•</span>
                              <span>{module}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. DEPARTMENTS — Interactive grid
      ═══════════════════════════════════════════ */}
      <section
  className="home-mobile-section"
  style={{ background: '#FAFBFD', padding: '120px 40px' }}
>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <Reveal><span className="section-tag">Our Departments</span></Reveal>
              <Reveal delay={1}>
                <h2 className="font-sans" style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em', color: '#0B2545', marginTop: 16 }}>
                  Six Specialised<br/>
                  <span className="text-teal-g">Nursing Departments</span>
                </h2>
              </Reveal>
            </div>
            <Reveal type="right">
              <button onClick={() => navigate('departments')} className="btn-outline-navy">
                View All Departments
              </button>
            </Reveal>
          </div>

          <div className="home-departments-grid">
            {DEPTS.map((d, i) => (
              <Reveal key={d.name} delay={(i + 1) as 1 | 2 | 3 | 4 | 5 | 6} type="scale">
               <div
  className="dept-wrap home-dept-card"
  onClick={() => navigate('departments')}
>
                  <img
                      src={d.img}
  alt={d.name}
                      loading="lazy"
                      decoding="async"
                  />
                  <div className="dept-content">
                    <div className="dept-tag-pill">{d.tag}</div>
                    <div className="font-sans" style={{ fontSize: 20, fontWeight: 700, color: 'white', lineHeight: 1.3 }}>{d.name}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. RESEARCH — Highlights
      ═══════════════════════════════════════════ */}
      <section style={{ background: '#F3F7FB', padding: '120px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="home-responsive-grid">
            <div>
              <Reveal><span className="section-tag">Research & Innovation</span></Reveal>
              <Reveal delay={1}>
                <h2 className="font-sans" style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em', color: '#0B2545', marginTop: 20, marginBottom: 24 }}>
                  Advancing Nursing<br/>Science in<br/>
                  <span className="text-teal-g">South Asia</span>
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p style={{ color: '#1E293B', fontSize: 18, lineHeight: 1.8, marginBottom: 40 }}>
Our faculty are empowered to undertake research activities by utilizing the facilities provided by the college, including reference books, collections of rare books, encyclopaedias, magazines, periodicals, research journals, e-journals, e-books, and free internet access. Research and innovation in education support students’ professional growth and development.                </p>
              </Reveal>
              <Reveal delay={3}>
                <div style={{ display: 'flex', gap: 40 }}>
                  
                </div>
              </Reveal>
            </div>

           <div className="home-research-cards">
              {RESEARCH_ITEMS.map((r, i) => (
                <Reveal key={r.title} delay={(i + 1) as 1 | 2 | 3 | 4} type="scale">
                  <div style={{
                    background: 'white',
                    borderRadius: 20,
                    padding: '28px 24px',
                    border: '1px solid rgba(11,37,69,.06)',
                    transition: 'all .4s cubic-bezier(.16,1,.3,1)',
                    height: '100%',
                    minHeight: 250,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(24,198,200,.35)'; el.style.boxShadow = '0 20px 40px rgba(11,37,69,.1)'; el.style.transform = 'translateY(-6px)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(11,37,69,.06)'; el.style.boxShadow = 'none'; el.style.transform = 'none' }}
                  >
<div style={{
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 14,
}}>
  <span style={{ fontSize: 28 }}>{r.icon}</span>
  <div className="font-sans" style={{
    fontWeight: 700,
    fontSize: 20,
    color: '#0B2545',
    lineHeight: 1.3,
  }}>
    {r.title}
  </div>
</div>
                    <div style={{
                      color: '#18C6C8',
                      fontSize: 'clamp(16px, 1.3vw, 18px)',
                      lineHeight: 1.7
                    }}>
                      {r.desc}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. GALLERY — Pinterest masonry preview
      ═══════════════════════════════════════════ */}
      <section style={{ background: '#FAFBFD', padding: '120px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Reveal><span className="section-tag">Campus Life</span></Reveal>
            <Reveal delay={1}>
              <h2 className="font-sans" style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em', color: '#0B2545', marginTop: 20 }}>
                Life at<br/>
                <span className="text-teal-g">Madha College</span>
              </h2>
            </Reveal>
          </div>

          <div className="masonry-grid">
            {GALLERY_IMGS.map((img, i) => (
              <div key={i} className="masonry-item" style={{ height: img.h }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, display: 'block' }}
                />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Reveal>
              <button onClick={() => navigate('gallery')} className="btn-navy">
                View Full Gallery
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. TESTIMONIALS — Glass cards on dark bg
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(160deg,#071A36 0%,#0B2545 100%)', padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -300, left: '50%', transform: 'translateX(-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(24,198,200,.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <Reveal><span className="section-tag">Student Voices</span></Reveal>
            <Reveal delay={1}>
              <h2 className="font-sans" style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em', color: 'white', marginTop: 20 }}>
                Stories from Our<br/>
                <span className="text-teal-g">Alumni</span>
              </h2>
            </Reveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={(i + 1) as 1 | 2 | 3} type="scale">
                <div className="testimonial-card">
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <p style={{ color: '#F1F5F9', fontSize: 18, lineHeight: 1.8, marginBottom: 28, fontStyle: 'italic' }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'linear-gradient(135deg,#18C6C8,#1E5AA8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 17, color: 'white',
                      flexShrink: 0,
                    }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-sans" style={{ fontWeight: 700, fontSize: 17, color: 'white' }}>{t.name}</div>
                      <div style={{ color: '#CBD5E1', fontSize: 15, marginTop: 2 }}>{t.role}</div>
                      <div style={{ color: '#18C6C8', fontSize: 15, marginTop: 2 }}>{t.hospital}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10. ADMISSIONS — Timeline
      ═══════════════════════════════════════════ */}
      <section style={{ background: '#F3F7FB', padding: '120px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="home-admissions-grid">
            <div className="home-admissions-intro">
              <Reveal><span className="section-tag">Admissions 2026</span></Reveal>
              <Reveal delay={1}>
                <h2 className="font-sans" style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.02em', color: '#0B2545', marginTop: 20, marginBottom: 24 }}>
                  Your Journey<br/>Starts Here.<br/>
                  <span className="text-teal-g">Step by Step.</span>
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p style={{ color: '#1E293B', fontSize: 18, lineHeight: 1.8, marginBottom: 36 }}>
                  Applications for the academic year are now open. Limited seats available. Early applicants receive priority counselling.
                </p>
              </Reveal>

              {/* Key dates */}
              

              <Reveal delay={4}>
                <button onClick={() => navigate('contact')} className="btn-teal" style={{ width: '100%', justifyContent: 'center' }}>
                  Apply Now — Batch
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </Reveal>
            </div>

            {/* Timeline steps */}
            <div>
              {ADMISSION_STEPS.map((step, i) => (
                <Reveal key={step.num} delay={(i + 1) as 1 | 2 | 3 | 4 | 5} type="right">
                  <div style={{ display: 'flex', gap: 24, marginBottom: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div className="step-circle">{step.num}</div>
                      {i < ADMISSION_STEPS.length - 1 && <div className="timeline-line" style={{ marginTop: 12 }} />}
                    </div>
                    <div style={{ paddingBottom: 48, paddingTop: 8 }}>
                      <div className="font-sans" style={{ fontWeight: 700, fontSize: 20, color: '#0B2545', marginBottom: 10 }}>{step.title}</div>
                      <p style={{ color: '#1E293B', fontSize: 'clamp(16px, 1.35vw, 18px)', lineHeight: 1.7 }}>{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          11. CONTACT CTA
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0B2545 0%, #1E5AA8 100%)', padding: '100px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(24,198,200,.12) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(245,158,11,.08) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div className="hero-badge" style={{ marginBottom: 32, display: 'inline-flex' }}>
              <span className="badge-dot" />
              Admissions Open for Nursing
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-sans" style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-.03em', color: 'white', marginBottom: 24 }}>
              Ready to Begin<br/>Your Nursing Career?
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p style={{ color: '#F1F5F9', fontSize: 20, lineHeight: 1.75, marginBottom: 44 }}>
              Talk to our admissions team, visit the campus, or apply online. We're here to guide you every step of the way.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('contact')} className="btn-ghost" style={{ background: 'white', color: '#0B2545', border: 'none', fontWeight: 600 }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F3F7FB'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 20px 40px rgba(0,0,0,.2)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none' }}
              >
                Contact Admissions
              </button>
              <button onClick={() => navigate('about')} className="btn-ghost">
                Take a Campus Tour
              </button>
            </div>
          </Reveal>
        </div>
           </section>
    </div>
  </>
  )
}
