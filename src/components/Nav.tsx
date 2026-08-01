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
        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background .35s cubic-bezier(.16,1,.3,1),
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
          grid-template-columns: 520px 1fr auto;
          align-items: center;
          gap: 32px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: transparent;
  width: auto;
  height: auto;
}
       
        .nav-brand-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          white-space: nowrap;
        }
        .nav-college-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          letter-spacing: -.01em;
          line-height: 1.1;
          white-space: nowrap;
          transition: color .3s;
        }
        .nav-college-sub {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          letter-spacing: .06em;
          transition: color .3s;
        }
        /* transparent state (home hero) */
        .nav-root.transparent .nav-college-name {
    color: #ffffff;
    font-size: 28px;
    font-weight: 800;
    line-height: 1;
}

.nav-root.solid .nav-college-name {
    color: #0B2545;
    font-size: 28px;
    font-weight: 800;
    line-height: 1;
}
        .nav-root.transparent .nav-college-sub  { color: rgba(255,255,255,.55); font-size: 13px; text-transform: uppercase; }
        /* solid state (scrolled / inner pages) */
        .nav-root.solid .nav-college-name { color: #0B2545; font-size: 19px; }
        .nav-root.solid .nav-college-sub  { color: #8A9ABC; font-size: 10px; text-transform: uppercase; }

        overflow: visible;
position: fixed;
.nav-root {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    overflow: visible;

    transition:
        background .35s cubic-bezier(.16,1,.3,1),
        box-shadow .35s cubic-bezier(.16,1,.3,1),
        backdrop-filter .35s;
}
       

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
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 17px;
          font-weight: 700;
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
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
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
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #4A5A78;
          text-align: left;
          transition: background .2s, color .2s;
          border-bottom: 1px solid rgba(11,37,69,.04);
        }
        .nav-drawer-item:last-of-type { border-bottom: none; }
        .nav-drawer-item:hover, .nav-drawer-item.active { background: rgba(24,198,200,.08); color: #0B2545; }
        .nav-drawer-item.active { color: #1E5AA8; font-weight: 700; }
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
        @media (max-width: 1200px) {
          .nav-item { padding: 8px 10px; font-size: 13px; }
          .nav-item::after { left: 10px; right: 10px; }
          .nav-links { gap: 0px; }
          .nav-inner { gap: 20px; padding: 0 28px; }
        }
        @media (max-width: 1000px) {
          .nav-links, .nav-right .btn-apply { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-inner {
            grid-template-columns: 1fr auto;
            padding: 0 24px;
            height: 76px;
            gap: 16px;
          }
          .nav-right { justify-content: flex-end; }
          .nav-logo-ring { width: 52px; height: 52px; border-radius: 14px; }
          .nav-root.transparent .nav-college-name,
          .nav-root.solid .nav-college-name { font-size: 16px; }
        }
        @media (max-width: 480px) {
          .nav-inner { padding: 0 16px; height: 68px; }
          .nav-brand { gap: 12px; }
          .nav-logo-ring { width: 44px; height: 44px; border-radius: 11px; }
          .nav-root.transparent .nav-college-name,
          .nav-root.solid .nav-college-name { font-size: 15px; }
        }
      `}</style>

      <header className={`nav-root ${isScrolled ? 'solid' : 'transparent'}`}>
        <div className="nav-inner">

          {/* LEFT — Brand */}
          <button className="nav-brand" onClick={() => navigate('home')} aria-label="Madha College of Nursing — Home">
           <div className="nav-logo-ring">
  <img
    src="/logos/favico.png"
    alt="Madha College of Nursing"
    style={{
      height: "85px",
      width: "auto",
      display: "block"
    }}
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
