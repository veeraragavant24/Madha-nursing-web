import { useState } from 'react'
import { useIntersect } from '../hooks/useIntersect'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'
interface Props { navigate: (p: Page) => void }

function Reveal({ children, delay = 0, type = 'up' }: { children: React.ReactNode; delay?: number; type?: 'up' | 'left' | 'right' | 'scale' }) {
  const { ref, visible } = useIntersect()
  const cls = type === 'left' ? 'reveal-left' : type === 'right' ? 'reveal-right' : type === 'scale' ? 'reveal-scale' : 'reveal'
  return <div ref={ref} className={`${cls} ${visible ? 'visible' : ''} ${delay ? `delay-${delay}` : ''}`}>{children}</div>
}

const DEPTS = [
  {
    id: 'msn',
    name: 'Medical Surgical Nursing',
    fullName: 'Department of Medical Surgical Nursing',
    abbr: 'MSN',
    color: '#0B2545',
    img: 'photo-1691139601099-932c01ec198b',
    head: 'Dr. Kanimozhi',
    headDesig: 'M.Sc. Nursing — Vice-principal & Head of Department',
    faculty: 12,
    students: 240,
    overview: 'The Department of Medical Surgical Nursing is the cornerstone of our nursing curriculum, training students to manage complex medical and surgical patient care across specialties including cardiology, neurology, nephrology, and oncology.',
    facilities: ['40-bed simulation ward with mannequins', 'Cardiac monitoring lab', 'Wound care simulation centre', 'IV therapy practice lab', 'Drug calculation room'],
    research: ['Post-operative pain management protocols (DST funded)', 'ICU nursing outcomes research', 'Diabetic wound care efficacy study'],
    labs: ['Nursing Skills Lab (Capacity: 60)', 'Clinical Simulation Centre', 'Anatomy & Physiology Lab'],
  },
  {
    id: 'pdn',
    name: 'Paediatric Nursing',
    fullName: 'Department of Pediatric Nursing',
    abbr: 'PDN',
    color: '#1E5AA8',
    img: 'photo-1765896387387-0538bc9f997e',
    head: 'Ms Reheetha jeslin A',
    headDesig: 'M.Sc. Nursing (Paediatric) — Associate Professor & Head of Department',
    faculty: 8,
    students: 120,
    overview: 'Dedicated to the care of neonates, infants, children, and adolescents, this department equips nurses with specialised skills in growth monitoring, immunisation, paediatric pharmacology, and NICU care.',
    facilities: ['Neonatal care simulation unit', 'Paediatric emergency simulation', 'Growth & development assessment lab', 'Immunisation training station'],
    research: ['Neonatal thermoregulation outcomes', 'Childhood immunisation compliance studies (ICMR funded)'],
    labs: ['Paediatric Nursing Skills Lab', 'NICU Simulation Suite'],
  },
  {
    id: 'chn',
    name: 'Community Health Nursing',
    fullName: 'Department of Community Health Nursing',
    abbr: 'CHN',
    color: '#18C6C8',
    img: 'photo-1758270704262-ecc82b23dc37',
    head: 'Ms. Kanchana.S',
    headDesig: 'M.Sc. Nursing, M.Phil. (Public Health) — Professor & Head of Department',
    faculty: 10,
    students: 180,
    overview: 'Community Health Nursing prepares students to serve as change agents in public health, primary care, and rural outreach settings. Special emphasis on epidemiology, school health, and environmental health.',
    facilities: ['Community health simulation centre', 'Epidemiology mapping lab', 'Mobile health camp vehicle', 'School health demonstration room'],
    research: ['Urban slum health outcomes study (₹18L DST grant)', 'Rural immunisation programme evaluation', 'Occupational health nursing in textile workers'],
    labs: ['Public Health Lab', 'Epidemiology & Statistics Room'],
  },
  {
    id: 'obg',
    name: 'Obstetrics & Gynaecology Nursing',
    fullName: 'Department of Obstetrics & Gynecological Nursing',
    abbr: 'OBG',
    color: '#F59E0B',
    img: 'photo-1676281050264-178eff38874a',
    head: 'Ms. Jessy Rani. P',
    headDesig: 'M.Sc. Nursing (OBG), DNB — Professor & Head of Department',
    faculty: 9,
    students: 160,
    overview: 'This department provides comprehensive training in antenatal, intrapartum, and postnatal nursing care, along with gynaecological nursing and reproductive health. Students gain hands-on experience in Madha Medical College Hospital\'s maternity wing.',
    facilities: ['Obstetrics simulation suite (delivery room)', 'Antenatal care assessment lab', 'Newborn resuscitation station', 'Gynaecology examination lab'],
    research: ['Postnatal depression screening tools', 'Kangaroo mother care outcomes', 'High-risk pregnancy nursing outcomes (TNMGRMU funded)'],
    labs: ['OBG Skills Lab', 'Labour Room Simulation Suite'],
  },
  {
    id: 'psy',
    name: 'Psychiatric Nursing',
    fullName: 'Department of Psychiatric Nursing',
    abbr: 'PSY',
    color: '#7C3AED',
    img: 'photo-1511174511562-5f7f18b874f8',
    head: 'Dr. Saranya.P',
    headDesig: 'M.Sc. Nursing (Psychiatric) — Associate Professor &   Head of Department',
    faculty: 7,
    students: 80,
    overview: 'Mental health is a growing priority in Indian healthcare. This department trains nurses in therapeutic communication, de-escalation, psychopharmacology, and evidence-based mental health interventions.',
    facilities: ['Therapeutic communication lab', 'Mental status examination room', 'Group therapy simulation space', 'Relaxation & mindfulness studio'],
    research: ['Stigma reduction in psychiatric nursing care', 'Substance abuse intervention programmes', 'Nurse burnout & mental health study'],
    labs: ['Psychiatric Skills Lab', 'Behavioural Simulation Suite'],
  },
  {
    id: 'rnd',
    name: 'Nursing Research',
    fullName: 'Department of Nursing Research',
    abbr: 'R&D',
    color: '#059669',
    img: 'photo-1614935151651-0bea6508db6b',
    head: 'Ms. Catherine Baby Suhasini.H',
    headDesig: 'M.Sc. Nursing, M.Phil. — Associate Professor & Head of Department',
    faculty: 6,
    students: 40,
    overview: 'The Department of Nursing Research drives evidence-based practice, supports faculty research projects, and applies for national and international grants. It serves as the intellectual engine of the institution.',
    facilities: ['Dedicated faculty research room', 'Statistical computing lab (SPSS, R, STATA)', 'Digital library with 12,000+ e-journals', 'Writing & publication support cell'],
    research: ['Systematic reviews in nursing practice', 'Nursing theory development projects', 'Interdisciplinary health research with MMCH'],
    labs: ['Research Methodology Lab', 'Biostatistics Computing Centre'],
  },
]

