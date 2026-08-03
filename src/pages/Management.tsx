import { useIntersect } from '../hooks/useIntersect'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'
interface Props { navigate: (p: Page) => void }

function Reveal({ children, delay = 0, type = 'up' }: { children: React.ReactNode; delay?: number; type?: 'up' | 'left' | 'right' | 'scale' }) {
  const { ref, visible } = useIntersect()
  const cls = type === 'left' ? 'reveal-left' : type === 'right' ? 'reveal-right' : type === 'scale' ? 'reveal-scale' : 'reveal'
  return <div ref={ref} className={`${cls} ${visible ? 'visible' : ''} ${delay ? `delay-${delay}` : ''}`}>{children}</div>
}

const TEAM = [
  {
    name: 'Dr.Ln.S.Peter,',
    title: 'Chairman',
    img: '/management/chairman.jpg',
    imgFocus: 'center 15%',
    bio: "Dr. Ln. S. Peter is one of the pioneering visionaries in the field of education in Tamil Nadu, hailing from Thirumaiyam in Pudukkottai District. Driven by a passion for transforming lives through quality education, he founded the Soosaiya Peter Educational Trust and established the first engineering college in 1995. Under his visionary leadership, the Madha Educational Institutions have grown into a renowned educational group offering excellence across Medicine, Dentistry, Physiotherapy, Nursing, Management, Arts & Science, as well as several CBSE and Matriculation Schools across Chennai. As the Chairman of Madha College of Nursing, his unwavering commitment to academic excellence, innovation, and holistic development continues to inspire generations of students and strengthen the institution's reputation as a center of quality education and professional excellence.",
    quals: [],
    accent: '#081f3b',
    tag: 'Founder & Visionary',
  },
  {
    name: 'Ms. Mercy Florence Peter.',
    title: 'Vice Chairperson',
    img: '/management/mercy.jpg',
    imgFocus: 'center 12%',
    bio: "Ms. Mercy Florence Peter is an accomplished professional with a strong academic foundation in Electronics and Communication Engineering and a Master of Science (M.S.) in Management Information Systems from the New Jersey Institute of Technology, USA. With expertise that combines technology, innovation, and strategic management, she brings a global perspective to academic administration. As the Chairperson of Madha College of Nursing, she is committed to fostering excellence in education, promoting innovation, and creating an environment that empowers students to become skilled, compassionate, and future-ready healthcare professionals. Her visionary leadership continues to strengthen the institution's commitment to quality education and holistic development.",
    quals: [],
    accent: '#081f3b',
    tag: 'Strategy & Policy',
  },
  {
    name: 'Mr. Ajay Ravindra Kumar',
    title: 'Managing Director',
    img: '/management/ajay.jpg',
    imgFocus: 'center 10%',
    bio: "Mr. Ajay Ravindra Kumar, was one of the early employees of Tesla, Inc., in California, USA and had worked with the Company in its start-up days. He has an Under graduate degree in Electronics and Communication Engineering and a Post Graduate Degree (MS) in Information Technology Management from the University of Texas at Dallas, USA. He brings with him corporate experience from Tesla, Inc, where he worked with the Engineering Team in development of Tesla’s revolutionary vehicle Programs Roadster, Model S and Model X. He has also completed his Bachelor’s Degree in Law (LLB) from The Tamil Nadu Dr.Ambedkar Law University.",
    quals: [],
    accent: '#081f3b',
    tag: 'Operations & Growth',
  },
  {
    name: 'Dr. B. Tamilarasi',
    title: 'Principal',
    img: '/principal/Tamilarasi-principal.jpg',
    imgFocus: 'center 12%',
    bio: 'Dr. B. Tamilarasi is an accomplished nursing academician with a Ph.D. and M.Phil. from Mother Teresa Women’s University and an M.Sc. (Nursing) from The Tamil Nadu Dr. M.G.R. Medical University. Beginning her career as an Assistant Lecturer, she has risen through dedication and academic excellence to become the Principal of Madha College of Nursing. She serves as a Board of Studies and Senate Member at The Tamil Nadu Dr. M.G.R. Medical University and contributes to the Academic Councils of several deemed universities in Tamil Nadu. A Research Guide for Ph.D. scholars and Executive Editorial Board Member of the Journal of Medical Surgical Nursing, she has authored numerous research publications in prestigious national and international journals, making significant contributions to nursing education and research.',
    quals: [],
    accent: '#081f3b',
    tag: 'Academic Leadership',
  },
]

