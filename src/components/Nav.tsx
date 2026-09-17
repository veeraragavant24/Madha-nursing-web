import { useEffect, useRef, useState } from 'react'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal' | 'news-events'

interface NavProps {
  currentPage: Page
  navigate: (p: Page) => void
}

interface NavLink {
  label: string
  page: Page
}

interface NavEntry extends NavLink {
  children?: NavLink[]
}

const NAV_ITEMS: NavEntry[] = [
  { label: 'Home', page: 'home' },
  {
    label: 'About Us',
    page: 'about',
    children: [
      { label: 'About College', page: 'about' },
      { label: 'Management', page: 'management' },
      { label: 'Principal', page: 'principal' },
    ],
  },
  { label: 'Courses', page: 'courses' },
  { label: 'Departments', page: 'departments' },
  { label: 'Gallery', page: 'gallery' },
  { label: 'News & Events', page: 'news-events' },
  { label: 'Contact Us', page: 'contact' },
]

export default function Nav({ currentPage, navigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  // NORMAL HEADER
const normalNameRef = useRef<HTMLSpanElement>(null)
const normalRibbonRef = useRef<HTMLDivElement>(null)

// SCROLLED HEADER
const scrolledNameRef = useRef<HTMLSpanElement>(null)
const scrolledRibbonRef = useRef<HTMLDivElement>(null)
 /* =========================================================
   NORMAL HEADER — COMPLETELY INDEPENDENT
========================================================= */
useEffect(() => {
  if (scrolled) return

  const measureNormalHeader = () => {
    const name = normalNameRef.current
    const ribbon = normalRibbonRef.current

    if (!name || !ribbon) return

    const nameW = name.offsetWidth
    const ribbonW = ribbon.offsetWidth

    const start = -(nameW - ribbonW) / 2
    const travel = nameW

    ribbon.style.setProperty(
      '--shine-start',
      `${start}px`
    )

    ribbon.style.setProperty(
      '--shine-travel',
      `${travel}px`
    )
  }

  measureNormalHeader()

  if (document.fonts?.ready) {
    document.fonts.ready.then(measureNormalHeader)
  }

  window.addEventListener('resize', measureNormalHeader)

  return () => {
    window.removeEventListener('resize', measureNormalHeader)
  }
}, [scrolled])


/* =========================================================
   SCROLLED HEADER — COMPLETELY INDEPENDENT
========================================================= */
useEffect(() => {
  if (!scrolled) return

  const measureScrolledHeader = () => {
    const name = scrolledNameRef.current
    const ribbon = scrolledRibbonRef.current

    if (!name || !ribbon) return

    const nameW = name.offsetWidth
    const ribbonW = ribbon.offsetWidth

    const start = -(nameW - ribbonW) / 2
    const travel = nameW

    ribbon.style.setProperty(
      '--shine-start',
      `${start}px`
    )

    ribbon.style.setProperty(
      '--shine-travel',
      `${travel}px`
    )
  }

  measureScrolledHeader()

  if (document.fonts?.ready) {
    document.fonts.ready.then(measureScrolledHeader)
  }

  window.addEventListener('resize', measureScrolledHeader)

  return () => {
    window.removeEventListener('resize', measureScrolledHeader)
  }
}, [scrolled])

  useEffect(() => {
  const onScroll = () => {
    setScrolled(window.scrollY > 50)
  }

  // Set the correct state immediately when the page loads
  onScroll()

  window.addEventListener('scroll', onScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', onScroll)
  }
}, [])

 useEffect(() => {
  setMenuOpen(false)
  setAboutOpen(false)
  setScrolled(false)

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  })
}, [currentPage])

  
 const isScrolled = scrolled

  const aboutActive = currentPage === 'about' || currentPage === 'management' || currentPage === 'principal'

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
  height: 42px;
  background: #032f70;
  z-index: 2000;
  display: flex;
 justify-content: flex-start;
   
      
  transition:
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
    

.top-contact-bar.top-contact-hidden {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}



.top-contact-inner {
  max-width: 100%;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 160px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 28px;
  box-sizing: border-box;
}

/* Keep address on the RIGHT side */
.top-contact-inner .top-address {
  margin-left: auto;
}

.top-contact-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  color: #ffffff;
  text-decoration: none;

  font-family: 'Roboto Condensed', sans-serif;
 font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.01em;

  white-space: nowrap;
}

a.top-contact-item:hover {
  color: #18C6C8;
}
@media (max-width: 768px) {
  .top-contact-inner {
    padding: 0 12px;
    justify-content: flex-start;
    gap: 15px;
  }

  .top-contact-inner .top-address {
    margin-left: auto;
  }

  .top-contact-item {
    font-size: 15px;
  }
}

}

/* =========================================
   HEADER — BASE
========================================= */

.nav-root {
  position: fixed;
  top: 42px;
  left: 0;
  right: 0;
  width: 100%;
  height: 92px;
  z-index: 1900;

  background: transparent;
  border-radius: 0;
  box-shadow: none;

  transition:
    width 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    left 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    top 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    height 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.45s ease,
    box-shadow 0.55s ease,
    border-radius 0.55s ease,
    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}


/* =========================================
   BEFORE SCROLL
   FULL WIDTH / TRANSPARENT
========================================= */

.nav-root.transparent {
  position: fixed;

  top: 65px;
  left: 0;
  right: 0;

  width: 100%;
  height: 92px;

  transform: translateY(0);

  background: transparent;
  box-shadow: none;
  border-radius: 0;
  border: 0;

  z-index: 1900;
}


/* =========================================
   AFTER SCROLL
   COMPACT WHITE CARD
========================================= */

.nav-root.solid {
  position: fixed;

  top: 16px;
  left: 50%;
  right: auto;

  width: 90%;
  max-width: 1600px;
  height: 74px;

  transform: translateX(-50% );

  background: rgba(255, 255, 255, 0.90);
  backdrop-filter: blur(16px) saturate(1.1);
  -webkit-backdrop-filter: blur(16px) saturate(1.1);

  border: 1px solid rgba(255, 255, 255, 0.30);

  box-shadow:
    0 12px 35px rgba(0, 0, 0, 0.12);

  border-radius: 14px;

  z-index: 1900;
}
 /* =========================================================
   COMPUTER DESKTOP — WHITE SCROLL HEADER SPACING ONLY
   ========================================================= */

