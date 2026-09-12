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
  @media (min-width: 1401px) {
  .nav-inner {
    transform: translateX(30px) !important;
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
   MADHA COLLEGE OF NURSING
   LAPTOP HEADER ONLY
   =========================================================

   LAPTOP:
   769px → 1700px

   MOBILE:
   Below 769px = unchanged

   LARGE DESKTOP:
   Above 1700px = unchanged

   ========================================================= */


@media (min-width: 769px) and (max-width: 1700px) {


  /* =======================================================
     1. MAIN HEADER ROOT
     ======================================================= */

  .nav-root.transparent,
  .nav-root.solid {

    left: 0 !important;
    right: 0 !important;

    width: 100% !important;

    transform: none !important;

    box-sizing: border-box !important;
  }



  /* =======================================================
     2. HEADER INNER
     ======================================================= */

  .nav-inner {

    width: 100% !important;

    max-width: none !important;

    height: 100% !important;

    padding-left: clamp(
      24px,
      3vw,
      55px
    ) !important;

    padding-right: clamp(
      24px,
      3vw,
      55px
    ) !important;

    display: flex !important;

    align-items: center !important;

    box-sizing: border-box !important;

    overflow: visible !important;
  }



  /* =======================================================
     3. BRAND AREA
     LOGO + COLLEGE TITLE
     ======================================================= */

  .nav-brand {

    /*
      Reserve enough horizontal space for:

      LOGO
      +
      MADHA COLLEGE OF NURSING
      +
      RIBBON

      This prevents the menu from covering
      the college title.
    */

    flex: 0 1 clamp(
      545px,
      34vw,
      650px
    ) !important;

    width: clamp(
      545px,
      34vw,
      650px
    ) !important;

    min-width: 510px !important;

    max-width: 650px !important;

    height: 100% !important;

    display: flex !important;

    align-items: center !important;

    gap: 14px !important;

    padding: 0 !important;

    margin: 0 !important;

    border-right: none !important;

    box-sizing: border-box !important;

    overflow: visible !important;

    position: relative !important;

    z-index: 50 !important;
  }



  /* =======================================================
     4. LOGO RING
     ======================================================= */

  .nav-logo-ring {

    width: clamp(
      64px,
      4.7vw,
      76px
    ) !important;

    height: clamp(
      64px,
      4.7vw,
      76px
    ) !important;

    min-width: 64px !important;

    min-height: 64px !important;

    flex: 0 0 auto !important;

    display: flex !important;

    align-items: center !important;

    justify-content: center !important;

    position: relative !important;

    z-index: 55 !important;
  }



  /* =======================================================
     5. LOGO IMAGE
     ======================================================= */

  .nav-logo-img {

    width: 100% !important;

    height: 100% !important;

    object-fit: contain !important;

    display: block !important;
  }



  /* =======================================================
     6. BRAND TEXT CONTAINER
     ======================================================= */

  .nav-brand-text {

    flex: 1 1 auto !important;

    min-width: 0 !important;

    width: auto !important;

    max-width: none !important;

    height: auto !important;

    display: flex !important;

    flex-direction: column !important;

    align-items: flex-start !important;

    justify-content: center !important;

    overflow: visible !important;

    position: relative !important;

    z-index: 55 !important;
  }



  /* =======================================================
     7. COLLEGE TITLE
     ======================================================= */

  .nav-college-name,

  .nav-root.transparent .nav-college-name,

  .nav-root.solid .nav-college-name {

    display: block !important;

    width: max-content !important;

    max-width: 100% !important;

    min-width: 0 !important;

    margin: 0 !important;

    padding: 0 !important;

    font-size: clamp(
      19px,
      1.52vw,
      25px
    ) !important;

    line-height: 1.08 !important;

    letter-spacing: 0.022em !important;

    font-weight: 600 !important;

    white-space: nowrap !important;

    overflow: visible !important;

    text-overflow: clip !important;

    box-sizing: border-box !important;
  }



  /* =======================================================
     8. GOLD RIBBON
     =======================================================

     IMPORTANT:
     No white shine.
     No ribbon shadow.
     Ribbon is directly below title.
     ======================================================= */

  .premium-divider {

    position: relative !important;

    width: clamp(
      225px,
      18vw,
      275px
    ) !important;

    max-width: 275px !important;

    height: 13px !important;

    margin-top: 4px !important;

    margin-bottom: 0 !important;

    display: block !important;

    overflow: visible !important;

    background:
      linear-gradient(
        90deg,

        #806000 0%,

        #ad7e00 10%,

        #d5a91c 25%,

        #f1d257 48%,

        #d5a91c 72%,

        #ad7e00 90%,

        #806000 100%
      )

      center center /

      100% 3px

      no-repeat !important;

    border-radius: 10px !important;

    /*
      NO SHADOW
    */

    box-shadow: none !important;
  }



  /* =======================================================
     9. GOLD DIAMOND
     ======================================================= */

  .premium-divider::before {

    content: "" !important;

    position: absolute !important;

    left: 50% !important;

    top: 50% !important;

    width: 14px !important;

    height: 14px !important;

    transform:
      translate(-50%, -50%)
      rotate(45deg) !important;

    background:
      linear-gradient(
        135deg,

        #fff1a3 0%,

        #f0cc4c 30%,

        #d2a00b 60%,

        #8b6200 100%
      ) !important;

    border: 1px solid #f6d45a !important;

    border-radius: 1px !important;

    /*
      Very subtle diamond glow only.
      The ribbon itself has NO shadow.
    */

    box-shadow:
      0 0 5px rgba(
        255,
        220,
        75,
        0.45
      ) !important;

    z-index: 5 !important;

    animation:
      madhaDiamondPulse
      2.8s
      ease-in-out
      infinite !important;
  }



  /* =======================================================
     10. DIAMOND ANIMATION
     ======================================================= */

  @keyframes madhaDiamondPulse {

    0%,
    100% {

      box-shadow:
        0 0 4px rgba(
          255,
          215,
          65,
          0.40
        );
    }

    50% {

      box-shadow:
        0 0 8px rgba(
          255,
          225,
          90,
          0.80
        ),

        0 0 12px rgba(
          255,
          195,
          30,
          0.30
        );
    }
  }



  /* =======================================================
     11. REMOVE WHITE SHINE COMPLETELY
     ======================================================= */

  .premium-divider::after {

    content: none !important;

    display: none !important;

    animation: none !important;

    background: none !important;

    box-shadow: none !important;
  }



  /* =======================================================
     12. MENU AREA
     ======================================================= */

  .nav-links {

    flex: 1 1 auto !important;

    width: auto !important;

    min-width: 0 !important;

    max-width: none !important;

    height: 100% !important;

    display: flex !important;

    align-items: center !important;

    justify-content: center !important;

    /*
      Even menu spacing
    */

    gap: clamp(
      2px,
      0.45vw,
      9px
    ) !important;

    padding-left: clamp(
      5px,
      0.6vw,
      12px
    ) !important;

    padding-right: clamp(
      5px,
      0.6vw,
      12px
    ) !important;

    margin: 0 !important;

    flex-wrap: nowrap !important;

    white-space: nowrap !important;

    overflow: visible !important;

    box-sizing: border-box !important;

    position: relative !important;

    z-index: 30 !important;
  }



  /* =======================================================
     13. MENU ITEMS
     ======================================================= */

  .nav-root.transparent .nav-item,

  .nav-root.solid .nav-item {

    flex: 0 0 auto !important;

    min-width: 0 !important;

    padding-top: 7px !important;

    padding-bottom: 7px !important;

    /*
      Equal left/right spacing
    */

    padding-left: clamp(
      6px,
      0.40vw,
      10px
    ) !important;

    padding-right: clamp(
      6px,
      0.40vw,
      10px
    ) !important;

    margin: 0 !important;

    font-size: clamp(
      13px,
      0.80vw,
      16px
    ) !important;

    font-weight: 500 !important;

    line-height: 1 !important;

    white-space: nowrap !important;

    box-sizing: border-box !important;
  }



  /* =======================================================
     14. ABOUT US ARROW
     ======================================================= */

  .nav-item-chevron {

    width: 7px !important;

    height: 7px !important;

    margin-left: 3px !important;

    flex-shrink: 0 !important;
  }



  /* =======================================================
     15. ACTIVE MENU UNDERLINE
     ======================================================= */

  .nav-item::after {

    left: 4px !important;

    right: 4px !important;
  }



  /* =======================================================
     16. APPLY NOW CONTAINER
     ======================================================= */

  .nav-right {

    flex: 0 0 auto !important;

    width: auto !important;

    min-width: 0 !important;

    display: flex !important;

    align-items: center !important;

    justify-content: flex-end !important;

    margin: 0 !important;

    /*
      Small separation from menu
    */

    padding-left: 10px !important;

    padding-right: 0 !important;

    gap: 5px !important;

    position: relative !important;

    z-index: 60 !important;

    box-sizing: border-box !important;
  }



  /* =======================================================
     17. APPLY NOW
     TRANSPARENT HEADER
     ======================================================= */

  .nav-root.transparent .btn-apply {

    width: clamp(
      100px,
      6.8vw,
      116px
    ) !important;

    height: clamp(
      38px,
      2.7vw,
      44px
    ) !important;

    padding:
      6px 11px !important;

    font-size: clamp(
      11px,
      0.75vw,
      14px
    ) !important;

    font-weight: 600 !important;

    gap: 4px !important;

    transform: none !important;

    white-space: nowrap !important;

    box-sizing: border-box !important;
  }



  /* =======================================================
     18. APPLY NOW
     WHITE / SOLID HEADER
     ======================================================= */

  .nav-root.solid .btn-apply {

    width: clamp(
      100px,
      6.5vw,
      112px
    ) !important;

    height: clamp(
      37px,
      2.6vw,
      42px
    ) !important;

    padding:
      6px 10px !important;

    font-size: clamp(
      10px,
      0.72vw,
      13px
    ) !important;

    font-weight: 600 !important;

    gap: 4px !important;

    transform: none !important;

    white-space: nowrap !important;

    box-sizing: border-box !important;
  }



  /* =======================================================
     19. APPLY BUTTON ICON
     ======================================================= */

  .btn-apply svg,

  .btn-apply i {

    width: 13px !important;

    height: 13px !important;

    flex-shrink: 0 !important;
  }



  /* =======================================================
     20. WHITE / SOLID HEADER MARGIN
     =======================================================

     This gives the white header the slightly
     inward appearance from your reference image.
     ======================================================= */

  .nav-root.solid {

    margin-left: clamp(
      0px,
      0.6vw,
      10px
    ) !important;

    margin-right: clamp(
      0px,
      0.6vw,
      10px
    ) !important;

    width: calc(
      100% -
      clamp(
        0px,
        1.2vw,
        20px
      )
    ) !important;

    box-sizing: border-box !important;
  }



  /* =======================================================
     21. SOLID HEADER INNER PADDING
     ======================================================= */

  .nav-root.solid .nav-inner {

    padding-left: clamp(
      28px,
      3.3vw,
      60px
    ) !important;

    padding-right: clamp(
      28px,
      3.3vw,
      60px
    ) !important;

    box-sizing: border-box !important;
  }



  /* =======================================================
     22. SOLID HEADER BRAND
     ======================================================= */

  .nav-root.solid .nav-brand {

    z-index: 50 !important;
  }



  /* =======================================================
     23. SOLID HEADER TITLE
     ======================================================= */

  .nav-root.solid .nav-college-name {

    white-space: nowrap !important;

    overflow: visible !important;

    max-width: 100% !important;
  }



  /* =======================================================
     24. SOLID HEADER RIBBON
     ======================================================= */

  .nav-root.solid .premium-divider {

    margin-top: 4px !important;

    box-shadow: none !important;
  }



  /* =======================================================
     25. SOLID HEADER MENU
     ======================================================= */

  .nav-root.solid .nav-links {

    gap: clamp(
      2px,
      0.45vw,
      9px
    ) !important;
  }



  /* =======================================================
     26. FINAL BRAND PROTECTION
     ======================================================= */

  .nav-brand,
  .nav-brand-text,
  .nav-links,
  .nav-right {

    box-sizing: border-box !important;
  }



  /* =======================================================
     27. BRAND ALWAYS ABOVE MENU
     ======================================================= */

  .nav-brand {

    isolation: isolate !important;

    z-index: 50 !important;
  }



  .nav-brand-text {

    isolation: isolate !important;

    z-index: 55 !important;
  }



  .nav-links {

    z-index: 30 !important;
  }



  .nav-right {

    z-index: 60 !important;
  }



  /* =======================================================
     28. HAMBURGER
     ======================================================= */

  .nav-hamburger {

    display: none !important;
  }



  /* =======================================================
     29. PREVENT HORIZONTAL OVERFLOW
     ======================================================= */

  .nav-root,
  .nav-inner {

    max-width: 100vw !important;

    box-sizing: border-box !important;
  }

}
  /* =========================================================
   LAPTOP — GOLD RIBBON POSITION + WHITE SHINE
   ========================================================= */


/* ---------------------------------------------------------
   COLLEGE TITLE CONTAINER
   Makes title and ribbon use the same center
   --------------------------------------------------------- */

.nav-brand-text {

  display: flex !important;

  flex-direction: column !important;

  align-items: center !important;

  justify-content: center !important;

  width: max-content !important;

  min-width: 0 !important;

  max-width: none !important;

  overflow: visible !important;

}


/* ---------------------------------------------------------
   COLLEGE TITLE
   --------------------------------------------------------- */

.nav-college-name,
.nav-root.transparent .nav-college-name,
.nav-root.solid .nav-college-name {

  display: block !important;

  width: max-content !important;

  max-width: none !important;

  margin: 0 !important;

  padding: 0 !important;

  white-space: nowrap !important;

  overflow: visible !important;

  text-overflow: clip !important;

}


/* ---------------------------------------------------------
   GOLD RIBBON
   CENTERED EXACTLY UNDER THE COLLEGE TITLE
   --------------------------------------------------------- */

.premium-divider {

  position: relative !important;

  /*
     Ribbon width
  */
  width: clamp(
    220px,
    18vw,
    275px
  ) !important;

  max-width: 275px !important;

  height: 13px !important;

  /*
     Move ribbon slightly down from title
  */
  margin-top: 5px !important;

  /*
     EXACT CENTER
  */
  margin-left: auto !important;

  margin-right: auto !important;

  margin-bottom: 0 !important;

  display: block !important;

  /*
     IMPORTANT:
     Shine stays inside the ribbon
  */
  overflow: hidden !important;

  /*
     GOLD RIBBON
  */
  background:
    linear-gradient(
      90deg,

      #806000 0%,

      #a97900 10%,

      #d3a51a 25%,

      #f0cf52 50%,

      #d3a51a 75%,

      #a97900 90%,

      #806000 100%
    )

    center center /

    100% 3px

    no-repeat !important;

  /*
     NO RIBBON SHADOW
  */
  box-shadow: none !important;

  border-radius: 10px !important;

}


/* ---------------------------------------------------------
   CENTER GOLD DIAMOND
   --------------------------------------------------------- */

.premium-divider::before {

  content: "" !important;

  position: absolute !important;

  left: 50% !important;

  top: 50% !important;

  width: 14px !important;

  height: 14px !important;

  transform:
    translate(-50%, -50%)
    rotate(45deg) !important;

  background:
    linear-gradient(
      135deg,

      #fff1a3 0%,

      #f0cc4c 30%,

      #d2a00b 60%,

      #8b6200 100%
    ) !important;

  border: 1px solid #f6d45a !important;

  border-radius: 1px !important;

  /*
     Diamond glow only
  */
  box-shadow:
    0 0 5px rgba(
      255,
      220,
      75,
      0.45
    ) !important;

  z-index: 3 !important;

  animation:
    madhaDiamondPulse
    2.8s
    ease-in-out
    infinite !important;

}


/* ---------------------------------------------------------
   WHITE SHINE
   ONLY MOVES OVER THE GOLD RIBBON
   --------------------------------------------------------- */

.premium-divider::after {

  content: "" !important;

  position: absolute !important;

  top: 50% !important;

  left: -35% !important;

  width: 30% !important;

  height: 3px !important;

  transform:
    translateY(-50%)
    skewX(-20deg) !important;

  /*
     WHITE SHINE
  */
  background:
    linear-gradient(
      90deg,

      transparent 0%,

      rgba(
        255,
        255,
        255,
        0.15
      ) 15%,

      rgba(
        255,
        255,
        255,
        0.95
      ) 50%,

      rgba(
        255,
        255,
        255,
        0.15
      ) 85%,

      transparent 100%
    ) !important;

  /*
     NO SHADOW
  */
  box-shadow: none !important;

  border-radius: 10px !important;

  pointer-events: none !important;

  /*
     Above gold ribbon,
     below diamond
  */
  z-index: 2 !important;

  /*
     Continuous moving shine
  */
  animation:
    madhaRibbonShine
    3.2s
    ease-in-out
    infinite !important;

}


/* ---------------------------------------------------------
   SHINE ANIMATION
   LEFT → RIGHT
   --------------------------------------------------------- */

@keyframes madhaRibbonShine {

  0% {

    left: -35%;

    opacity: 0;

  }

  10% {

    opacity: 1;

  }

  50% {

    left: 105%;

    opacity: 1;

  }

  60% {

    left: 105%;

    opacity: 0;

  }

  100% {

    left: 105%;

    opacity: 0;

  }

}


/* ---------------------------------------------------------
   DIAMOND ANIMATION
   --------------------------------------------------------- */

@keyframes madhaDiamondPulse {

  0%,
  100% {

    box-shadow:
      0 0 4px rgba(
        255,
        215,
        65,
        0.40
      );

  }

  50% {

    box-shadow:
      0 0 8px rgba(
        255,
        225,
        90,
        0.80
      ),

      0 0 12px rgba(
        255,
        195,
        30,
        0.30
      );

  }

}
  /* =========================================================
   LAPTOP — GOLD RIBBON POSITION + WHITE SHINE
   ========================================================= */


/* ---------------------------------------------------------
   COLLEGE TITLE CONTAINER
   Makes title and ribbon use the same center
   --------------------------------------------------------- */

.nav-brand-text {

  display: flex !important;

  flex-direction: column !important;

  align-items: center !important;

  justify-content: center !important;

  width: max-content !important;

  min-width: 0 !important;

  max-width: none !important;

  overflow: visible !important;

}


/* ---------------------------------------------------------
   COLLEGE TITLE
   --------------------------------------------------------- */

.nav-college-name,
.nav-root.transparent .nav-college-name,
.nav-root.solid .nav-college-name {

  display: block !important;

  width: max-content !important;

  max-width: none !important;

  margin: 0 !important;

  padding: 0 !important;

  white-space: nowrap !important;

  overflow: visible !important;

  text-overflow: clip !important;

}


/* ---------------------------------------------------------
   GOLD RIBBON
   CENTERED EXACTLY UNDER THE COLLEGE TITLE
   --------------------------------------------------------- */

.premium-divider {

  position: relative !important;

  /*
     Ribbon width
  */
  width: clamp(
    220px,
    18vw,
    275px
  ) !important;

  max-width: 275px !important;

  height: 13px !important;

  /*
     Move ribbon slightly down from title
  */
  margin-top: 5px !important;

  /*
     EXACT CENTER
  */
  margin-left: auto !important;

  margin-right: auto !important;

  margin-bottom: 0 !important;

  display: block !important;

  /*
     IMPORTANT:
     Shine stays inside the ribbon
  */
  overflow: hidden !important;

  /*
     GOLD RIBBON
  */
  background:
    linear-gradient(
      90deg,

      #806000 0%,

      #a97900 10%,

      #d3a51a 25%,

      #f0cf52 50%,

      #d3a51a 75%,

      #a97900 90%,

      #806000 100%
    )

    center center /

    100% 3px

    no-repeat !important;

  /*
     NO RIBBON SHADOW
  */
  box-shadow: none !important;

  border-radius: 10px !important;

}


/* ---------------------------------------------------------
   CENTER GOLD DIAMOND
   --------------------------------------------------------- */

.premium-divider::before {

  content: "" !important;

  position: absolute !important;

  left: 50% !important;

  top: 50% !important;

  width: 14px !important;

  height: 14px !important;

  transform:
    translate(-50%, -50%)
    rotate(45deg) !important;

  background:
    linear-gradient(
      135deg,

      #fff1a3 0%,

      #f0cc4c 30%,

      #d2a00b 60%,

      #8b6200 100%
    ) !important;

  border: 1px solid #f6d45a !important;

  border-radius: 1px !important;

  /*
     Diamond glow only
  */
  box-shadow:
    0 0 5px rgba(
      255,
      220,
      75,
      0.45
    ) !important;

  z-index: 3 !important;

  animation:
    madhaDiamondPulse
    2.8s
    ease-in-out
    infinite !important;

}


/* ---------------------------------------------------------
   WHITE SHINE
   ONLY MOVES OVER THE GOLD RIBBON
   --------------------------------------------------------- */

.premium-divider::after {

  content: "" !important;

  position: absolute !important;

  top: 50% !important;

  left: -35% !important;

  width: 30% !important;

  height: 3px !important;

  transform:
    translateY(-50%)
    skewX(-20deg) !important;

  /*
     WHITE SHINE
  */
  background:
    linear-gradient(
      90deg,

      transparent 0%,

      rgba(
        255,
        255,
        255,
        0.15
      ) 15%,

      rgba(
        255,
        255,
        255,
        0.95
      ) 50%,

      rgba(
        255,
        255,
        255,
        0.15
      ) 85%,

      transparent 100%
    ) !important;

  /*
     NO SHADOW
  */
  box-shadow: none !important;

  border-radius: 10px !important;

  pointer-events: none !important;

  /*
     Above gold ribbon,
     below diamond
  */
  z-index: 2 !important;

  /*
     Continuous moving shine
  */
  animation:
    madhaRibbonShine
    3.2s
    ease-in-out
    infinite !important;

}


/* ---------------------------------------------------------
   SHINE ANIMATION
   LEFT → RIGHT
   --------------------------------------------------------- */

@keyframes madhaRibbonShine {

  0% {

    left: -35%;

    opacity: 0;

  }

  10% {

    opacity: 1;

  }

  50% {

    left: 105%;

    opacity: 1;

  }

  60% {

    left: 105%;

    opacity: 0;

  }

  100% {

    left: 105%;

    opacity: 0;

  }

}


/* ---------------------------------------------------------
   DIAMOND ANIMATION
   --------------------------------------------------------- */

@keyframes madhaDiamondPulse {

  0%,
  100% {

    box-shadow:
      0 0 4px rgba(
        255,
        215,
        65,
        0.40
      );

  }

  50% {

    box-shadow:
      0 0 8px rgba(
        255,
        225,
        90,
        0.80
      ),

      0 0 12px rgba(
        255,
        195,
        30,
        0.30
      );

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
