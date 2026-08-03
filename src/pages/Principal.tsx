import { useIntersect } from '../hooks/useIntersect'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'
interface Props { navigate: (p: Page) => void }

function Reveal({ children, delay = 0, type = 'up' }: { children: React.ReactNode; delay?: number; type?: 'up' | 'left' | 'right' | 'scale' }) {
  const { ref, visible } = useIntersect()
  const cls = type === 'left' ? 'reveal-left' : type === 'right' ? 'reveal-right' : type === 'scale' ? 'reveal-scale' : 'reveal'
  return <div ref={ref} className={`${cls} ${visible ? 'visible' : ''} ${delay ? `delay-${delay}` : ''}`}>{children}</div>
}

const ACHIEVEMENTS = [
  { val: '28+', label: 'Years in Nursing Education' },
  { val: '22', label: 'Research Publications' },
  { val: '200+', label: 'Ph.D Students Guided' },
  { val: '12', label: 'National Awards' },
]

export default function Principal({ navigate }: Props) {
 return (
  <div className="principal-page" style={{ paddingTop: 72 }}>
    <style>{`
  .principal-page {
    width: 100%;
    overflow-x: hidden;
  }

  /* HERO */
  .principal-hero {
    padding: 80px 40px 0;
  }

  .principal-hero-grid {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: end;
    position: relative;
    z-index: 2;
  }

  .principal-hero-content {
    padding-bottom: 80px;
  }

  .principal-achievements {
    display: flex;
    gap: 24px;
    margin-top: 40px;
    flex-wrap: wrap;
  }

  .principal-achievement {
    text-align: center;
  }

  .principal-portrait-wrap {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .principal-portrait {
    width: 340px;
    height: 400px;
  }

  /* LETTER */
  .principal-letter-section {
    padding: 100px 40px;
  }

  .principal-letter-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 80px;
    align-items: start;
  }

  .principal-info-card {
    padding: 28px;
  }

  .principal-message-card {
    padding: 52px;
  }

  .principal-signature {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  /* CTA */
  .principal-cta {
    padding: 80px 40px;
  }

  @media (max-width: 900px) {
    .principal-hero-grid {
      grid-template-columns: 1fr;
      gap: 0;
    }

    .principal-letter-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  @media (max-width: 768px) {

    .principal-hero {
      padding: 64px 20px 0 !important;
    }

    .principal-hero-grid {
      grid-template-columns: 1fr !important;
      gap: 32px !important;
    }

    .principal-hero-content {
      padding-bottom: 0 !important;
      text-align: center;
    }

    .principal-hero-content h1 {
      font-size: 40px !important;
      line-height: 1.08 !important;
    }

    .principal-achievements {
      display: grid !important;
      grid-template-columns: 1fr 1fr;
      gap: 24px 12px !important;
      margin-top: 32px !important;
    }

    .principal-achievement {
      padding: 10px;
    }

    .principal-portrait-wrap {
      width: 100%;
      justify-content: center !important;
    }

    .principal-portrait {
      width: min(100%, 360px) !important;
      height: 430px !important;
      border-radius: 24px 24px 0 0 !important;
    }

    .principal-letter-section {
      padding: 60px 20px !important;
    }

    .principal-letter-grid {
      grid-template-columns: 1fr !important;
      gap: 32px !important;
    }

    .principal-letter-heading h2 {
      font-size: 34px !important;
    }

    .principal-info-card {
      padding: 24px 22px !important;
    }

    .principal-message-card {
      padding: 34px 26px !important;
      border-radius: 22px !important;
    }

    .principal-message-card p,
    .principal-message-card > div {
      font-size: 15px !important;
      line-height: 1.8 !important;
    }

    .principal-quote {
      font-size: 64px !important;
    }

    .principal-cta {
      padding: 60px 20px !important;
    }

    .principal-cta h3 {
      font-size: 28px !important;
    }
  }

  @media (max-width: 480px) {

    .principal-hero {
      padding: 54px 16px 0 !important;
    }

    .principal-hero-content h1 {
      font-size: 34px !important;
    }

    .principal-achievements {
      grid-template-columns: 1fr 1fr !important;
      gap: 20px 8px !important;
    }

    .principal-achievement .text-gold-g {
      font-size: 27px !important;
    }

    .principal-achievement div:last-child {
      font-size: 11px !important;
    }

    .principal-portrait {
      width: 100% !important;
      height: 400px !important;
    }

    .principal-letter-section {
      padding: 48px 16px !important;
    }

    .principal-letter-heading h2 {
      font-size: 30px !important;
    }

    .principal-info-card {
      padding: 22px 18px !important;
    }

    .principal-message-card {
      padding: 28px 20px !important;
    }

    .principal-signature {
      align-items: flex-start !important;
      gap: 14px !important;
    }

    .principal-signature-avatar {
      width: 48px !important;
      height: 48px !important;
      min-width: 48px !important;
    }

    .principal-cta {
      padding: 52px 16px !important;
    }

    .principal-cta button {
      width: 100%;
      justify-content: center;
    }
  }
`}</style>
      {/* Banner */}
      <section
  className="principal-hero"
  style={{
    background: 'linear-gradient(160deg, #071A36 0%, #0B2545 100%)',
    overflow: 'hidden',
    position: 'relative'
  }}
>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(24,198,200,.08) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div className="principal-hero-grid">
          <div className="principal-hero-content">
            <span className="section-tag" style={{ marginBottom: 24, display: 'inline-flex' }}>Principal's Office</span>
            <h1 className="font-jakarta" style={{ fontSize: 'clamp(36px, 5vw, 66px)', fontWeight: 800, color: 'white', lineHeight: 1.08, letterSpacing: '-.03em', marginTop: 16, marginBottom: 24 }}>
              Dr. B. Tamilarasi<br/>
              
            </h1>
            <div style={{ color: 'rgba(255,255,255,.55)', fontSize: 16, marginBottom: 8 }}>Principal, Madha College of Nursing</div>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 14 }}>M.Sc. Nursing, PhD , M.Phil</div>
           <div className="principal-achievements">
              {ACHIEVEMENTS.map(a => (
  <div
    key={a.label}
    className="principal-achievement"
    style={{ textAlign: 'center' }}
  >
                  <div className="font-jakarta text-gold-g" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em' }}>{a.val}</div>
                  <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 12, marginTop: 4 }}>{a.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait */}
         <div className="principal-portrait-wrap">
            <div style={{
              width: 340, height: 400, borderRadius: '28px 28px 0 0',
              background: 'linear-gradient(135deg, rgba(24,198,200,.15), rgba(30,90,168,.2))',
              border: '1px solid rgba(24,198,200,.2)', borderBottom: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <img
                src="/principal/Tamilarasi-principal11.jpg"
                alt="Principal Dr. B. Tamilarasi"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,26,54,.3) 0%, transparent 50%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Letter from Principal */}
      <section
  className="principal-letter-section"
  style={{ background: '#FAFBFD' }}
>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="principal-letter-grid">
           
             <div className="principal-letter-heading">
              <Reveal delay={1}>
                <h2 className="font-jakarta" style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 800, color: '#0B2545', lineHeight: 1.15, letterSpacing: '-.02em', marginTop: 20, marginBottom: 32 }}>
                  A Message to<br/>Every Aspiring<br/>
                  <span className="text-teal-g">Nurse</span>
                </h2>
              </Reveal>
              {/* Sidebar qualifications */}
              <Reveal delay={2}>
                <div
  className="principal-info-card"
  style={{
    background: '#F3F7FB',
    borderRadius: 20,
    padding: '28px',
    border: '1px solid rgba(11,37,69,.06)',
    marginBottom: 28
  }}