@media (min-width: 1401px) {

  /* WHITE HEADER OVERALL SPACING */
  .nav-root.solid .nav-inner {
    transform: none !important;

    padding-left: 22px !important;
    padding-right: 22px !important;

    gap: 10px !important;

    box-sizing: border-box !important;
  }


  /* LOGO + COLLEGE TITLE */
  .nav-root.solid .nav-brand {
    gap: 14px !important;

    margin: 0 !important;
    padding: 0 !important;

    flex-shrink: 0 !important;
  }


  /* MENU AREA */
  .nav-root.solid .nav-links {
    flex: 1 1 auto !important;

    display: flex !important;
    align-items: center !important;

    justify-content: space-evenly !important;

    gap: 4px !important;

    padding: 0 4px !important;

    margin: 0 !important;

    min-width: 0 !important;

    flex-wrap: nowrap !important;
    white-space: nowrap !important;
  }


  /* MENU ITEMS */
  .nav-root.solid .nav-item {
    flex: 0 0 auto !important;

    margin: 0 !important;

    padding: 10px 8px !important;

    white-space: nowrap !important;
  }


  /* APPLY NOW AREA */
  .nav-root.solid .nav-right {git push origin main
    margin-left: 4px !important;
    margin-right: 0 !important;

    padding: 0 !important;

    gap: 0 !important;

    flex: 0 0 auto !important;
  }


  /* APPLY BUTTON */
  .nav-root.solid .btn-apply {
    margin: 0 !important;
  }

}

/* Premium floating header transition */
.nav-root.solid .nav-inner {
  animation: headerCardIn 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes headerCardIn {
  from {
    opacity: 0.7;
    transform: translateY(-12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  
        /* 3-column grid — brand gets a fixed minimum so it never
           bleeds into the centred nav links */
        .nav-inner {
  width: 100%;
  max-width: none;

  margin: 0 auto;
  padding: 0 28px;

  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;
}

        /* ── BRAND ── */
        .nav-brand {
  display: flex;
  align-items: center;
  gap: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  min-width: 0;
  text-align: left;
  flex-shrink: 0;
}
       .nav-logo-ring {
  width: 92px;
  height: 92px;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
  background: transparent;
}

.nav-logo-img {
  display: block;

  width: 92px;
  height: 92px;

  object-fit: contain;
  border-radius: 50%;

  transition: all .5s ease;

  filter:
    drop-shadow(0 0 8px rgba(255,255,255,.95))
    drop-shadow(0 0 18px rgb(255,255,255))
    drop-shadow(0 0 30px rgb(255,255,255));
}

/* =========================================
   SCROLL — COMPACT LOGO
========================================= */

.nav-root.solid .nav-logo-ring {
  width: 68px;
  height: 68px;
}

.nav-root.solid .nav-logo-img {
  width: 68px;
  height: 68px;
}

        /* ── PREMIUM DIVIDER (brand) ── */
        .premium-divider {
  position: relative;
  align-self: center;

  width: 250px;
  height: 4px;

  margin: 7px 0 3px;

  border-radius: 3px;

background: linear-gradient(
  90deg,
  #8a6200 0%,
  #f0b00e 18%,
  #f6d76a 42%,
  #fff0a6 50%,
  #f6d76a 58%,
  #d39e17 82%,
  #705206 100%
);

  box-shadow:
    0 1px 4px rgba(184, 134, 11, 0.45),
    0 0 8px rgba(212, 175, 55, 0.25);

  overflow: visible;
}

.premium-divider::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;

  width: 14px;
  height: 14px;

  background: #e6b71d;
  border: 1px solid #e0be41;

  transform: translate(-50%, -50%) rotate(45deg);

  box-shadow:
    0 1px 4px rgba(184, 134, 11, 0.45);
}

/* ── GOLD RIBBON LIGHT SWEEP (extended travel to name width) ── */
.premium-divider::before {
  content: "";
  position: absolute;

  top: 0;
  height: 100%;

  left: var(--shine-start, -150px);

  width: 90px;

  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 255, 255, 0.75) 42%,
    #FFFFFF 50%,
    rgba(255, 255, 255, 0.75) 58%,
    rgba(255, 255, 255, 0) 80%,
    transparent 100%
  );

  filter:
    drop-shadow(0 0 3px rgba(255, 255, 255, 0.9))
    drop-shadow(0 0 7px rgba(255, 255, 255, 0.55));

  pointer-events: none;

  animation: extendedRibbonShine 3.8s ease-in-out infinite;
}

@keyframes extendedRibbonShine {
  0% {
    transform: translateX(0) skewX(-20deg);
    opacity: 0;
  }

  10% {
    transform: translateX(0) skewX(-20deg);
    opacity: 1;
  }

  90% {
    transform: translateX(calc(var(--shine-travel, 500px) - 90px)) skewX(-20deg);
    opacity: 1;
  }

  100% {
    transform: translateX(calc(var(--shine-travel, 500px) - 90px)) skewX(-20deg);
    opacity: 0;
  }
}

.nav-brand-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  white-space: nowrap;
}
        .nav-college-name {
  font-family: 'Cinzel', serif;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.055em;
  line-height: 1;
  white-space: nowrap;
  text-align: center;
  transition: color .5s ease, text-shadow .5s ease, letter-spacing .5s ease, font-size .5s ease;
}
        .nav-college-sub {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.85em;
          line-height: 1;
          margin-top: 8px;
          text-align: center;
          text-transform: uppercase;
          white-space: nowrap;
          transition: color .5s ease, letter-spacing .5s ease;
        }
        /* transparent state (home hero) */
        /* =========================================
   COLLEGE NAME — NORMAL
========================================= */

.nav-root.transparent .nav-college-name {
  color: #ffffff;

  font-family: 'Cinzel', serif;
  font-size: 28px;
  font-weight: 700;

  line-height: 1;
  letter-spacing: 0.08em;

  white-space: nowrap;

  text-shadow: 0 3px 15px rgba(0,0,0,.45);
}

