import { useState } from 'react'
import Reveal from '../components/Reveal'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'
interface Props { navigate: (p: Page) => void }

const COURSES = [
  {
    code: 'B.Sc.',
    name: 'Bachelor of Science in Nursing',
    duration: '4 Years ',
    intake: '100 Seats',
    level: 'Undergraduate',
    color: '#0B2545',
    eligibility: ['10+2 with Physics, Chemistry, Biology & English', 'Minimum 45% aggregate (General category)', 'Minimum 40% aggregate (Reserved category)', 'Age: 17–35 years as on December 31', 'Physical fitness certificate required'],
    curriculum: [
      'Semester I: Communicative English, Applied Anatomy, Applied Physiology, Applied Sociology, Applied Psychology, Nursing Foundations I. Mandatory Module: First Aid as part of Nursing Foundation I Course',
      'Semester II: Applied Biochemistry, Applied Nutrition and Dietetics, Nursing Foundations II, Health/Nursing Informatics & Technology. Mandatory Module: Health Assessment as part of Nursing Foundation II Course',
      'Semester III: Applied Microbiology and Infection Control including Safety, Pharmacology I, Pathology I, Adult Health (Medical Surgical) Nursing I with integrated pathophysiology. Mandatory Module: BCLS as part of Adult Health Nursing I',
      'Semester IV: Pharmacology II, Pathology II & Genetics, Adult Health Nursing II with integrated pathophysiology including Geriatric Nursing, Professionalism, Professional Values & Ethics including Bioethics. Mandatory Modules: Fundamentals of Prescribing under Pharmacology II; Palliative care module under Adult Health Nursing II',
      'Semester V: Child Health Nursing I, Mental Health Nursing I, Community Health Nursing I (including Environmental Science & Epidemiology), Educational Technology/Nursing Education, Introduction to Forensic Nursing and Indian Laws. Mandatory Modules: Essential Newborn Care (ENBC), Facility Based Newborn Care (FBNBC), IMNCI and PLS as part of Child Health Nursing',
      'Semester VI: Child Health Nursing II, Mental Health Nursing II, Nursing Management & Leadership, Midwifery/Obstetrics and Gynecology (OBG) Nursing I. Mandatory Module: SBA Module under OBG Nursing I/II (VI/VII Semester)',
      'Semester VII: Community Health Nursing II, Nursing Research & Statistics, Midwifery/Obstetrics and Gynecology (OBG) Nursing II. Mandatory Module: Safe delivery app under OBG Nursing I/II (VI/VII Semester)',
      'Semester VIII: Internship (Intensive Practicum/Residency Posting)'
    ],
    careers: ['Staff Nurse — Government & Private Hospitals', 'ICU / CCU / Operation Theatre Nurse', 'Nurse Educator & Clinical Trainer', 'Public Health Nurse', 'International Nursing (USA, UK, UAE, Australia, Canada)'],
    placements: ['Apollo Hospitals, Chennai', 'Sri Ramachandra Hospital, Chennai', 'AIIMS, New Delhi', 'Government General Hospital, Chennai', 'International placements in 25+ countries'],
    faqs: [
      { q: 'Is INC approval required for nursing admission?', a: 'Yes. Madha College of Nursing is INC approved and TNMGRMU affiliated, ensuring your degree is recognised across India and internationally.' },
      { q: 'Is the internship paid?', a: 'Yes. The 12-month internship in the final year is a paid internship at affiliated hospitals with a monthly stipend.' },
      { q: 'Are hostel facilities available?', a: 'Yes, we have separate, fully furnished hostels for male and female students with mess, Wi-Fi, and 24/7 security.' },
    ],
  },
  {
    code: 'M.Sc.',
    name: 'Master of Science in Nursing',
    duration: '2 Years',
    intake: '30 Seats',
    level: 'Postgraduate',
    color: '#1E5AA8',
    eligibility: ['B.Sc. Nursing from recognised university', 'P.B.B.Sc. Nursing with B.Sc. Nursing', 'Registered with State Nursing Council', 'Must have nursing practice experience (preferred)'],
curriculum: [
  'Year I: Nursing Education, Advanced Nursing Practice, Nursing Research & Statistics, Clinical Specialty I',
  'Year II: Nursing Management, Clinical Specialty II, Dissertation Submission & Viva',
],    careers: ['Nursing Faculty / Lecturer', 'Clinical Nurse Specialist', 'Nursing Research Associate', 'Hospital Nursing Superintendent', 'International Clinical Trainer'],
    placements: ['Nursing Faculty positions at affiliated colleges', 'Clinical Specialist roles at super-specialty hospitals',],
    faqs: [
      { q: 'What specialisations are available?', a: 'Medical Surgical, Paediatric, OBG, Community Health, Mental Health, and Critical Care Nursing.' },
      { q: 'Is the thesis mandatory?', a: 'Yes. All M.Sc. students must complete an independent research thesis reviewed by external experts.' },
    ],
  },
  {
    code: 'P.B.B.Sc.',
    name: 'Post Basic B.Sc. Nursing',
    duration: '2 Years',
    intake: '30 Seats',
    level: 'Undergraduate',
    color: '#18C6C8',
    eligibility: ['GNM (General Nursing & Midwifery) diploma', 'Registered with State Nursing Council', 'Working as a nurse (preferred but not mandatory)'],
curriculum: [
  'Year I: Nursing Foundation, Nutrition & Dietetics, Biochemistry & Biophysics, Psychology, Maternal Nursing, Child Health Nursing, Microbiology, Medical-Surgical Nursing, English',
  'Year II: Sociology, Community Health Nursing, Mental Health Nursing, Introduction to Nursing Education, Management & Research',
],    careers: ['Upgrade from GNM to B.Sc. credential', 'Senior Staff Nurse / Charge Nurse', 'Eligibility to pursue M.Sc. Nursing', 'Government sector promotions requiring degree'],
    placements: ['All government hospital promotional tracks', 'Private super-specialty hospitals requiring degree qualification'],
    faqs: [
      { q: 'Can I do this while working?', a: 'The curriculum is designed to accommodate working nurses with blended learning options available.' },
    ],
  },
]

