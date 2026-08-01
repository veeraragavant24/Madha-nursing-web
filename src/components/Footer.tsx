import { useState } from 'react'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'

interface FooterProps {
  navigate: (p: Page) => void
}

export default function Footer({ navigate }: FooterProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer style={{ background: '#060F1E', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative top gradient */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(24,198,200,.5), transparent)',
      }} />

      {/* Top glow blob */}
      <div style={{
        position: 'absolute', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(24,198,200,.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 40px 0' }}>
        {/* Top section */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, paddingBottom: 64, borderBottom: '1px solid rgba(255,255,255,.06)' }}>

          {/* Brand */}
          <div>
            <button onClick={() => navigate('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'linear-gradient(135deg, #18C6C8, #1E5AA8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 6v6c0 5.25 3.47 10.16 8 11.54C16.53 22.16 20 17.25 20 12V6l-8-4z" fill="white" opacity=".9"/>
                  <path d="M10 12h4M12 10v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div className="font-jakarta" style={{ color: 'white', fontWeight: 800, fontSize: 17, lineHeight: 1.2 }}>Madha College</div>
                <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 11, fontWeight: 500, letterSpacing: '.05em' }}>of Nursing, Chennai</div>
              </div>
            </button>

            <p style={{ color: 'rgba(255,255,255,.45)', fontSize: 14, lineHeight: 1.75, maxWidth: 320, marginBottom: 28 }}>
              Shaping compassionate healthcare leaders since 1998. Affiliated to The Tamil Nadu Dr. M.G.R. Medical University, Chennai.
            </p>

            {/* Accreditations */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
              {['INC Approved', 'TNMGRMU', 'NAAC'].map(tag => (
                <span key={tag} style={{
                  background: 'rgba(24,198,200,.08)', border: '1px solid rgba(24,198,200,.2)',
                  color: '#18C6C8', padding: '4px 12px', borderRadius: 100,
                  fontSize: 10, fontWeight: 700, letterSpacing: '.12em', fontFamily: 'var(--font-jakarta)',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[
  
  {
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    label: "Instagram",
    url: "https://www.instagram.com/madhacollegeofnursing"
  },
  {
    icon: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
    label: "Facebook",
    url: "https://www.facebook.com/madhacollegeofnursing"
  },
  
].map(s => (
                <a key={s.label} href={s.url}
    target="_blank"
    rel="noopener noreferrer" aria-label={s.label} style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all .3s', color: 'rgba(255,255,255,.6)',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(24,198,200,.15)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(24,198,200,.35)'; (e.currentTarget as HTMLAnchorElement).style.color = '#18C6C8' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,.06)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,.08)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,.6)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-jakarta" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: 24 }}>Navigate</h4>
            {([['home', 'Home'], ['about', 'About Us'], ['courses', 'Courses'], ['departments', 'Departments'], ['gallery', 'Gallery'], ['contact', 'Contact']] as [Page, string][]).map(([p, l]) => (
              <button key={p} onClick={() => navigate(p)} style={{
                display: 'block', background: 'none', border: 'none', cursor: 'pointer', padding: '7px 0',
                color: 'rgba(255,255,255,.55)', fontSize: 14, fontFamily: 'var(--font-inter)',
                textAlign: 'left', width: '100%', transition: 'color .2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#18C6C8')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-jakarta" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: 24 }}>Programmes</h4>
            {['B.Sc. Nursing', 'M.Sc. Nursing', 'Post Basic B.Sc.'].map(c => (
              <button key={c} onClick={() => navigate('courses')} style={{
                display: 'block', background: 'none', border: 'none', cursor: 'pointer', padding: '7px 0',
                color: 'rgba(255,255,255,.55)', fontSize: 14, fontFamily: 'var(--font-inter)',
                textAlign: 'left', width: '100%', transition: 'color .2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#18C6C8')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="font-jakarta" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: 24 }}>Connect</h4>

            <div style={{ marginBottom: 20 }}>
              <p style={{ color: 'rgba(255,255,255,.38)', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', marginBottom: 6, textTransform: 'uppercase' }}>Address</p>
              <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 13, lineHeight: 1.65 }}>Madha Nagar,  Somangalam Road, Kundrathur,<br/>Chennai – 600 069,<br/>Tamil Nadu, India</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ color: 'rgba(255,255,255,.38)', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', marginBottom: 4, textTransform: 'uppercase' }}>Phone</p>
              <a href="tel:+914422690001" style={{ color: 'rgba(255,255,255,.6)', fontSize: 13, textDecoration: 'none' }}>+91 91576 51234</a>
            </div>

            <div style={{ marginBottom: 28 }}>
              <p style={{ color: 'rgba(255,255,255,.38)', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', marginBottom: 4, textTransform: 'uppercase' }}>Email</p>
              <a href="mailto:admissions@madhacollege.edu.in" style={{ color: '#18C6C8', fontSize: 13, textDecoration: 'none' }}>info@madhanursing.in</a>
            </div>

            {/* Newsletter */}
            <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 12, marginBottom: 10 }}>Stay updated with news & admissions</p>
            {subscribed ? (
              <p style={{ color: '#18C6C8', fontSize: 13, fontWeight: 600 }}>✓ Subscribed successfully!</p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 0, borderRadius: 100, overflow: 'hidden', border: '1px solid rgba(255,255,255,.12)' }}>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  style={{
                    flex: 1, background: 'rgba(255,255,255,.06)', border: 'none', padding: '11px 18px',
                    color: 'white', fontSize: 13, fontFamily: 'var(--font-inter)', outline: 'none',
                  }}
                />
                <button type="submit" style={{
                  background: 'linear-gradient(135deg,#18C6C8,#1E5AA8)', color: 'white', border: 'none',
                  padding: '11px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-jakarta)',
                  whiteSpace: 'nowrap',
                }}>
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          padding: '24px 0', color: 'rgba(255,255,255,.28)', fontSize: 13,
        }}>
          <span>© 2026 Madha College of Nursing. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Use', 'Grievance'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,.28)', textDecoration: 'none', fontSize: 13, transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#18C6C8')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.28)')}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