export default function Departments({ navigate }: Props) {
  const [active, setActive] = useState(DEPTS[0])

  return (
    <>
  <style>{`
    /* ==========================================
       DEPARTMENTS RESPONSIVE LAYOUT
    ========================================== */

    .departments-page {
      padding-top: 72px;
      width: 100%;
      overflow-x: hidden;
    }

    .departments-banner {
      padding: 100px 40px;
    }

    .departments-section {
      padding: 80px 40px;
    }

    .departments-container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
    }

    .departments-selector {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin-bottom: 64px;
    }

    .department-detail-body {
      padding: 52px;
    }

    .department-detail-grid {
      display: grid;
      grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
      gap: 48px;
      align-items: start;
    }

    .department-main,
    .department-sidebar {
      min-width: 0;
      width: 100%;
    }

    .department-hod {
      display: flex;
      align-items: center;
      gap: 18px;
    }

    .department-hero-title {
      left: 56px;
    }

    /* TABLET */
    @media (max-width: 1024px) {
      .departments-selector {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .department-detail-body {
        padding: 40px;
      }

      .department-detail-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }

    /* MOBILE */
    @media (max-width: 768px) {
      .departments-page {
        padding-top: 72px;
      }

      .departments-banner {
        padding: 70px 20px;
      }

      .departments-section {
        padding: 48px 16px;
      }

      .departments-selector {
        grid-template-columns: 1fr;
        gap: 12px;
        margin-bottom: 32px;
      }

      .department-detail-card {
        border-radius: 20px !important;
      }

      .department-hero {
        height: 260px !important;
      }

      .department-hero-title {
        left: 20px !important;
        right: 20px;
        width: auto;
      }

      .department-detail-body {
        padding: 24px 18px;
      }

      .department-detail-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 28px;
        width: 100%;
      }

      .department-main,
      .department-sidebar {
        width: 100%;
        min-width: 0;
      }

      .department-hod {
        width: 100%;
        padding: 18px !important;
      }

      .department-hod > div:last-child {
        min-width: 0;
      }

      .department-hod div {
        overflow-wrap: anywhere;
      }

      .department-sidebar {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .department-sidebar > div {
        width: 100%;
        margin-bottom: 0 !important;
      }
    }

    /* SMALL PHONE */
    @media (max-width: 480px) {
      .departments-banner {
        padding: 56px 16px;
      }

      .departments-section {
        padding: 36px 12px;
      }

      .department-hero {
        height: 230px !important;
      }

      .department-detail-body {
        padding: 22px 16px;
      }

      .department-hod {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 14px !important;
      }

      .department-detail-grid {
        gap: 24px;
      }
    }
  `}</style>

  <div className="departments-page">
      {/* Banner */}
      <section
  className="departments-banner"
  style={{
    background: 'linear-gradient(160deg,#071A36 0%,#0B2545 100%)',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center'
  }}
>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(24,198,200,.09) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>Academic Departments</span>
          <h1 className="font-sans" style={{ fontSize: 'clamp(38px, 5vw, 76px)', fontWeight: 700, color: 'white', lineHeight: 1.1, letterSpacing: '-.03em', marginTop: 16 }}>
            Six Specialised<br/>
            <span className="text-teal-g">Nursing Departments</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 20, maxWidth: 520, margin: '24px auto 0', lineHeight: 1.75 }}>
            Each department is led by highly qualified faculty with deep clinical and research expertise.
          </p>
        </div>
      </section>

      {/* Department grid selector */}
      <section
  className="departments-section"
  style={{ background: '#F3F7FB' }}