export default function Courses({ navigate }: Props) {
  const [active, setActive] = useState(0)
  const course = COURSES[active]

  return (
  <div className="courses-page">
    <style>{`
  .courses-page {
    width: 100%;
    overflow-x: hidden;
  }

  .courses-hero {
    padding: 190px 40px 100px;
  }

  .courses-tabs-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    gap: 4px;
    overflow-x: auto;
  }

  .courses-detail-section {
    padding: 80px 40px;
  }

  .course-header {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 40px;
    align-items: start;
    margin-bottom: 64px;
  }

  .course-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }

  .course-card {
    padding: 36px;
  }

  .course-apply-cta {
    margin-top: 48px;
    padding: 52px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 32px;
  }

  @media (max-width: 768px) {
    .courses-hero {
      padding: 160px 20px 70px !important;
    }

    .courses-hero h1 {
      font-size: 40px !important;
      line-height: 1.08 !important;
    }

    .courses-hero p {
      font-size: 15px !important;
      line-height: 1.7 !important;
    }

    .courses-tabs {
      top: 72px !important;
    }

    .courses-tabs-inner {
      padding: 0 16px !important;
      gap: 0 !important;
      scrollbar-width: none;
    }

    .courses-tabs-inner::-webkit-scrollbar {
      display: none;
    }

    .courses-tabs-inner button {
      padding: 16px 18px !important;
      font-size: 12px !important;
      flex-shrink: 0;
    }

    .courses-detail-section {
      padding: 56px 20px !important;
    }

    .course-header {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
      margin-bottom: 40px !important;
    }

    .course-header h2 {
      font-size: 34px !important;
    }

    .course-header > button {
      width: 100%;
      justify-content: center;
    }

    .course-details-grid {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
    }

    .course-card {
      padding: 26px 22px !important;
      border-radius: 20px !important;
    }

    .course-card h3 {
      font-size: 19px !important;
    }

    .course-faq-card {
      padding: 26px 22px !important;
    }

    .course-apply-cta {
      padding: 34px 24px !important;
      border-radius: 22px !important;
      align-items: flex-start !important;
    }

    .course-apply-cta button {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .courses-hero {
      padding: 155px 16px 58px !important;
    }

    .courses-hero h1 {
      font-size: 34px !important;
    }

    .courses-detail-section {
      padding: 48px 16px !important;
    }

    .course-header h2 {
      font-size: 30px !important;
    }

    .course-card,
    .course-faq-card {
      padding: 24px 18px !important;
    }

    .course-apply-cta {
      padding: 30px 20px !important;
    }

    .course-apply-cta button {
      padding: 15px 20px !important;
      font-size: 14px !important;
    }
  }
`}</style>
      {/* Hero */}
      <section
  className="courses-hero"
  style={{
    background: 'linear-gradient(160deg, #071A36 0%, #0B2545 70%, #0E3060 100%)',
    padding: '190px 40px 100px',
    position: 'relative',
    overflow: 'hidden'
  }}
>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 40%, rgba(24,198,200,.09) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <img
          src="https://images.unsplash.com/photo-1758270705482-cee87ea98738?w=1600&h=600&fit=crop&auto=format"
          alt="Nursing students"
          loading="lazy"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }}
        />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="section-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>Academic Programmes</span>
          <h1 className="font-sans" style={{ fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 700, color: 'white', lineHeight: 1.1, letterSpacing: '-.03em', marginTop: 16, marginBottom: 24 }}>
            Nursing Courses<br/>
            <span className="text-teal-g">That Shape Careers</span>
          </h1>
          <p style={{ color: '#F1F5F9', fontSize: 20, maxWidth: 560, margin: '0 auto', lineHeight: 1.75 }}>
            TNMGRMU affiliated, INC approved programmes built for the 21st century healthcare landscape.
          </p>
        </div>
      </section>

      {/* Course selector tabs */}
      <div
  className="courses-tabs"
  style={{
    background: 'white',
    borderBottom: '1px solid rgba(11,37,69,.08)',
    position: 'sticky',
    top: 72,
    zIndex: 100
  }}
