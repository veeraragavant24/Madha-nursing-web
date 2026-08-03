import { useIntersect } from '../hooks/useIntersect'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'

interface Props { navigate: (p: Page) => void }

function Reveal({ children, className = '', delay = 0, type = 'up' }: { children: React.ReactNode; className?: string; delay?: number; type?: 'up' | 'left' | 'right' | 'scale' }) {
  const { ref, visible } = useIntersect()
  const cls = type === 'left' ? 'reveal-left' : type === 'right' ? 'reveal-right' : type === 'scale' ? 'reveal-scale' : 'reveal'
  return <div ref={ref} className={`${cls} ${visible ? 'visible' : ''} ${delay ? `delay-${delay}` : ''} ${className}`}>{children}</div>
}

const TIMELINE = [
  { year: '1998', title: 'Foundation', desc: 'Madha College of Nursing established in Chennai with a vision to produce world-class nursing professionals.' },
  { year: '2002', title: 'University Affiliation', desc: 'Formally affiliated to The Tamil Nadu Dr. M.G.R. Medical University, gaining recognition across Tamil Nadu.' },
  { year: '2006', title: 'Infrastructure Expansion', desc: 'New campus building inaugurated with state-of-the-art nursing labs, simulation centre, and modern hostel facilities.' },
  { year: '2010', title: 'Research Centre Launch', desc: 'Dedicated nursing research centre established. First DST-funded project awarded to faculty.' },
  { year: '2014', title: 'M.Sc. & Post Basic Programmes', desc: 'Postgraduate programmes in Medical Surgical, Paediatric, and Community Health Nursing approved.' },
  { year: '2020', title: 'Smart Campus Initiative', desc: 'Launched fully digital classrooms, e-library, and online patient simulation systems across all departments.' },
  { year: '2026', title: 'Silver Jubilee', desc: 'Celebrating 25 years of excellence with 3,200+ alumni serving across 35+ countries worldwide.' },
]

const ACHIEVEMENTS = [
  { icon: '🎓', label: '3,200+ Alumni', sub: 'Across 35 Countries' },
  { icon: '🏥', label: '18 Hospitals', sub: 'Clinical Affiliations' },
  { icon: '📚', label: '48 Research Papers', sub: 'Published Nationally' },
  { icon: '🌍', label: 'INC Approved', sub: 'Indian Nursing Council' },
  { icon: '💼', label: '98% Placement', sub: '2024 Batch' },
]