/* ─── Executive Card ─── */
interface CardPerson {
  name: string; title: string; img: string; imgFocus: string;
  bio: string; quals: string[]; accent: string; tag: string;
}
function ExecutiveCard({
  person,
  index,
}: {
  person: CardPerson
  index: number
}) {
return (
  <div
    className="management-card"
    style={{
        background: 'white', borderRadius: 28, overflow: 'hidden',
        border: '1px solid rgba(11,37,69,.07)',
        boxShadow: '0 4px 24px rgba(11,37,69,.06)',
        transition: 'all .45s cubic-bezier(.16,1,.3,1)',
        display: 'flex',
        flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.boxShadow = `0 28px 60px rgba(11,37,69,.14), 0 0 0 1px ${person.accent}22`
        el.style.transform = 'translateY(-6px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.boxShadow = '0 4px 24px rgba(11,37,69,.06)'
        el.style.transform = 'none'
      }}
    >
      {/* Portrait — 4:5 ratio column */}
      <div
  className="management-card-image"
  style={{
    width: 240,
    minHeight: 360,
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden'
  }}
>
        <img
          src={person.img}
          alt={person.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: person.imgFocus,
            transition: 'transform .65s cubic-bezier(.25,.46,.45,.94)',
            display: 'block',
          }}
          onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.07)')}
          onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '48%',
          background: `linear-gradient(to top, ${person.accent}F0 0%, transparent 100%)`,
        }} />
        {/* Title pill on image */}
        <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,.14)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,.25)',
            borderRadius: 100, padding: '6px 16px',
            fontFamily: 'var(--font-jakarta)', fontSize: 11, fontWeight: 700,
            letterSpacing: '.1em', textTransform: 'uppercase', color: 'white',
          }}>
            {person.title}
          </div>
        </div>
      </div>

      {/* Text content */}
      <div
  className="management-card-content"
  style={{
    flex: 1,
    padding: '40px 36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 360
  }}
>
        <div>
          {/* Category tag */}
          <div style={{
            display: 'inline-block',
            background: `${person.accent}12`,
            border: `1px solid ${person.accent}28`,
            borderRadius: 100, padding: '4px 14px', marginBottom: 14,
            fontFamily: 'var(--font-jakarta)', fontSize: 10, fontWeight: 700,
            letterSpacing: '.12em', textTransform: 'uppercase', color: person.accent,
          }}>
            {person.tag}
          </div>

          <h3 className="font-jakarta" style={{
            fontSize: 22, fontWeight: 800, color: '#0B2545',
            lineHeight: 1.2, letterSpacing: '-.01em', marginBottom: 8,
          }}>
            {person.name}
          </h3>

          <div style={{ width: 36, height: 3, background: `linear-gradient(90deg, ${person.accent}, #18C6C8)`, borderRadius: 2, marginBottom: 18 }} />

          <p style={{ color: '#44536B', fontSize: 14, lineHeight: 1.9,fontWeight: 400, marginBottom: 22 }}>
            {person.bio}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {person.quals.map(q => (
              <div key={q} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: person.accent, marginTop: 6, flexShrink: 0 }} />
                <span style={{ color: '#4A5A78', fontSize: 12.5, lineHeight: 1.6 }}>{q}</span>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  )
}