.nav-root.transparent .nav-college-sub {
  color: #ffffff;

  font-size: 12px;
  text-transform: uppercase;
}


/* =========================================
   COLLEGE NAME — SCROLL
========================================= */

.nav-root.solid .nav-college-name {
  color: #163B72;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  white-space: nowrap;
  text-shadow: none;
}

.nav-root.solid .nav-college-sub {
  color: #6B7280;
  font-size: 12px;
  text-transform: uppercase;
}
       

       

        /* ── CENTER NAV LINKS ── */
        .nav-links {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 0;

  gap: 18px;

  flex-wrap: nowrap;
  white-space: nowrap;
}
  
/* =========================================
   MENU — NORMAL
========================================= */

.nav-root.transparent .nav-item {
  background: none;
  border: none;

  cursor: pointer;

  padding: 10px 9px;

  margin: 0;

  border-radius: 10px;

  position: relative;

 font-family: 'Inter', sans-serif;

font-size: 16px;
line-height: 1;

font-weight: 500;

  letter-spacing: .01em;

  color: #ffffff;

  white-space: nowrap;

  flex-shrink: 0;

  transition:
    color .2s,
    background .2s;
}


/* =========================================
   MENU — SCROLL
========================================= */

.nav-root.solid .nav-item {
  background: none;
  border: none;

  cursor: pointer;

  padding: 10px 14px;

  margin: 0;

  border-radius: 8px;

  position: relative;

  font-family: 'Manrope', sans-serif;

 font-size: 14px;
line-height: 1;

font-weight: 500;

letter-spacing: 0;

  color: #163B72;

  white-space: nowrap;

  flex-shrink: 0;
}
        .nav-root.transparent .nav-item       { color: rgba(255,255,255,.80); }
        .nav-root.transparent .nav-item:hover { color: #ffffff; background: rgba(255,255,255,.10); }
        .nav-root.transparent .nav-item.active { color: #ffffff; }
        .nav-root.solid .nav-item {
  color: #163B72;
  font-weight: 500;
}
  
        .nav-root.solid .nav-item:hover { color: #0B2545; background: rgba(11,37,69,.05); }
        .nav-root.solid .nav-item.active {
  color: #0B2545;
  font-weight: 500;
}

        /* active underline bar */
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 14px;
          right: 14px;
          height: 2.5px;
          border-radius: 2px;
          background: #D4AF37;
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
           margin-right: 90px;
        }
        /* =========================================
   APPLY BUTTON — NORMAL
========================================= */

.nav-root.transparent .btn-apply {
  width: 132px;
  height: 46px;
  padding: 12px;

  transform: translateX(-50px);

  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 6px;

  border-radius: 100px;
  border: none;

  cursor: pointer;

 font-family: 'Manrope', sans-serif;

 font-size: 16px;
font-weight: 700;
  letter-spacing: .01em;

  background: linear-gradient(
  135deg,
  #2563EB 0%,
  #06B6D4 100%
);
  color: #ffffff;

  box-shadow:
    0 6px 20px rgba(24,198,200,.30);

  white-space: nowrap;

  transition:
    transform .3s ease,
    box-shadow .3s ease;
}


/* =========================================
   APPLY BUTTON — SCROLL
========================================= */

.nav-root.solid .btn-apply {
  width: 115px;
  height: 44px;

  padding: 10px 12px;

  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 6px;

  font-size: 14px;
  font-weight: 600;

  border-radius: 100px;

  background: linear-gradient(
    135deg,
    #18C6C8 0%,
    #0FA3B1 100%
  );

  color: #ffffff;

  white-space: nowrap;
}

        .btn-apply:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(24,198,200,.50);
        }
        
        /* ── ABOUT US DROPDOWN ── */
        .nav-dropdown-trigger {
          position: relative;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .nav-item-chevron {
          display: inline-block;
          margin-left: 5px;
          flex-shrink: 0;
          transition: transform .3s cubic-bezier(.16,1,.3,1);
        }
        .nav-dropdown-trigger:hover .nav-item-chevron {
          transform: rotate(180deg);
        }
        .nav-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          min-width: 196px;
          padding: 8px;
          background: #ffffff;
          border: 1px solid rgba(11,37,69,.08);
          border-radius: 14px;
          box-shadow: 0 20px 48px rgba(11,37,69,.16);
          opacity: 0;
          visibility: hidden;
          transition: opacity .28s cubic-bezier(.16,1,.3,1), transform .28s cubic-bezier(.16,1,.3,1), visibility .28s;
          z-index: 2100;
        }
        .nav-dropdown-trigger:hover .nav-dropdown,
        .nav-dropdown-trigger:focus-within .nav-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        .nav-dropdown-item {
          display: flex;
          align-items: center;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          padding: 11px 14px;
          border-radius: 10px;
          font-family: 'Roboto Condensed', sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #163B72;
          text-align: left;
          white-space: nowrap;
          transition: background .2s, color .2s;
        }
        .nav-dropdown-item + .nav-dropdown-item {
          border-top: 1px solid rgba(11,37,69,.05);
          border-radius: 10px;
        }
        .nav-dropdown-item:hover,
        .nav-dropdown-item.active {
          background: rgba(24,198,200,.08);
          color: #0B2545;
        }
        .nav-dropdown-item.active {
          color: #1E5AA8;
          font-weight: 600;
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
          font-family: 'Roboto Condensed', sans-serif;
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
        .nav-drawer-item.has-children {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-drawer-chevron {
          transition: transform .3s ease;
          flex-shrink: 0;
        }
        .nav-drawer-chevron.open {
          transform: rotate(180deg);
        }
        .nav-drawer-sub {
          padding: 2px 0 8px;
          margin-left: 12px;
          border-left: 1px solid rgba(11,37,69,.06);
          display: flex;
          flex-direction: column;
        }
        .nav-drawer-sub-item {
          display: flex;
          align-items: center;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px 12px 12px 22px;
          border-radius: 10px;
          font-family: 'Roboto Condensed', sans-serif;
          font-size: 17px;
          font-weight: 500;
          color: #4A5A78;
          text-align: left;
          transition: background .2s, color .2s;
        }
        .nav-drawer-sub-item:hover,
        .nav-drawer-sub-item.active {
          background: rgba(24,198,200,.08);
          color: #0B2545;
        }
        .nav-drawer-sub-item.active {
          color: #1E5AA8;
          font-weight: 600;
        }

        /* Divider line under transparent nav */
        .nav-root.transparent .nav-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
        }
        .nav-root.solid .nav-divider { display: none; }

        /* ── RESPONSIVE ── */
/* =========================================================
   CLEAN RESPONSIVE HEADER
   Desktop > 1400px: existing desktop rules remain unchanged.
   769px–1400px: laptop sizing adapts fluidly.
   <=768px: mobile/tablet uses the existing hamburger drawer.
   ========================================================= */


   /* =========================================================
   FINAL LAPTOP HEADER
   769px → 1400px

   NORMAL HEADER RIBBON:
   150px × 5px

   OTHER HEADER ELEMENTS PRESERVED
   ========================================================= */

@media (min-width: 769px) and (max-width: 1400px) {

  /* =======================================================
     MAIN HEADER
     ======================================================= */

  .nav-root.transparent,
  .nav-root.solid {
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    transform: none !important;
    box-sizing: border-box !important;
  }


  /* =======================================================
     HEADER INNER
     ======================================================= */

  .nav-inner {
    width: 100% !important;
    max-width: 100% !important;

    display: flex !important;
    align-items: center !important;

    box-sizing: border-box !important;

    overflow: visible !important;
  }


  /* =======================================================
     BRAND
     ======================================================= */

  .nav-brand {
    flex-shrink: 0 !important;

    min-width: 0 !important;

    overflow: visible !important;

    box-sizing: border-box !important;

    position: relative !important;

    z-index: 50 !important;
  }


  /* =======================================================
     LOGO
     ======================================================= */

  .nav-logo-ring {
    flex-shrink: 0 !important;

    position: relative !important;

    z-index: 55 !important;
  }


  .nav-logo-img {
    object-fit: contain !important;

    display: block !important;
  }


  /* =======================================================
     TITLE CONTAINER
     ======================================================= */

  .nav-brand-text {
    min-width: 0 !important;

    flex-shrink: 0 !important;

    width: max-content !important;

    max-width: none !important;

    overflow: visible !important;

    display: flex !important;

    flex-direction: column !important;

    align-items: center !important;

    justify-content: center !important;

    gap: 0 !important;

    white-space: nowrap !important;

    position: relative !important;

    z-index: 55 !important;
  }


  /* =======================================================
     COLLEGE TITLE
     ======================================================= */

  .nav-root.transparent .nav-college-name,
  .nav-root.solid .nav-college-name {

    display: block !important;

    width: max-content !important;

    max-width: none !important;

    overflow: visible !important;

    text-overflow: clip !important;

    white-space: nowrap !important;

    text-align: center !important;

    margin: 0 !important;

    padding: 0 !important;

    line-height: 1.05 !important;

    position: relative !important;

    z-index: 5 !important;
  }


  /* =======================================================
     LAPTOP TITLE
     ======================================================= */

  .nav-root.transparent .nav-college-name,
  .nav-root.solid .nav-college-name {

    font-size: clamp(
      17px,
      1.45vw,
      22px
    ) !important;

    letter-spacing:
      clamp(
        .025em,
        .06vw,
        .045em
      ) !important;
  }


  /* =======================================================
     LAPTOP GOLD RIBBON

     NORMAL / TRANSPARENT HEADER

     SIZE IS PRESERVED:
     WIDTH  = 150px
     HEIGHT = 5px

     ONLY THE SHINE ANIMATION IS CHANGED.
     ======================================================= */

  .premium-divider {

    position: relative !important;

    width: 150px !important;
    height: 5px !important;

    margin-top: 7px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 2px !important;

    align-self: center !important;

    display: block !important;

    flex-shrink: 0 !important;

    box-sizing: border-box !important;

    border: none !important;

    border-radius: 4px !important;

    overflow: visible !important;

    /* GOLD RIBBON — FIXED */
    background:
      linear-gradient(
        90deg,
        #806000 0%,
        #b98200 15%,
        #e0b52c 35%,
        #f5d45b 50%,
        #e0b52c 65%,
        #b98200 85%,
        #806000 100%
      ) !important;

    box-shadow: none !important;

    z-index: 2 !important;
  }


  /* =======================================================
     TITLE-BOUND WHITE SHINE

     The shine is measured against the COMPLETE college title:

     M of MADHA  →  G of NURSING

     --shine-start:
       title's left edge relative to ribbon

     --shine-travel:
       complete title width

     Nav.tsx supplies these two values.
     ======================================================= */

  .premium-divider::before {

    content: "" !important;

    position: absolute !important;

    top: 0 !important;

    left: var(--shine-start, -150px) !important;

    width: 90px !important;

    height: 100% !important;

    background:
      linear-gradient(
        90deg,
        transparent 0%,
        rgba(255,255,255,0) 20%,
        rgba(255,255,255,0.75) 42%,
        #ffffff 50%,
        rgba(255,255,255,0.75) 58%,
        rgba(255,255,255,0) 80%,
        transparent 100%
      ) !important;

    filter:
      drop-shadow(0 0 3px rgba(255,255,255,0.9))
      drop-shadow(0 0 7px rgba(255,255,255,0.55));

    pointer-events: none !important;

    animation:
      laptopTitleBoundShine
      3.8s
      ease-in-out
      infinite !important;

    z-index: 3 !important;
  }


  /* =======================================================
     TITLE-BOUND ANIMATION

     START  = M OF MADHA
     END    = G OF NURSING

     The shine does not use a fixed ribbon width to
     determine its travel distance.
     ======================================================= */

  @keyframes laptopTitleBoundShine {

    0% {

      transform:
        translateX(0)
        skewX(-20deg);

      opacity: 0;
    }

    10% {

      transform:
        translateX(0)
        skewX(-20deg);

      opacity: 1;
    }

    90% {

      transform:
        translateX(
          calc(var(--shine-travel, 500px) - 90px)
        )
        skewX(-20deg);

      opacity: 1;
    }

    100% {

      transform:
        translateX(
          calc(var(--shine-travel, 500px) - 90px)
        )
        skewX(-20deg);

      opacity: 0;
    }
  }


  /* =======================================================
     CENTER GOLD DIAMOND
     ALWAYS VISIBLE ABOVE THE RIBBON
     ======================================================= */

  .premium-divider::after {

    content: "" !important;

    position: absolute !important;

    left: 50% !important;
    top: 35% !important;

    width: 13px !important;
    height: 13px !important;

    margin: 0 !important;

    display: block !important;

    background:
      linear-gradient(
        135deg,
        #fff7bd 0%,
        #ffe76a 25%,
        #f0c936 45%,
        #d29d0b 70%,
        #8a6200 100%
      ) !important;

    border: 1px solid #ffe47a !important;

    border-radius: 1px !important;

    transform:
      translate(-50%, -50%)
      rotate(45deg) !important;


    /*
       IMPORTANT
       Put diamond above everything.
    */

    z-index: 999 !important;

    opacity: 1 !important;

    visibility: visible !important;

    pointer-events: none !important;

    box-shadow:
      0 0 2px rgba(255, 225, 100, 0.8) !important;
  }


  /* =======================================================
     MENU ITEMS
     ======================================================= */

  .nav-root.transparent .nav-item,
  .nav-root.solid .nav-item {

    flex: 0 0 auto !important;

    margin: 0 !important;

    padding-top: 6px !important;

    padding-bottom: 6px !important;

    padding-left: 7px !important;

    padding-right: 7px !important;

    line-height: 1 !important;

    white-space: nowrap !important;

    box-sizing: border-box !important;
  }


  /* =======================================================
     MENU SIZE
     ======================================================= */

  .nav-root.transparent .nav-item,
  .nav-root.solid .nav-item {

    font-size:
      clamp(
        12px,
        .68vw,
        15px
      ) !important;
  }


  /* =======================================================
     ABOUT ARROW
     ======================================================= */

  .nav-item-chevron {

    width: 7px !important;

    height: 7px !important;

    margin-left: 3px !important;

    flex-shrink: 0 !important;
  }


  /* =======================================================
     MENU UNDERLINE
     ======================================================= */

  .nav-item::after {

    left: 3px !important;

    right: 3px !important;
  }


  /* =======================================================
     APPLY NOW
     ======================================================= */

  .nav-right {

    flex: 0 0 auto !important;

    min-width: 0 !important;

    width: auto !important;

    display: flex !important;

    align-items: center !important;

    justify-content: flex-end !important;

    margin-left: 0 !important;

    margin-right: 0 !important;

    padding-left: 10px !important;

    padding-right: 0 !important;

    position: relative !important;

    z-index: 60 !important;

    box-sizing: border-box !important;
  }


  /* =======================================================
     APPLY NOW
     TRANSPARENT
     ======================================================= */

  .nav-root.transparent .btn-apply {

    width: 112px !important;

    height: 38px !important;

    padding: 6px 10px !important;

    font-size: 12px !important;

    gap: 4px !important;

    transform: none !important;

    white-space: nowrap !important;

    box-sizing: border-box !important;
  }


  /* =======================================================
     APPLY NOW
     SOLID
     ======================================================= */

  .nav-root.solid .btn-apply {

    width: 102px !important;

    height: 36px !important;

    padding: 6px 9px !important;

    font-size: 11px !important;

    gap: 4px !important;

    transform: none !important;

    white-space: nowrap !important;

    box-sizing: border-box !important;
  }


  /* =======================================================
     APPLY ICON
     ======================================================= */

  .nav-root.transparent .btn-apply svg,
  .nav-root.solid .btn-apply svg {

    width: 11px !important;

    height: 11px !important;

    flex-shrink: 0 !important;
  }


  /* =======================================================
     SOLID / WHITE HEADER
     ======================================================= */

  .nav-root.solid {

    margin-left: 8px !important;

    margin-right: 8px !important;

    width:
      calc(100% - 16px)
      !important;

    box-sizing: border-box !important;
  }


  .nav-root.solid .nav-inner {

    padding-left: 18px !important;

    padding-right: 18px !important;

    box-sizing: border-box !important;
  }


  /* =======================================================
     SOLID RIBBON
     
     UNCHANGED
     ======================================================= */

  .nav-root.solid .premium-divider {

    width:
      clamp(
        130px,
        12vw,
        165px
      ) !important;

    height: 4px !important;

    margin:
      7px auto 3px
      !important;

    overflow:  !important;

    box-shadow: none !important;

    border: none !important;
  }


  /* =======================================================
     BRAND PROTECTION
     ======================================================= */

  .nav-brand,
  .nav-brand-text {

    overflow: visible !important;
  }


  /* =======================================================
     HAMBURGER
     ======================================================= */

  .nav-hamburger {

    display: none !important;
  }

}


/* =========================================================
   WHITE SHINE KEYFRAMES
   OUTSIDE MEDIA QUERY
   IMPORTANT
   ========================================================= */

@keyframes laptopRibbonWhiteShine {

  0% {

    left: -70px;

    opacity: 0;
  }


  8% {

    left: -50px;

    opacity: 1;
  }


  25% {

    left: 0;

    opacity: 1;
  }


  45% {

    left: 55px;

    opacity: 1;
  }


  65% {

    left: 110px;

    opacity: 1;
  }


  82% {

    left: 155px;

    opacity: 1;
  }


  92% {

    left: 205px;

    opacity: 0;
  }


  100% {

    left: 225px;

    opacity: 0;
  }

}




/* ---------- SMALL PHONE: 480px and below ---------- */

@media (max-width: 480px) {

  .top-contact-bar {
    height: 38px !important;
  }

  .top-contact-inner {
    height: 38px !important;
    padding: 0 10px !important;
    gap: 8px !important;
  }

  .top-contact-item {
    font-size: 7.5px !important;
  }

  .top-contact-inner .top-contact-item:nth-child(2) {
    display: none !important;
  }

  .top-contact-inner .top-address {
    margin-left: auto !important;
    max-width: 58% !important;
    min-width: 0 !important;
  }

  .nav-inner {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }

  .nav-brand {
    max-width: calc(100% - 44px) !important;
    gap: 6px !important;
  }

  .nav-logo-ring {
    width: 48px !important;
    height: 52px !important;
  }

  .nav-logo-img {
    width: 52px !important;
    height: 52px !important;
  }
   

/* =========================================================
   MOBILE RESPONSIVE
   0px → 768px

   MOBILE LAYOUT:
   LOGO | COLLEGE TITLE | HAMBURGER

   DESKTOP MENU = HIDDEN
   MOBILE DRAWER = USED
   ========================================================= */

@media (max-width: 768px) {

  /* =====================================================
     TOP CONTACT BAR
     ===================================================== */

  .top-contact-bar {
    height: 38px !important;
  }

  .top-contact-inner {
    width: 100% !important;
    height: 38px !important;

    padding: 0 10px !important;

    display: flex !important;
    align-items: center !important;

    justify-content: flex-start !important;

    gap: 8px !important;

    box-sizing: border-box !important;
  }

  .top-contact-item {
    display: inline-flex !important;
    align-items: center !important;

    gap: 5px !important;

    font-size: 8px !important;

    white-space: nowrap !important;
  }

  .top-contact-inner .top-contact-item:nth-child(2) {
    display: none !important;
  }

  .top-contact-inner .top-address {
    margin-left: auto !important;

    max-width: 58% !important;
    min-width: 0 !important;

    overflow: hidden !important;

    text-overflow: ellipsis !important;

    white-space: nowrap !important;
  }


  /* =====================================================
   MOBILE HEADER POSITION
   ===================================================== */

/* WHITE SCROLL HEADER */
.nav-root.solid {
  left: 50% !important;
  right: auto !important;

  top: 42px !important;

  width: calc(100% - 20px) !important;
  max-width: none !important;

  height: 64px !important;

  transform: translateX(-50%) !important;

  border-radius: 14px !important;

  box-sizing: border-box !important;
}


/* NORMAL TRANSPARENT HEADER */
.nav-root.transparent {
  left: 0 !important;
  right: 0 !important;
  top: 42px !important;

  width: 100% !important;
  max-width: 100% !important;

  transform: none !important;

  border-radius: 0 !important;
}


  /* =====================================================
     MOBILE HEADER INNER
     ===================================================== */

  .nav-inner {

    width: 100% !important;
    max-width: 100% !important;

    height: 100% !important;

    padding-left: 10px !important;
    padding-right: 10px !important;

    display: flex !important;

    align-items: center !important;

    justify-content: space-between !important;

    gap: 6px !important;

    box-sizing: border-box !important;
  }


  /* =====================================================
     MOBILE BRAND
     ===================================================== */

  .nav-brand {

    flex: 1 1 auto !important;

    width: auto !important;

    min-width: 0 !important;

    max-width: calc(100% - 48px) !important;

    display: flex !important;

    align-items: center !important;

    gap: 7px !important;

    padding: 0 !important;

    margin: 0 !important;

    border: none !important;

    overflow: visible !important;
  }


  /* =====================================================
     MOBILE LOGO
     ===================================================== */

  .nav-logo-ring {

    width: 48px !important;
    height: 48px !important;

    flex: 0 0 48px !important;

    flex-shrink: 0 !important;
  }

  .nav-logo-img {

    width: 48px !important;
    height: 48px !important;

    flex-shrink: 0 !important;
  }


  /* =====================================================
     MOBILE TITLE CONTAINER
     ===================================================== */

  .nav-brand-text {

    flex: 1 1 auto !important;

    min-width: 0 !important;

    max-width: 100% !important;

    display: flex !important;

    flex-direction: column !important;

    align-items: center !important;

    justify-content: center !important;

    gap: 0 !important;

    overflow: visible !important;
  }


  /* =====================================================
     MOBILE COLLEGE TITLE
     ===================================================== */

  .nav-college-name,
  .nav-root.transparent .nav-college-name,
  .nav-root.solid .nav-college-name {

    display: block !important;

    width: 100% !important;

    max-width: 100% !important;

    font-family: 'Cinzel', serif !important;

   font-size: clamp(12px, 3.8vw, 15px) !important;

    font-weight: 700 !important;

    line-height: 1 !important;

    letter-spacing: 0.025em !important;

    text-align: center !important;

    white-space: nowrap !important;

    overflow: visible !important;

    text-overflow: clip !important;

    animation: mobileCollegeTitleIn 0.8s ease-out both !important;
  }


  /* =====================================================
     MOBILE TITLE ANIMATION
     ===================================================== */

  @keyframes mobileCollegeTitleIn {

    from {
      opacity: 0;
      transform: translateY(7px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }

  }


  /* =====================================================
     MOBILE GOLD RIBBON
     ===================================================== */

  .premium-divider {

    width: clamp(100px, 28vw, 145px) !important;

    max-width: 100% !important;

    height: 3px !important;

    margin: 6px auto 2px !important;

    align-self: center !important;

    overflow: visible !important;
  }


  /* =====================================================
     HIDE DESKTOP NAVIGATION
     ===================================================== */

  .nav-links {
    display: none !important;
  }


  /* =====================================================
     MOBILE RIGHT SIDE
     ===================================================== */

  .nav-right {

    flex: 0 0 auto !important;

    width: auto !important;

    min-width: 40px !important;

    margin: 0 !important;

    padding: 0 !important;

    display: flex !important;

    align-items: center !important;

    justify-content: flex-end !important;

    gap: 0 !important;

    border: none !important;
  }


  /* =====================================================
     HIDE HEADER APPLY BUTTON
     APPLY BUTTON REMAINS IN DRAWER
     ===================================================== */

  .nav-right .btn-apply {
    display: none !important;
  }


  /* =====================================================
     MOBILE HAMBURGER
     ===================================================== */

  .nav-hamburger {

    display: flex !important;

    width: 38px !important;

    height: 38px !important;

    flex: 0 0 38px !important;

    padding: 7px !important;

    margin: 0 !important;

    align-items: center !important;

    justify-content: center !important;

    border-radius: 10px !important;
  }

  .nav-hamburger svg {
    width: 22px !important;
    height: 22px !important;
  }


  /* =====================================================
     MOBILE DIVIDER
     ===================================================== */

  .nav-root.transparent .nav-divider {

    display: block !important;

    height: 1px !important;

    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,.15),
        transparent
      ) !important;
  }

  .nav-root.solid .nav-divider {
    display: none !important;
  }


  /* =====================================================
     MOBILE DRAWER
     ===================================================== */

  .nav-drawer {

    width: 100% !important;

    box-sizing: border-box !important;

    border-top: 1px solid rgba(11,37,69,.06) !important;

    padding: 10px 14px 18px !important;

    background: #ffffff !important;

    max-height: calc(100vh - 90px) !important;

    overflow-y: auto !important;
  }


  /* =====================================================
     DRAWER MENU ITEMS
     ===================================================== */

  .nav-drawer-item {

    display: flex !important;

    align-items: center !important;

    width: 100% !important;

    min-height: 46px !important;

    padding: 13px 12px !important;

    box-sizing: border-box !important;

    font-size: 17px !important;

    border-radius: 10px !important;
  }


  /* =====================================================
     DRAWER SUB MENU
     ===================================================== */

  .nav-drawer-sub {

    margin-left: 8px !important;

    padding: 2px 0 6px !important;
  }

  .nav-drawer-sub-item {

    width: 100% !important;

    padding: 11px 12px 11px 20px !important;

    font-size: 16px !important;
  }


  /* =====================================================
     DRAWER APPLY BUTTON
     ===================================================== */

  .nav-drawer-apply {

    display: inline-flex !important;

    width: 100% !important;

    min-height: 44px !important;

    margin-top: 12px !important;

    align-items: center !important;

    justify-content: center !important;
  }

}


/* =========================================================
   SMALL MOBILE
   480px AND BELOW
   ========================================================= */

@media (max-width: 480px) {

  .top-contact-item {
    font-size: 7.5px !important;
  }

  .nav-inner {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }

  .nav-logo-ring {
    width: 46px !important;
    height: 46px !important;

    flex-basis: 46px !important;
  }

  .nav-logo-img {
    width: 46px !important;
    height: 46px !important;
  }

  .nav-brand {
    gap: 6px !important;

    max-width: calc(100% - 44px) !important;
  }

  .nav-college-name,
  .nav-root.transparent .nav-college-name,
  .nav-root.solid .nav-college-name {

    font-size: clamp(11px, 3.8vw, 15px) !important;

    letter-spacing: 0.02em !important;
  }

  .premium-divider {
    width: clamp(90px, 28vw, 135px) !important;

    height: 2px !important;

    margin-top: 5px !important;
  }

  .nav-hamburger {
    width: 36px !important;
    height: 36px !important;

    flex-basis: 36px !important;
  }

}

/* =========================================================
   MOBILE FLOATING APPLY NOW BUTTON
   Right side of the screen, vertically centered.
   ========================================================= */

@media (max-width: 768px) {

  .nav-root .nav-right .btn-apply {
    display: inline-flex !important;

    position: fixed !important;

    right: 0 !important;
    top: 50vh !important;

    transform: translateY(-50%) !important;

    width: clamp(78px, 20vw, 92px) !important;
    min-width: 78px !important;

    height: 34px !important;

    margin: 0 !important;
    padding: 5px 8px !important;

    align-items: center !important;
    justify-content: center !important;

    gap: 3px !important;

    font-size: clamp(9px, 2.6vw, 11px) !important;
    line-height: 1 !important;

    white-space: nowrap !important;

    z-index: 99999 !important;

    border-radius: 16px 0 0 16px !important;
  }

}

@media (max-width: 480px) {

  .nav-root .nav-right .btn-apply {
    width: 74px !important;
    min-width: 74px !important;
    height: 31px !important;

    padding: 4px 6px !important;

    font-size: 9px !important;

    border-radius: 15px 0 0 15px !important;
  }

}

 

`}</style>

{/* TOP CONTACT BAR */}
<div className={`top-contact-bar ${isScrolled ? 'top-contact-hidden' : ''}`}>
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

     {/* =========================================================
    NORMAL / UNSCROLLED HEADER
    This header exists ONLY when page is at the top.
========================================================= */}

{!isScrolled && (
  <header className="nav-root transparent normal-header">
    <div className="nav-inner">

      {/* NORMAL — BRAND */}
      <button
        className="nav-brand"
        onClick={() => navigate('home')}
        aria-label="Madha College of Nursing — Home"
      >
        <div className="nav-logo-ring">

          <img
            src="/logos/favico.png"
            alt="Madha College of Nursing"
            className="nav-logo-img"
          />

        </div>

        <div className="nav-brand-text">

          <span
            className="nav-college-name"
            ref={normalNameRef}
          >
            MADHA COLLEGE OF NURSING
          </span>

          <div
            className="premium-divider"
            ref={normalRibbonRef}
            aria-hidden="true"
          />

        </div>
      </button>


      {/* NORMAL — NAVIGATION */}
      <nav
        className="nav-links"
        aria-label="Primary navigation"
      >
        {NAV_ITEMS.map(item =>
          item.children ? (

            <div
              key={item.page}
              className="nav-dropdown-trigger"
            >

              <button
                className={`nav-item ${
                  aboutActive ? 'active' : ''
                }`}
                onClick={() => navigate(item.page)}
                aria-haspopup="true"
                aria-expanded="false"
              >
                {item.label}

                <svg
                  className="nav-item-chevron"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div
                className="nav-dropdown"
                role="menu"
              >
                {item.children.map(child => (
                  <button
                    key={child.page}
                    role="menuitem"
                    className={`nav-dropdown-item ${
                      currentPage === child.page
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => navigate(child.page)}
                  >
                    {child.label}
                  </button>
                ))}
              </div>

            </div>

          ) : (

            <button
              key={item.page}
              className={`nav-item ${
                currentPage === item.page
                  ? 'active'
                  : ''
              }`}
              onClick={() => navigate(item.page)}
              aria-current={
                currentPage === item.page
                  ? 'page'
                  : undefined
              }
            >
              {item.label}
            </button>

          )
        )}
      </nav>


      {/* NORMAL — RIGHT */}
      <div className="nav-right">

        <button
          className="btn-apply"
          onClick={() => navigate('contact')}
        >
          Apply Now

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>

        </button>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={
            menuOpen
              ? 'Close menu'
              : 'Open menu'
          }
          aria-expanded={menuOpen}
        >

          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                />

                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                />
              </>
            ) : (
              <>
                <line
                  x1="4"
                  y1="7"
                  x2="20"
                  y2="7"
                />

                <line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                />

                <line
                  x1="4"
                  y1="17"
                  x2="20"
                  y2="17"
                />
              </>
            )}
          </svg>

        </button>

      </div>

    </div>

    <div
      className="nav-divider"
      aria-hidden="true"
    />

    {/* NORMAL — MOBILE DRAWER */}
    {menuOpen && (
      <div
        className="nav-drawer"
        role="menu"
      >

        {NAV_ITEMS.map(item =>
          item.children ? (

            <div key={item.page}>

              <button
                className={`nav-drawer-item has-children ${
                  aboutActive ? 'active' : ''
                }`}
                onClick={() =>
                  setAboutOpen(o => !o)
                }
                aria-expanded={aboutOpen}
                role="menuitem"
              >
                {item.label}

                <svg
                  className={`nav-drawer-chevron ${
                    aboutOpen ? 'open' : ''
                  }`}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {aboutOpen && (
                <div
                  className="nav-drawer-sub"
                  role="menu"
                >
                  {item.children.map(child => (
                    <button
                      key={child.page}
                      className={`nav-drawer-sub-item ${
                        currentPage === child.page
                          ? 'active'
                          : ''
                      }`}
                      onClick={() =>
                        navigate(child.page)
                      }
                      role="menuitem"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}

            </div>

          ) : (

            <button
              key={item.page}
              className={`nav-drawer-item ${
                currentPage === item.page
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navigate(item.page)
              }
              role="menuitem"
            >
              {item.label}
            </button>

          )
        )}

        <button
          className="btn-apply nav-drawer-apply"
          onClick={() => navigate('contact')}
        >
          Apply Now →
        </button>

      </div>
    )}

  </header>
)}


{/* =========================================================
    SCROLLED HEADER
    This header exists ONLY after scrolling.
========================================================= */}

{isScrolled && (
  <header className="nav-root solid scrolled-header">

    <div className="nav-inner">

      {/* SCROLLED — BRAND */}
      <button
        className="nav-brand"
        onClick={() => navigate('home')}
        aria-label="Madha College of Nursing — Home"
      >

        <div className="nav-logo-ring">

          <img
            src="/logos/favico.png"
            alt="Madha College of Nursing"
            className="nav-logo-img"
          />

        </div>

        <div className="nav-brand-text">

          <span
            className="nav-college-name"
            ref={scrolledNameRef}
          >
            MADHA COLLEGE OF NURSING
          </span>

          <div
            className="premium-divider"
            ref={scrolledRibbonRef}
            aria-hidden="true"
          />

        </div>

      </button>


      {/* SCROLLED — NAVIGATION */}
      <nav
        className="nav-links"
        aria-label="Primary navigation"
      >

        {NAV_ITEMS.map(item =>
          item.children ? (

            <div
              key={item.page}
              className="nav-dropdown-trigger"
            >

              <button
                className={`nav-item ${
                  aboutActive ? 'active' : ''
                }`}
                onClick={() => navigate(item.page)}
                aria-haspopup="true"
                aria-expanded="false"
              >
                {item.label}

                <svg
                  className="nav-item-chevron"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>

              </button>

              <div
                className="nav-dropdown"
                role="menu"
              >
                {item.children.map(child => (
                  <button
                    key={child.page}
                    role="menuitem"
                    className={`nav-dropdown-item ${
                      currentPage === child.page
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      navigate(child.page)
                    }
                  >
                    {child.label}
                  </button>
                ))}
              </div>

            </div>

          ) : (

            <button
              key={item.page}
              className={`nav-item ${
                currentPage === item.page
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navigate(item.page)
              }
              aria-current={
                currentPage === item.page
                  ? 'page'
                  : undefined
              }
            >
              {item.label}
            </button>

          )
        )}

      </nav>


      {/* SCROLLED — RIGHT */}
      <div className="nav-right">

        <button
          className="btn-apply"
          onClick={() => navigate('contact')}
        >
          Apply Now

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>

        </button>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={
            menuOpen
              ? 'Close menu'
              : 'Open menu'
          }
          aria-expanded={menuOpen}
        >

          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >

            {menuOpen ? (
              <>
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                />

                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                />
              </>
            ) : (
              <>
                <line
                  x1="4"
                  y1="7"
                  x2="20"
                  y2="7"
                />

                <line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                />

                <line
                  x1="4"
                  y1="17"
                  x2="20"
                  y2="17"
                />
              </>
            )}

          </svg>

        </button>

      </div>

    </div>


    {/* SCROLLED — MOBILE DRAWER */}
    {menuOpen && (
      <div
        className="nav-drawer"
        role="menu"
      >

        {NAV_ITEMS.map(item =>
          item.children ? (

            <div key={item.page}>

              <button
                className={`nav-drawer-item has-children ${
                  aboutActive ? 'active' : ''
                }`}
                onClick={() =>
                  setAboutOpen(o => !o)
                }
                aria-expanded={aboutOpen}
                role="menuitem"
              >

                {item.label}

                <svg
                  className={`nav-drawer-chevron ${
                    aboutOpen ? 'open' : ''
                  }`}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>

              </button>

              {aboutOpen && (
                <div
                  className="nav-drawer-sub"
                  role="menu"
                >

                  {item.children.map(child => (
                    <button
                      key={child.page}
                      className={`nav-drawer-sub-item ${
                        currentPage === child.page
                          ? 'active'
                          : ''
                      }`}
                      onClick={() =>
                        navigate(child.page)
                      }
                      role="menuitem"
                    >
                      {child.label}
                    </button>
                  ))}

                </div>
              )}

            </div>

          ) : (

            <button
              key={item.page}
              className={`nav-drawer-item ${
                currentPage === item.page
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navigate(item.page)
              }
              role="menuitem"
            >
              {item.label}
            </button>

          )
        )}

        <button
          className="btn-apply nav-drawer-apply"
          onClick={() => navigate('contact')}
        >
          Apply Now →
        </button>

      </div>
    )}

  </header>
)}
    </>
  )
}