>
                  <div className="font-jakarta" style={{ fontSize: 11, fontWeight: 700, color: '#18C6C8', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 16 }}>Qualifications</div>
                  {['M.Sc. Nursing (Medical Surgical Nursing)', 'Ph.D in Nursing Science — TNMGRMU', 'Master of Business Administration — Anna University', 'PG Diploma in Hospital Management'].map(q => (
                    <div key={q} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#18C6C8', marginTop: 6, flexShrink: 0 }} />
                      <span style={{ color: '#6A7A96', fontSize: 13, lineHeight: 1.5 }}>{q}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={3}>
                <div
  className="principal-info-card"
  style={{
    background: '#F3F7FB',
    borderRadius: 20,
    padding: '28px',
    border: '1px solid rgba(11,37,69,.06)'
  }}
>
                  <div className="font-jakarta" style={{ fontSize: 11, fontWeight: 700, color: '#18C6C8', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 16 }}>Awards & Recognition</div>
                  {[
                    'Best Principal Award — Tamil Nadu Nursing Council, 2022',
                    'Excellence in Nursing Research — INC, 2020',
                    'Outstanding Educator Award — TNAI National Conference, 2019',
                    'Distinguished Alumna — TNMGRMU, 2017',
                  ].map(a => (
                    <div key={a} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                      <span style={{ color: '#F59E0B', fontSize: 14 }}>★</span>
                      <span style={{ color: '#6A7A96', fontSize: 13, lineHeight: 1.5 }}>{a}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal type="right">
               <div
  className="principal-message-card"
  style={{
    background: 'white',
    borderRadius: 28,
    padding: '52px',
    border: '1px solid rgba(11,37,69,.08)',
    boxShadow: '0 8px 32px rgba(11,37,69,.07)',
    position: 'relative'
  }}
>
                  {/* Quote mark */}
                 <div className="font-jakarta principal-quote" style={{ fontSize: 80, color: '#18C6C8', lineHeight: 0.8, opacity: 0.25, marginBottom: 24, fontStyle: 'italic' }}>"</div>

                  <div style={{ color: '#16213E', fontSize: 16, lineHeight: 1.9, fontStyle: 'italic' }}>
                    Dear aspiring nurses,
                  </div>
                  <br/>
                  <p style={{ color: '#4A5A78', fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                    Nursing is not a profession you choose — it is a calling you answer. When you walk through the doors of Madha College of Nursing, you are joining a tradition of care, compassion, and clinical excellence that has touched over 3,200 lives and, through them, countless patients across the world.
                  </p>
                  <p style={{ color: '#4A5A78', fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                    At Madha, we don't just teach nursing — we shape nurses. Our curriculum bridges rigorous academic theory with immersive clinical training at 18 affiliated hospitals. Our faculty are researchers, clinicians, and mentors who invest deeply in your growth, not just your grades.
                  </p>
                  <p style={{ color: '#4A5A78', fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                    I invite you to explore our campus, meet our faculty, and discover for yourself why Madha College has earned its reputation as one of South India's premier nursing institutions. Your journey toward becoming an exceptional nurse begins here.
                  </p>
                  <p style={{ color: '#4A5A78', fontSize: 16, lineHeight: 1.9 }}>
                    Come, let us serve together.
                  </p>

                  <div
  className="principal-signature"
  style={{
    marginTop: 36,
    paddingTop: 28,
    borderTop: '1px solid rgba(11,37,69,.08)'
  }}
>
                    <div className="principal-signature-avatar" style={{
  width: 56, height: 56, borderRadius: 16,
                      background: 'linear-gradient(135deg, #0B2545, #18C6C8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span className="font-jakarta" style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>AS</span>
                    </div>
                    <div>
                      <div className="font-jakarta" style={{ fontWeight: 800, fontSize: 17, color: '#0B2545' }}>Dr. B. Tamilarasi</div>
                      <div style={{ color: '#8A9ABC', fontSize: 13, marginTop: 3 }}>Principal, Madha College of Nursing</div>
                      <div style={{ color: '#18C6C8', fontSize: 12, marginTop: 2 }}>M.Sc., Ph.D., M.Phil</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
  className="principal-cta"
  style={{
    background: '#F3F7FB',
    textAlign: 'center'
  }}
>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Reveal>
            <h3 className="font-jakarta" style={{ fontSize: 32, fontWeight: 800, color: '#0B2545', marginBottom: 16, lineHeight: 1.2 }}>
              Meet Us in Person
            </h3>
          </Reveal>
          <Reveal delay={1}>
            <p style={{ color: '#6A7A96', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              Schedule a meeting with the Principal's office for admissions guidance, research collaboration, or campus visits.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <button onClick={() => navigate('contact')} className="btn-navy">
              Book an Appointment
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