export default function About({ navigate }: Props) {
  return (
    <div className="about-page" style={{ paddingTop: 72 }}>
      <style>{`
  @media (max-width: 768px) {

    .about-page {
      padding-top: 72px !important;
      width: 100%;
      overflow-x: hidden;
    }

    /* HERO */
    .about-banner {
      height: 360px !important;
    }

    .about-banner h1 {
      font-size: 38px !important;
      line-height: 1.08 !important;
    }

    .about-banner p {
      font-size: 15px !important;
      padding: 0 8px;
    }

    /* VISION + MISSION */
    .about-vision-section {
      padding: 64px 20px !important;
    }

    .about-vision-grid {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
    }

    .about-vision-card {
      padding: 28px 24px !important;
      border-radius: 22px !important;
    }

    .about-vision-card h3 {
      font-size: 23px !important;
    }

    .about-vision-card p {
      font-size: 15px !important;
      line-height: 1.75 !important;
    }

    /* TIMELINE */
    .about-timeline-section {
      padding: 64px 20px !important;
    }

    .about-timeline-section > div > div:first-child {
      margin-bottom: 48px !important;
    }

    .about-timeline-line {
      left: 9px !important;
      transform: none !important;
    }

    .about-timeline-item {
      justify-content: flex-start !important;
      padding-left: 38px !important;
      padding-right: 0 !important;
      margin-bottom: 28px !important;
      width: 100%;
    }

    .about-timeline-dot {
      left: 9px !important;
      top: 22px !important;
    }

    .about-timeline-card {
      width: 100% !important;
      max-width: none !important;
      padding: 24px 22px !important;
    }

    /* ACHIEVEMENTS */
    .about-achievements {
      padding: 64px 20px !important;
    }

    .about-achievements-grid {
      grid-template-columns: 1fr 1fr !important;
      gap: 14px !important;
    }

    .about-achievements-grid > div > div {
      padding: 26px 12px !important;
      height: 100%;
    }

    /* CAMPUS */
    .about-campus-section {
      padding: 0 20px 64px !important;
    }

    .about-campus-card {
      height: 500px !important;
      border-radius: 24px !important;
    }

    .about-campus-card img {
      object-position: center !important;
    }

    .about-campus-card > div:nth-of-type(1) {
      background:
        linear-gradient(
          to top,
          rgba(11,37,69,.94) 0%,
          rgba(11,37,69,.60) 60%,
          rgba(11,37,69,.20) 100%
        ) !important;
    }

    .about-campus-content {
      left: 24px !important;
      right: 24px !important;
      top: auto !important;
      bottom: 34px !important;
      transform: none !important;
    }

    .about-campus-content > div {
      font-size: 29px !important;
    }

    .about-campus-content p {
      font-size: 14px !important;
      line-height: 1.65 !important;
    }
  }

  @media (max-width: 480px) {

    .about-banner {
      height: 330px !important;
    }

    .about-banner h1 {
      font-size: 34px !important;
    }

    .about-achievements-grid {
      grid-template-columns: 1fr 1fr !important;
    }

    .about-campus-card {
      height: 470px !important;
    }
  }
`}</style>
      {/* Banner */}
      <section className="about-banner" style={{ position: 'relative', height: 480, overflow: 'hidden', background: '#0B2545' }}>
        <img
          src="/campus/madaha-nursing-college-9.jpg"
          alt="Madha College students"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(11,37,69,.9) 0%, rgba(30,90,168,.6) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 40px' }}>
          <span className="section-tag" style={{ marginBottom: 20 }}>About Us</span>
          <h1 className="font-jakarta" style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-.03em' }}>
            Our Story &<br/>
            <span className="text-teal-g">Our Mission</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 18, maxWidth: 560, marginTop: 20, lineHeight: 1.7 }}>
            25 years of transforming lives through compassionate nursing education
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="about-vision-section" style={{ background: '#FAFBFD', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
         <div className="about-vision-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            {[
              {
                icon: '🎯',
                title: 'Our Vision',
                text: 'To be the most respected nursing institution in South Asia — producing compassionate, competent, and courageous nursing professionals who advance health for all.',
                color: '#0B2545',
              },
              {
                icon: '💡',
                title: 'Our Mission',
                text: 'To provide holistic nursing education through evidence-based academic curricula, hands-on clinical training, and values-centred character development — preparing graduates to lead in diverse global healthcare settings.',
                color: '#1E5AA8',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={(i + 1) as 1 | 2} type="scale">
                <div className="about-vision-card" style={{
  background: 'linear-gradient(135deg, rgba(11,37,69,.04) 0%, rgba(24,198,200,.04) 100%)',
                  border: '1px solid rgba(11,37,69,.08)', borderRadius: 28, padding: '48px',
                  transition: 'all .4s cubic-bezier(.16,1,.3,1)',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(24,198,200,.3)'; el.style.boxShadow = '0 24px 48px rgba(11,37,69,.1)'; el.style.transform = 'translateY(-6px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(11,37,69,.08)'; el.style.boxShadow = 'none'; el.style.transform = 'none' }}
                >
                  <div style={{ fontSize: 40, marginBottom: 20 }}>{item.icon}</div>
                  <h3 className="font-jakarta" style={{ fontSize: 28, fontWeight: 800, color: item.color, marginBottom: 16, letterSpacing: '-.01em' }}>{item.title}</h3>
                  <p style={{ color: '#6A7A96', fontSize: 16, lineHeight: 1.8 }}>{item.text}</p>
                  <div style={{ marginTop: 24, width: 48, height: 3, background: 'linear-gradient(90deg,#18C6C8,#1E5AA8)', borderRadius: 2 }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
     <section className="about-timeline-section" style={{ background: '#F3F7FB', padding: '100px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <Reveal><span className="section-tag">Our Journey</span></Reveal>
            <Reveal delay={1}>
              <h2 className="font-jakarta" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#0B2545', marginTop: 20, lineHeight: 1.1, letterSpacing: '-.02em' }}>
                25 Years of <span className="text-teal-g">Excellence</span>
              </h2>
            </Reveal>
          </div>

          <div className="about-timeline" style={{ position: 'relative' }}>
            {/* Center line */}
            <div className="about-timeline-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, #18C6C8, rgba(24,198,200,.08))', transform: 'translateX(-50%)' }} />

            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={(i % 4 + 1) as 1 | 2 | 3 | 4} type={i % 2 === 0 ? 'left' : 'right'}>
                <div className="about-timeline-item" style={{
  display: 'flex', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start',
                  paddingRight: i % 2 === 0 ? 'calc(50% + 32px)' : 0,
                  paddingLeft: i % 2 === 0 ? 0 : 'calc(50% + 32px)',
                  marginBottom: 48, position: 'relative',
                }}>
                  {/* Dot on center line */}
                  <div className="about-timeline-dot" style={{
  position: 'absolute', left: '50%', top: 20, transform: 'translateX(-50%)',
                    width: 18, height: 18, borderRadius: '50%', background: '#18C6C8',
                    boxShadow: '0 0 0 4px rgba(24,198,200,.2), 0 0 0 8px rgba(24,198,200,.08)',
                    zIndex: 2,
                  }} />

                  <div className="about-timeline-card" style={{
  background: 'white', borderRadius: 20, padding: '28px 32px',
                    border: '1px solid rgba(11,37,69,.07)', maxWidth: 380,
                    boxShadow: '0 4px 24px rgba(11,37,69,.06)',
                  }}>
                    <div className="font-jakarta" style={{ fontSize: 13, fontWeight: 700, color: '#18C6C8', letterSpacing: '.08em', marginBottom: 8 }}>{item.year}</div>
                    <div className="font-jakarta" style={{ fontSize: 18, fontWeight: 800, color: '#0B2545', marginBottom: 10 }}>{item.title}</div>
                    <p style={{ color: '#6A7A96', fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements grid */}
      <section className="about-achievements" style={{ background: '#FAFBFD', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Reveal><span className="section-tag">Achievements</span></Reveal>
            <Reveal delay={1}>
              <h2 className="font-jakarta" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#0B2545', marginTop: 20, lineHeight: 1.1, letterSpacing: '-.02em' }}>
                Milestones That <span className="text-teal-g">Define Us</span>
              </h2>
            </Reveal>
          </div>
          <div className="about-achievements-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.label} delay={(i + 1) as 1 | 2 | 3 | 4 | 5 | 6} type="scale">
                <div style={{
                  background: 'white', borderRadius: 24, padding: '36px 24px', textAlign: 'center',
                  border: '1px solid rgba(11,37,69,.07)',
                  transition: 'all .4s cubic-bezier(.16,1,.3,1)',
                  boxShadow: '0 2px 12px rgba(11,37,69,.04)',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(24,198,200,.35)'; el.style.transform = 'translateY(-8px)'; el.style.boxShadow = '0 24px 48px rgba(11,37,69,.12)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(11,37,69,.07)'; el.style.transform = 'none'; el.style.boxShadow = '0 2px 12px rgba(11,37,69,.04)' }}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{a.icon}</div>
                  <div className="font-jakarta" style={{ fontWeight: 800, fontSize: 18, color: '#0B2545', marginBottom: 6 }}>{a.label}</div>
                  <div style={{ color: '#18C6C8', fontSize: 13, fontWeight: 600 }}>{a.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Campus photo */}
      <section className="about-campus-section" style={{ padding: '0 40px 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal type="scale">
            <div className="about-campus-card" style={{ borderRadius: 32, overflow: 'hidden', height: 480, position: 'relative' }}>
              <img
                src="/campus/madaha-nursing-college-9.jpg"
                alt="Madha College campus"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,37,69,.7) 0%, transparent 60%)' }} />
             <div className="about-campus-content" style={{ position: 'absolute', top: '50%', left: 64, transform: 'translateY(-50%)' }}>
                <div className="font-jakarta" style={{ fontSize: 36, fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: 16 }}>
                  A Campus Built<br/>for Excellence
                </div>
                <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 16, maxWidth: 360, lineHeight: 1.7 }}>
                  80-acre campus with world-class laboratories, hostel, library, and dedicated clinical simulation centre.
                </p>
                <button onClick={() => navigate('contact')} className="btn-teal" style={{ marginTop: 28 }}>
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
