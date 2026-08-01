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
    <div style={{ paddingTop: 72 }}>
      {/* Banner */}
      <section style={{ position: 'relative', height: 480, overflow: 'hidden', background: '#0B2545' }}>
        <img
          src="https://images.unsplash.com/photo-1758270705067-0d7edee57af0?w=1600&h=900&fit=crop&auto=format"
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
      <section style={{ background: '#FAFBFD', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
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
                <div style={{
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
      <section style={{ background: '#F3F7FB', padding: '100px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <Reveal><span className="section-tag">Our Journey</span></Reveal>
            <Reveal delay={1}>
              <h2 className="font-jakarta" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#0B2545', marginTop: 20, lineHeight: 1.1, letterSpacing: '-.02em' }}>
                25 Years of <span className="text-teal-g">Excellence</span>
              </h2>
            </Reveal>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Center line */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, #18C6C8, rgba(24,198,200,.08))', transform: 'translateX(-50%)' }} />

            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={(i % 4 + 1) as 1 | 2 | 3 | 4} type={i % 2 === 0 ? 'left' : 'right'}>
                <div style={{
                  display: 'flex', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start',
                  paddingRight: i % 2 === 0 ? 'calc(50% + 32px)' : 0,
                  paddingLeft: i % 2 === 0 ? 0 : 'calc(50% + 32px)',
                  marginBottom: 48, position: 'relative',
                }}>
                  {/* Dot on center line */}
                  <div style={{
                    position: 'absolute', left: '50%', top: 20, transform: 'translateX(-50%)',
                    width: 18, height: 18, borderRadius: '50%', background: '#18C6C8',
                    boxShadow: '0 0 0 4px rgba(24,198,200,.2), 0 0 0 8px rgba(24,198,200,.08)',
                    zIndex: 2,
                  }} />

                  <div style={{
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
      <section style={{ background: '#FAFBFD', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Reveal><span className="section-tag">Achievements</span></Reveal>
            <Reveal delay={1}>
              <h2 className="font-jakarta" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#0B2545', marginTop: 20, lineHeight: 1.1, letterSpacing: '-.02em' }}>
                Milestones That <span className="text-teal-g">Define Us</span>
              </h2>
            </Reveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
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
      <section style={{ padding: '0 40px 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal type="scale">
            <div style={{ borderRadius: 32, overflow: 'hidden', height: 480, position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1680084521816-cc1ad0433ceb?w=1400&h=800&fit=crop&auto=format"
                alt="Madha College campus"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,37,69,.7) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', top: '50%', left: 64, transform: 'translateY(-50%)' }}>
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