>
  <div className="departments-container">
    <div className="departments-selector">
            {DEPTS.map((d, i) => (
              <Reveal key={d.id} delay={(i % 3 + 1) as 1 | 2 | 3} type="scale">
                <button onClick={() => setActive(d)} style={{
                  width: '100%', background: active.id === d.id ? d.color : 'white', color: active.id === d.id ? 'white' : '#0B2545',
                  borderRadius: 20, padding: '28px', border: `2px solid ${active.id === d.id ? d.color : 'rgba(11,37,69,.08)'}`,
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all .3s cubic-bezier(.16,1,.3,1)',
                  boxShadow: active.id === d.id ? `0 16px 40px ${d.color}44` : 'none',
                }}>
                  <div style={{
                    display: 'inline-block', background: active.id === d.id ? 'rgba(255,255,255,.2)' : `${d.color}18`,
                    borderRadius: 8, padding: '4px 10px', marginBottom: 12,
                    fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '.12em',
                    color: active.id === d.id ? 'white' : d.color,
                  }}>
                    {d.abbr}
                  </div>
                  <div className="font-sans" style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{d.name}</div>
                  <div style={{ fontSize: 12, marginTop: 8, opacity: active.id === d.id ? 0.7 : 0.5 }}>{d.faculty} Faculty · {d.students} Students</div>
                </button>
              </Reveal>
            ))}
          </div>

          {/* Active department detail */}
          <div
  className="department-detail-card"
  style={{
    background: 'white',
    borderRadius: 28,
    overflow: 'hidden',
    border: '1px solid rgba(11,37,69,.08)',
    boxShadow: '0 8px 40px rgba(11,37,69,.08)'
  }}
