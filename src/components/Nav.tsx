import { useEffect, useState } from 'react'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'

interface NavProps {
  currentPage: Page
  navigate: (p: Page) => void
}

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About Us', page: 'about' },
  { label: 'Courses', page: 'courses' },
  { label: 'Departments', page: 'departments' },
  { label: 'Gallery', page: 'gallery' },
  { label: 'Contact Us', page: 'contact' },
  { label: 'Management', page: 'management' },
]

export default function Nav({ currentPage, navigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [currentPage])

  const isScrolled = scrolled || currentPage !== 'home'

  return (
    <>
      <style>{`

      /* =====================================
   TOP CONTACT BAR
===================================== */

.top-contact-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 34px;
  background: #071a36;
  z-index: 2000;
  display: flex;
  align-items: center;
}

.top-contact-inner {
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 28px;
}



.top-contact-item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

a.top-contact-item:hover {
  color: #18C6C8;
}

@media (max-width: 768px) {
  .top-contact-bar {
    height: 30px;
  }

  .nav-root {
  top: 30px !important;
}

  .top-contact-inner {
    padding: 0 12px;
    justify-content: center;
    gap: 18px;
  }

  .top-contact-item {
    font-size: 12px;
  }

  .top-address {
    display: none;
  }
}

       .nav-root {
  position: fixed;
  top: 34px;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1900;

  transition:
    background .35s cubic-bezier(.16,1,.3,1),
    box-shadow .35s cubic-bezier(.16,1,.3,1),
    backdrop-filter .35s;
}
        .nav-root.transparent {
          background: transparent;
          box-shadow: none;
        }
        .nav-root.solid {
          background: #ffffff;
          box-shadow: 0 2px 24px rgba(11,37,69,.09), 0 1px 0 rgba(11,37,69,.06);
        }

        /* 3-column grid — brand gets a fixed minimum so it never
           bleeds into the centred nav links */
        .nav-inner {
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 20px;
          height: 105px;
          display: grid;
          grid-template-columns: 550px 1fr auto;
          align-items: center;
          gap: 18px;
        }

        /* ── BRAND ── */
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 22px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          min-width: 0;
          text-align: left;
          flex-shrink: 0;
        }
        .nav-logo-ring {
  width: 76px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: transparent;
}

.nav-logo-img {
  display: block;
  width: auto;
  height: 82px;
  max-width: 100%;
  object-fit: contain;
}
       
        .nav-brand-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          white-space: nowrap;
        }
        .nav-college-name {
  font-family: 'Cinzel', serif;
  font-weight: 700;
  letter-spacing: 0.035em;
  line-height: 1.05;
  white-space: nowrap;
  transition: color .3s;
}
        .nav-college-sub {
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 500;
          letter-spacing: .06em;
          transition: color .3s;
        }
        /* transparent state (home hero) */
        .nav-root.transparent .nav-college-name {
  color: #ffffff;
  font-size: 25px;
  font-weight: 800;
  line-height: 1;
}

.nav-root.solid .nav-college-name {
    color: #0B2545;
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
}
        .nav-root.transparent .nav-college-sub  { color: rgba(255,255,255,.55); font-size: 13px; text-transform: uppercase; }
        /* solid state (scrolled / inner pages) */
        .nav-root.solid .nav-college-name {
  color: #0B2545;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.025em;
}
        .nav-root.solid .nav-college-sub  { color: #8A9ABC; font-size: 10px; text-transform: uppercase; }

       

       

        /* ── CENTER NAV LINKS ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          justify-content: flex-start;
        }
        .nav-item {
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px 16px;
          border-radius: 10px;
          position: relative;
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: .01em;
          transition: color .2s, background .2s;
          white-space: nowrap;
        }
        .nav-root.transparent .nav-item       { color: rgba(255,255,255,.80); }
        .nav-root.transparent .nav-item:hover { color: #ffffff; background: rgba(255,255,255,.10); }
        .nav-root.transparent .nav-item.active { color: #ffffff; }
        .nav-root.solid .nav-item       { color: #4A5A78; }
        .nav-root.solid .nav-item:hover { color: #0B2545; background: rgba(11,37,69,.05); }
        .nav-root.solid .nav-item.active { color: #0B2545; }

        /* active underline bar */
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 14px;
          right: 14px;
          height: 2.5px;
          border-radius: 2px;
          background: #18C6C8;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform .3s cubic-bezier(.16,1,.3,1);
        }
        .nav-item.active::after  { transform: scaleX(1); }
        .nav-item:hover::after   { transform: scaleX(1); }

        /* ── RIGHT: APPLY BUTTON ── */
        .nav-right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 16px;
        }
        .btn-apply {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 34px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 600;
          font-size: 17px;
          letter-spacing: .02em;
          background: linear-gradient(135deg, #18C6C8 0%, #0FA3B1 100%);
          color: #ffffff;
          box-shadow: 0 6px 20px rgba(24,198,200,.35);
          transition: transform .3s cubic-bezier(.16,1,.3,1),
                      box-shadow .3s cubic-bezier(.16,1,.3,1);
          white-space: nowrap;
        }
        .btn-apply:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(24,198,200,.50);
        }
        .nav-root.solid .btn-apply {
          box-shadow: 0 4px 16px rgba(24,198,200,.30);
        }

        /* ── HAMBURGER ── */
        .nav-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 10px;
          transition: background .2s;
          align-items: center;
          justify-content: center;
        }
        .nav-root.transparent .nav-hamburger { color: white; }
        .nav-root.solid .nav-hamburger { color: #0B2545; }
        .nav-hamburger:hover { background: rgba(11,37,69,.06); }

        /* ── MOBILE DRAWER ── */
        .nav-drawer {
          border-top: 1px solid rgba(11,37,69,.06);
          padding: 12px 24px 24px;
          background: #ffffff;
        }
        .nav-drawer-item {
          display: flex;
          align-items: center;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          padding: 14px 12px;
          border-radius: 12px;
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #4A5A78;
          text-align: left;
          transition: background .2s, color .2s;
          border-bottom: 1px solid rgba(11,37,69,.04);
        }
        .nav-drawer-item:last-of-type { border-bottom: none; }
        .nav-drawer-item:hover, .nav-drawer-item.active { background: rgba(24,198,200,.08); color: #0B2545; }
        .nav-drawer-item.active { color: #1E5AA8; font-weight: 600; }
        .nav-drawer-apply {
          margin-top: 16px;
          width: 100%;
          justify-content: center;
        }

        /* Divider line under transparent nav */
        .nav-root.transparent .nav-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
        }
        .nav-root.solid .nav-divider { display: none; }

        /* ── RESPONSIVE ── */
       /* ─────────────────────────────────────
   RESPONSIVE NAVIGATION
───────────────────────────────────── */

@media (max-width: 1400px) {

  .nav-inner {
    grid-template-columns: 430px 1fr auto;
    gap: 18px;
    padding: 0 28px;
  }

  .nav-item {
    padding: 10px 10px;
    font-size: 14px;
  }

  .btn-apply {
    padding: 14px 24px;
    font-size: 14px;
  }

  .nav-root.transparent .nav-college-name,
  .nav-root.solid .nav-college-name {
    font-size: 20px;
  }
}


@media (max-width: 1100px) {

  .nav-links,
  .nav-right .btn-apply {
    display: none !important;
  }

  .nav-hamburger {
    display: flex !important;
  }

  .nav-inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    width: 100%;
    height: 82px;
    padding: 0 24px;
    gap: 12px;
  }

  .nav-brand {
    width: fit-content;
    max-width: 100%;
    gap: 14px;
    overflow: hidden;
  }

  .nav-logo-ring {
    width: 58px;
    height: 72px;
  }

  .nav-logo-img {
    height: 66px;
  }

  .nav-brand-text {
    min-width: 0;
  }

  .nav-root.transparent .nav-college-name,
  .nav-root.solid .nav-college-name {
    font-size: 17px;
  }

  .nav-college-sub {
    font-size: 9px !important;
  }

  .nav-right {
    justify-content: flex-end;
  }

  .nav-hamburger {
    width: 44px;
    height: 44px;
    padding: 10px;
    flex-shrink: 0;
  }

  .nav-drawer {
    max-height: calc(100vh - 82px);
    overflow-y: auto;
  }
}


@media (max-width: 600px) {

  .nav-inner {
  height: 72px;
  padding: 0 12px;
  gap: 8px;
  grid-template-columns: minmax(0, 1fr) auto;
}

  .nav-brand {
  gap: 8px;
  width: 100%;
  min-width: 0;
  overflow: hidden;
}
  .nav-brand-text {
  min-width: 0;
  overflow: hidden;
}

.nav-college-name {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.nav-right {
  flex-shrink: 0;
}

  .nav-logo-ring {
    width: 48px;
    height: 66px;
  }

  .nav-logo-img {
    height: 60px;
    width: auto;
  }

  .nav-root.transparent .nav-college-name,
  .nav-root.solid .nav-college-name {
    font-size: 14px;
    line-height: 1.08;
    white-space: nowrap;
  }

  .nav-college-sub {
    font-size: 7px !important;
    letter-spacing: .035em;
    white-space: nowrap;
  }

  .nav-hamburger {
    width: 40px;
    height: 40px;
    padding: 8px;
  }

  .nav-drawer {
    padding: 10px 14px 20px;
    max-height: calc(100vh - 72px);
    overflow-y: auto;
  }

  .nav-drawer-item {
    padding: 12px 12px;
    font-size: 17px;
  }

  .nav-drawer-apply {
    padding: 13px 20px;
    font-size: 15px;
  }
}


@media (max-width: 380px) {

  .nav-inner {
    padding: 0 10px;
  }

  .nav-brand {
    gap: 7px;
  }

  .nav-logo-ring {
    width: 43px;
  }

  .nav-logo-img {
    height: 54px;
  }

  .nav-root.transparent .nav-college-name,
  .nav-root.solid .nav-college-name {
    font-size: 12px;
  }

  .nav-college-sub {
    font-size: 6.5px !important;
  }

  .nav-hamburger {
    width: 36px;
    height: 36px;
 }
`}</style>

{/* TOP CONTACT BAR */}
<div className="top-contact-bar">
  <div className="top-contact-inner">

    <a href="tel:+9191576 51234" className="top-contact-item">
      <span>☎</span>
      <span>+91 91576 51234</span>
    </a>

    <a href="info@madhanursing.in" className="top-contact-item">
      <span>✉</span>
      <span>info@madhanursing.in</span>
    </a>

    <div className="top-contact-item top-address">
      <span>📍</span>
      <span>Madha Nagar, Somangalam Road, Kundrathur, Chennai - 600069</span>
    </div>

  </div>
</div>

      <header className={`nav-root ${isScrolled ? 'solid' : 'transparent'}`}>
        <div className="nav-inner">

          {/* LEFT — Brand */}
          <button className="nav-brand" onClick={() => navigate('home')} aria-label="Madha College of Nursing — Home">
           <div className="nav-logo-ring">
  <img
    src="/logos/favico.png"
    alt="Madha College of Nursing"
    className="nav-logo-img"
  />
</div>
            <div className="nav-brand-text">
              <span className="nav-college-name">MADHA COLLEGE OF NURSING</span>
              <span className="nav-college-sub">Chennai, Tamil Nadu · Est. 1998</span>
            </div>
          </button>

          {/* CENTER — Navigation */}
          <nav className="nav-links" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, page }) => (
              <button
                key={page}
                className={`nav-item ${currentPage === page ? 'active' : ''}`}
                onClick={() => navigate(page)}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* RIGHT — CTA + hamburger */}
          <div className="nav-right">
            <button className="btn-apply" onClick={() => navigate('contact')}>
              Apply Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7"  x2="20" y2="7"/>
                    <line x1="4" y1="12" x2="20" y2="12"/>
                    <line x1="4" y1="17" x2="20" y2="17"/>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Subtle bottom line in transparent mode */}
        <div className="nav-divider" aria-hidden="true" />

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="nav-drawer" role="menu">
            {NAV_LINKS.map(({ label, page }) => (
              <button
                key={page}
                className={`nav-drawer-item ${currentPage === page ? 'active' : ''}`}
                onClick={() => navigate(page)}
                role="menuitem"
              >
                {label}
              </button>
            ))}
            <button className="btn-apply nav-drawer-apply" onClick={() => navigate('contact')}>
              Apply Now →
            </button>
          </div>
        )}
      </header>
    </>
  )
}
