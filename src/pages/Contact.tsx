import { useState } from 'react'
import { useIntersect } from '../hooks/useIntersect'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'
interface Props { navigate: (p: Page) => void }

function Reveal({ children, delay = 0, type = 'up' }: { children: React.ReactNode; delay?: number; type?: 'up' | 'left' | 'right' | 'scale' }) {
  const { ref, visible } = useIntersect()
  const cls = type === 'left' ? 'reveal-left' : type === 'right' ? 'reveal-right' : type === 'scale' ? 'reveal-scale' : 'reveal'
  return <div ref={ref} className={`${cls} ${visible ? 'visible' : ''} ${delay ? `delay-${delay}` : ''}`}>{children}</div>
}

export default function Contact({ navigate }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name && form.email) setSubmitted(true)
  }

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Banner */}
      <section style={{ background: 'linear-gradient(160deg,#071A36 0%,#0B2545 100%)', padding: '100px 40px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(24,198,200,.1) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>Get in Touch</span>
          <h1 className="font-jakarta" style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-.03em', marginTop: 16 }}>
            We'd Love to<br/>
            <span className="text-teal-g">Hear From You</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 18, maxWidth: 500, margin: '24px auto 0', lineHeight: 1.75 }}>
            Whether it's an admissions query, research collaboration, or a campus visit — reach us anytime.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section style={{ background: '#F3F7FB', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 80 }}>
            {[
              { icon: '📍', title: 'Visit Us', lines: ['Madha Nagar, Somangalam Road, Kundrathur,', 'Chennai – 600 069, Tamil Nadu'] },
              { icon: '📞', title: 'Call Us', lines: ['+91 91576 51234', '+91 91576 51234'] },
              { icon: '✉️', title: 'Email Us', lines: ['info@madhanursing.in', ] },
              { icon: '🕐', title: 'Office Hours', lines: ['Mon – Sat: 9:00 AM – 5:30 PM', 'Sunday: Closed'] },
            ].map((item, i) => (
              <Reveal key={item.title} delay={(i + 1) as 1 | 2 | 3 | 4} type="scale">
                <div style={{
                  background: 'white', borderRadius: 24, padding: '32px 28px', textAlign: 'center',
                  border: '1px solid rgba(11,37,69,.07)',
                  transition: 'all .4s cubic-bezier(.16,1,.3,1)',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(24,198,200,.3)'; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = '0 24px 48px rgba(11,37,69,.1)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(11,37,69,.07)'; el.style.transform = 'none'; el.style.boxShadow = 'none' }}
                >
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                  <div className="font-jakarta" style={{ fontWeight: 800, fontSize: 16, color: '#0B2545', marginBottom: 10 }}>{item.title}</div>
                  {item.lines.map(l => <div key={l} style={{ color: '#6A7A96', fontSize: 14, lineHeight: 1.7 }}>{l}</div>)}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Form + Map */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {/* Admission enquiry form */}
            <Reveal type="left">
              <div style={{ background: 'white', borderRadius: 28, padding: '48px', border: '1px solid rgba(11,37,69,.08)', boxShadow: '0 8px 32px rgba(11,37,69,.07)' }}>
                <h2 className="font-jakarta" style={{ fontSize: 28, fontWeight: 800, color: '#0B2545', marginBottom: 8 }}>
                  Admission Enquiry
                </h2>
                <p style={{ color: '#8A9ABC', fontSize: 14, marginBottom: 36 }}>Fill in your details and our admissions team will contact you within 24 hours.</p>

                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '48px 0' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                    <h3 className="font-jakarta" style={{ fontWeight: 800, fontSize: 22, color: '#0B2545', marginBottom: 12 }}>Thank You!</h3>
                    <p style={{ color: '#6A7A96', fontSize: 15, lineHeight: 1.7 }}>We've received your enquiry. Our admissions team will reach out to <strong>{form.email}</strong> within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="btn-teal" style={{ marginTop: 28 }}>
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handle}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={{ display: 'block', fontFamily: 'var(--font-jakarta)', fontWeight: 600, fontSize: 12, color: '#4A5A78', marginBottom: 8, letterSpacing: '.04em' }}>Full Name *</label>
                        <input required className="input-field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter Your Name" />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontFamily: 'var(--font-jakarta)', fontWeight: 600, fontSize: 12, color: '#4A5A78', marginBottom: 8, letterSpacing: '.04em' }}>Email Address *</label>
                        <input required type="email" className="input-field" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={{ display: 'block', fontFamily: 'var(--font-jakarta)', fontWeight: 600, fontSize: 12, color: '#4A5A78', marginBottom: 8, letterSpacing: '.04em' }}>Phone Number</label>
                        <input className="input-field" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 91576 51234  " />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontFamily: 'var(--font-jakarta)', fontWeight: 600, fontSize: 12, color: '#4A5A78', marginBottom: 8, letterSpacing: '.04em' }}>Programme of Interest</label>
                        <select className="input-field" value={form.course} onChange={e => setForm(f => ({ ...f, course: e.target.value }))}>
                          <option value="">Select Programme</option>
                          <option>B.Sc. Nursing</option>
                          <option>M.Sc. Nursing</option>
                          <option>Post Basic B.Sc. Nursing</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: 28 }}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-jakarta)', fontWeight: 600, fontSize: 12, color: '#4A5A78', marginBottom: 8, letterSpacing: '.04em' }}>Your Message</label>
                      <textarea
                        className="input-field" rows={4} value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Tell us about your interest in nursing, your qualifications, or any questions you have..."
                        style={{ resize: 'vertical', minHeight: 110 }}
                      />
                    </div>
                    <button type="submit" className="btn-teal" style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '17px' }}>
                      Submit Enquiry
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 18-7z"/></svg>
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Map + contact info */}
            <div>
              <Reveal type="right">
                <div style={{ borderRadius: 24, overflow: 'hidden', height: 340, background: '#E8EEF7', marginBottom: 24, position: 'relative' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d80.0788!3d13.0122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAw!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                    width="100%" height="340" style={{ border: 0 }} allowFullScreen loading="lazy"
                    title="Madha College of Nursing Location"
                  />
                </div>
              </Reveal>

              {/* Quick contact */}
              <Reveal type="right" delay={1}>
                <div style={{ background: 'linear-gradient(135deg,#0B2545,#1E5AA8)', borderRadius: 24, padding: '32px', marginBottom: 16 }}>
                  <h3 className="font-jakarta" style={{ fontWeight: 800, fontSize: 18, color: 'white', marginBottom: 20 }}>Admissions Helpline</h3>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <a href="tel:+91 91576 51234" style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)',
                      borderRadius: 100, padding: '12px 20px', color: 'white', textDecoration: 'none',
                      fontFamily: 'var(--font-jakarta)', fontWeight: 600, fontSize: 14,
                    }}>
                      📞 +91 91576 51234
                    </a>
                     <a href="tel:+91 72749 01234" style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)',
                      borderRadius: 100, padding: '12px 20px', color: 'white', textDecoration: 'none',
                      fontFamily: 'var(--font-jakarta)', fontWeight: 600, fontSize: 14,
                    }}>
                      📞 +91 72749 01234
                    </a>
                    <a href="https://wa.me/919157651234" target="_blank" rel="noopener noreferrer" style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      background: 'rgba(37,211,102,.2)', border: '1px solid rgba(37,211,102,.35)',
                      borderRadius: 100, padding: '12px 20px', color: 'white', textDecoration: 'none',
                      fontFamily: 'var(--font-jakarta)', fontWeight: 600, fontSize: 14,
                    }}>
                      💬 WhatsApp Us
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal type="right" delay={2}>
                <div style={{ background: 'white', borderRadius: 24, padding: '28px', border: '1px solid rgba(11,37,69,.08)' }}>
                  <h3 className="font-jakarta" style={{ fontWeight: 800, fontSize: 16, color: '#0B2545', marginBottom: 16 }}>Follow Our Journey</h3>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {['Instagram', 'Facebook', ].map(s => (
                      <a key={s} href="#" aria-label={s} style={{
                        flex: 1, background: '#F3F7FB', border: '1px solid rgba(11,37,69,.08)',
                        borderRadius: 12, padding: '12px 0', textAlign: 'center', textDecoration: 'none',
                        color: '#6A7A96', fontSize: 12, fontFamily: 'var(--font-jakarta)', fontWeight: 600,
                        transition: 'all .25s',
                      }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#0B2545'; el.style.color = 'white'; el.style.borderColor = '#0B2545' }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#F3F7FB'; el.style.color = '#6A7A96'; el.style.borderColor = 'rgba(11,37,69,.08)' }}
                      >
                        {s.slice(0, 2)}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