export default function Management({ navigate }: Props) {
  return (
  <div
    className="management-page"
    style={{ paddingTop: 72, background: '#F3F7FB' }}
  >
    <style>{`
  .management-page {
    width: 100%;
    overflow-x: hidden;
  }

  .management-hero {
    padding: 112px 48px 96px;
  }

  .management-team-section {
    padding: 96px 48px;
  }

  .management-team-grid {
    max-width: 1320px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }

  .management-stats-section {
    padding: 80px 48px;
  }

  .management-stats-grid {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2px;
  }

  .management-cta {
    padding: 96px 48px;
  }

  .management-cta-buttons {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 1100px) {
    .management-team-grid {
      grid-template-columns: 1fr;
      max-width: 850px;
    }

    .management-stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .management-hero {
      padding: 72px 20px 64px !important;
    }

    .management-hero h1 {
      font-size: 40px !important;
      line-height: 1.08 !important;
    }

    .management-hero p {
      font-size: 15px !important;
      line-height: 1.7 !important;
    }

    .management-team-section {
      padding: 56px 20px !important;
    }

    .management-team-grid {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
    }

    .management-card {
      flex-direction: column !important;
      border-radius: 22px !important;
    }

    .management-card-image {
      width: 100% !important;
      height: 430px !important;
      min-height: 0 !important;
    }

    .management-card-image img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
    }

    .management-card-content {
      width: 100% !important;
      min-height: 0 !important;
      padding: 30px 26px !important;
      box-sizing: border-box;
    }

    .management-card-content h3 {
      font-size: 22px !important;
    }

    .management-card-content p {
      font-size: 14px !important;
      line-height: 1.8 !important;
    }

    .management-stats-section {
      padding: 56px 20px !important;
    }

    .management-stats-grid {
      grid-template-columns: 1fr 1fr !important;
      gap: 0 !important;
    }

    .management-stat {
      padding: 30px 12px !important;
    }

    .management-stat:nth-child(odd) {
      border-left: none !important;
    }

    .management-stat:nth-child(even) {
      border-left: 1px solid rgba(255,255,255,.07) !important;
    }

    .management-stat .text-teal-g {
      font-size: 34px !important;
    }

    .management-cta {
      padding: 64px 20px !important;
    }

    .management-cta h2 {
      font-size: 34px !important;
    }

    .management-cta p {
      font-size: 15px !important;
    }
  }

  @media (max-width: 480px) {
    .management-hero {
      padding: 58px 16px 52px !important;
    }

    .management-hero h1 {
      font-size: 34px !important;
    }

    .management-team-section {
      padding: 48px 16px !important;
    }

    .management-card-image {
      height: 390px !important;
    }

    .management-card-content {
      padding: 26px 20px !important;
    }

    .management-card-content h3 {
      font-size: 20px !important;
    }

    .management-stats-section {
      padding: 48px 16px !important;
    }

    .management-stat {
      padding: 26px 8px !important;
    }

    .management-stat .text-teal-g {
      font-size: 30px !important;
    }

    .management-cta {
      padding: 56px 16px !important;
    }

    .management-cta h2 {
      font-size: 30px !important;
    }

    .management-cta-buttons {
      flex-direction: column;
      width: 100%;
    }

    .management-cta-buttons button {
      width: 100%;
      justify-content: center;
    }
  }
`}</style>
      {/* ── Hero Banner ── */}
     <section
  className="management-hero"
  style={{
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(160deg, #071A36 0%, #0B2545 55%, #0E3060 100%)'
  }}
>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(24,198,200,.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-8%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,90,168,.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <span className="section-tag" style={{ marginBottom: 24, display: 'inline-flex' }}>Leadership</span>
          <h1 className="font-jakarta" style={{
            fontSize: 'clamp(38px, 5.5vw, 76px)',
            fontWeight: 800, lineHeight: 1.06, letterSpacing: '-.03em',
            color: 'white', marginBottom: 24,
          }}>
            The Minds Behind<br/>
            <span className="text-teal-g">Madha College</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 18, lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>
            A leadership team combining medicine, nursing science, hospital administration, and global healthcare education expertise.
          </p>
        </div>
      </section>

      {/* ── Executive Cards Grid ── */}
      <section className="management-team-section">
  <div className="management-team-grid">
          {TEAM.map((person, i) => (
            <Reveal key={person.name} delay={(i % 2 + 1) as 1 | 2} type="scale">
              <ExecutiveCard person={person} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section
  className="management-stats-section"
  style={{
    background: 'linear-gradient(135deg, #071A36 0%, #0B2545 100%)'
  }}
>
        <div className="management-stats-grid">
          {[
            { num: '25+', label: 'Years of Vision', sub: 'Since 1998' },
            { num: '3,200+', label: 'Alumni Placed', sub: 'Across 35 Countries' },
            { num: '120+', label: 'Faculty Members', sub: 'Doctorate Qualified' },
            { num: '18', label: 'Hospital Partners', sub: 'Clinical Training' },
          ].map((s, i) => (
           <div key={s.label} className="management-stat" style={{
              padding: '40px 32px', textAlign: 'center',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,.07)' : 'none',
            }}>
              <div className="font-jakarta text-teal-g" style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1, marginBottom: 10 }}>{s.num}</div>
              <div className="font-jakarta" style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.label}</div>
              <div style={{ color: 'rgba(255,255,255,.38)', fontSize: 12 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
  className="management-cta"
  style={{
    background: '#FAFBFD',
    textAlign: 'center'
  }}
>
        <Reveal>
          <span className="section-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>Join Our Community</span>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="font-jakarta" style={{
            fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800,
            color: '#0B2545', lineHeight: 1.1, letterSpacing: '-.02em',
            marginTop: 20, marginBottom: 20,
          }}>
            Guided by Excellence,<br/>
            <span className="text-teal-g">Driven by Purpose</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p style={{ color: '#6A7A96', fontSize: 17, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 40px' }}>
            Our leadership team is committed to your success. Reach out to begin your journey at Madha College of Nursing.
          </p>
          <div className="management-cta-buttons">
            <button onClick={() => navigate('contact')} className="btn-teal" style={{ fontSize: 15, padding: '16px 40px' }}>
              Apply Now — Batch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button onClick={() => navigate('principal')} className="btn-outline-navy" style={{ fontSize: 15, padding: '15px 36px' }}>
              Meet Our Principal
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