>
        <div className="courses-tabs-inner">
          {COURSES.map((c, i) => (
            <button key={c.code} onClick={() => setActive(i)} style={{
              padding: '20px 32px', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15,
              color: active === i ? c.color : '#475569',
              borderBottom: `3px solid ${active === i ? c.color : 'transparent'}`,
              whiteSpace: 'nowrap', transition: 'all .25s',
            }}>
              {c.code} — {c.level}
            </button>
          ))}
        </div>
      </div>

      {/* Course detail */}
      <section
  className="courses-detail-section"
  style={{ background: '#FAFBFD', padding: '80px 40px' }}
>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Header */}
          <div className="course-header">
            <div>
              <div style={{ display: 'inline-block', background: course.color, color: 'white', padding: '4px 16px', borderRadius: 100, fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, letterSpacing: '.08em', marginBottom: 20 }}>
                {course.level}
              </div>
              <h2 className="font-sans" style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 700, color: '#0B2545', lineHeight: 1.1, letterSpacing: '-.02em', marginBottom: 16 }}>
                {course.code} <span style={{ color: course.color }}>{course.name.replace(/^[A-Za-z.\s]+\s/, '')}</span>
              </h2>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                {[['Duration', course.duration], ['Intake', course.intake]].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ color: '#475569', fontSize: 13, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                    <div className="font-sans" style={{ fontWeight: 700, fontSize: 17, color: '#0B2545' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => navigate('contact')} className="btn-teal">
              Apply Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          {/* Details grid */}
          <div className="course-details-grid">
            {/* Eligibility */}
            <Reveal type="left">
              <div
  className="course-card"
  style={{
    background: 'white',
    borderRadius: 24,
    padding: '36px',
    border: '1px solid rgba(11,37,69,.08)',
    height: '100%'
  }}
>
                <h3 className="font-sans" style={{ fontWeight: 600, fontSize: 20, color: '#0B2545', marginBottom: 24 }}>Eligibility Criteria</h3>
                {course.eligibility.map(e => (
                  <div key={e} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(24,198,200,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#18C6C8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ color: '#1E293B', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.7 }}>{e}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Curriculum */}
            <Reveal type="right">
              <div style={{ background: 'white', borderRadius: 24, padding: '36px', border: '1px solid rgba(11,37,69,.08)', height: '100%' }}>
                <h3 className="font-sans" style={{ fontWeight: 600, fontSize: 20, color: '#0B2545', marginBottom: 24 }}>Curriculum Overview</h3>
                {course.curriculum.map((c, i) => (
                  <div key={c} style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: `linear-gradient(135deg, ${course.color}, #18C6C8)`,
                      color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ color: '#1E293B', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75 }}>{c}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="course-details-grid">
            {/* Careers */}
            <Reveal>
              <div className="course-card" style={{ background: 'white', borderRadius: 24, padding: '36px', border: '1px solid rgba(11,37,69,.08)' }}>
                <h3 className="font-sans" style={{ fontWeight: 600, fontSize: 20, color: '#0B2545', marginBottom: 24 }}>Career Opportunities</h3>
                {course.careers.map(c => (
                  <div key={c} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ color: '#F59E0B', fontSize: 16, lineHeight: 1, marginTop: 2 }}>→</div>
                    <span style={{ color: '#1E293B', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.7 }}>{c}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Placements */}
            <Reveal delay={1}>
              <div className="course-card" style={{ background: 'linear-gradient(135deg, rgba(11,37,69,.04), rgba(24,198,200,.05))', borderRadius: 24, padding: '36px', border: '1px solid rgba(11,37,69,.08)' }}>
                <h3 className="font-sans" style={{ fontWeight: 600, fontSize: 20, color: '#0B2545', marginBottom: 24 }}>Where Our Graduates Work</h3>
                {course.placements.map(p => (
                  <div key={p} style={{
                    background: 'white', borderRadius: 12, padding: '14px 18px', marginBottom: 10,
                    border: '1px solid rgba(11,37,69,.06)', fontSize: 'clamp(15px, 1.3vw, 17px)', color: '#1E293B', lineHeight: 1.6,
                  }}>
                    {p}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* FAQs */}
          <Reveal>
            <div
  className="course-faq-card"
  style={{
    background: 'white',
    borderRadius: 24,
    padding: '36px',
    border: '1px solid rgba(11,37,69,.08)'
  }}
>
              <h3 className="font-sans" style={{ fontWeight: 600, fontSize: 20, color: '#0B2545', marginBottom: 28 }}>Frequently Asked Questions</h3>
              {course.faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </Reveal>

          {/* Apply CTA */}
          <div
  className="course-apply-cta"
  style={{
    marginTop: 48,
    background: 'linear-gradient(135deg, #0B2545, #1E5AA8)',
    borderRadius: 28
  }}
>
            <div>
              <div className="font-sans" style={{ fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 8 }}>Ready to Apply?</div>
              <p style={{ color: '#F1F5F9', fontSize: 17 }}>Admissions for batch are now open. Limited seats available.</p>
            </div>
            <button onClick={() => navigate('contact')} style={{
              background: '#18C6C8', color: 'white', padding: '16px 40px', borderRadius: 100,
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer',
              transition: 'all .3s', boxShadow: '0 8px 24px rgba(24,198,200,.4)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 16px 40px rgba(24,198,200,.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(24,198,200,.4)' }}
            >
              Submit Your Application →
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(11,37,69,.07)', marginBottom: 4 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        padding: '18px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
        textAlign: 'left',
      }}>
        <span className="font-sans" style={{ fontWeight: 700, fontSize: 16, color: '#0B2545', lineHeight: 1.4 }}>{q}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#18C6C8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s', flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div style={{ color: '#1E293B', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, paddingBottom: 18 }}>{a}</div>
      )}
    </div>
  )
}