>
            {/* Top image */}
           <div
  className="department-hero"
  style={{ position: 'relative', height: 340 }}
>
              <img
                src={`https://images.unsplash.com/${active.img}?w=1200&h=600&fit=crop&auto=format`}
                alt={active.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${active.color}EE 0%, ${active.color}88 50%, transparent 100%)` }} />
              <div
  className="department-hero-title"
  style={{
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  }}
>
                <div style={{
                  display: 'inline-block', background: 'rgba(255,255,255,.2)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,.25)', borderRadius: 100,
                  padding: '6px 16px', marginBottom: 16,
                  fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '.12em', color: 'white',
                }}>
                  {active.abbr}
                </div>
                <h2 className="font-sans" style={{ fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 700, color: 'white', lineHeight: 1.15, maxWidth: 480 }}>
                  {active.fullName}
                </h2>
              </div>
            </div>

          <div className="department-detail-body">
  <div className="department-detail-grid">

    <div className="department-main">
                  {/* HOD Card */}
                  <div className="department-hod" style={{
                    background: `linear-gradient(135deg, ${active.color}0D, ${active.color}18)`,
                    border: `1px solid ${active.color}30`,
                    borderRadius: 16, padding: '20px 24px', marginBottom: 32,
                  }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: `linear-gradient(135deg, ${active.color}, #18C6C8)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ color: '#9CA9C0', fontSize: 10, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 4 }}>Head of Department</div>
                      <div className="font-sans" style={{ fontWeight: 700, fontSize: 17, color: '#0B2545', lineHeight: 1.2 }}>{active.head}</div>
                      <div style={{ color: '#6A7A96', fontSize: 14, marginTop: 3 }}>{active.headDesig}</div>
                    </div>
                  </div>

                  <h3 className="font-sans" style={{ fontWeight: 600, fontSize: 20, color: '#0B2545', marginBottom: 16 }}>Department Overview</h3>
                  <p style={{ color: '#6A7A96', fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>{active.overview}</p>

                  <h3 className="font-sans" style={{ fontWeight: 600, fontSize: 20, color: '#0B2545', marginBottom: 16 }}>Active Research Projects</h3>
                  {active.research.map(r => (
                    <div key={r} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: active.color, marginTop: 6, flexShrink: 0 }} />
                      <span style={{ color: '#4A5A78', fontSize: 15, lineHeight: 1.65 }}>{r}</span>
                    </div>
                  ))}
                </div>

                <div className="department-sidebar">
                  <div style={{ background: '#F3F7FB', borderRadius: 20, padding: '28px', marginBottom: 20 }}>
                    <h4 className="font-sans" style={{ fontWeight: 600, fontSize: 14, color: '#0B2545', marginBottom: 16, letterSpacing: '.04em' }}>Facilities</h4>
                    {active.facilities.map(f => (
                      <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={active.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 3, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                        <span style={{ color: '#6A7A96', fontSize: 13, lineHeight: 1.55 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#F3F7FB', borderRadius: 20, padding: '28px' }}>
                    <h4 className="font-sans" style={{ fontWeight: 600, fontSize: 14, color: '#0B2545', marginBottom: 16, letterSpacing: '.04em' }}>Laboratories</h4>
                    {active.labs.map(l => (
                      <div key={l} style={{
                        background: 'white', borderRadius: 10, padding: '10px 16px', marginBottom: 8,
                        border: `1px solid ${active.color}22`, fontSize: 13, color: '#4A5A78',
                      }}>
                        {l}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate('contact')} className="btn-navy" style={{ marginTop: 20, width: '100%', justifyContent: 'center', background: active.color }}>
                    Enquire About This Department
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
