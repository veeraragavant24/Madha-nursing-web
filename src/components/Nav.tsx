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
  background: #071a36;
  z-index: 2000;
  display: flex;
  align-items: center;

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
  .nav-root.solid {
    top: 30px;
  }
}

  .top-contact-inner {
    padding: 0 12px;
    justify-content: center;
    gap: 35px;
  }

  .top-contact-item {
    font-size: 15px;
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

  top: 42px;
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

  transform: translateX(-50%);

  background: rgba(255, 255, 255, 0.90);
  backdrop-filter: blur(16px) saturate(1.1);
  -webkit-backdrop-filter: blur(16px) saturate(1.1);

  border: 1px solid rgba(255, 255, 255, 0.30);

  box-shadow:
    0 12px 35px rgba(0, 0, 0, 0.12);

  border-radius: 14px;

  z-index: 1900;
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
    opacity: 1;
  }

  85% {
    opacity: 1;
  }

  100% {
    transform: translateX(var(--shine-travel, 500px)) skewX(-20deg);
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
  font-size: 34px;
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
  font-size: 34px;
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
  font-size: 34px;
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

  gap: 0;

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

font-size: 14px;
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
        }
        /* =========================================
   APPLY BUTTON — NORMAL
========================================= */

.nav-root.transparent .btn-apply {
  width: 132px;
  height: 46px;
  padding: 12px;

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
       /* ─────────────────────────────────────
   RESPONSIVE NAVIGATION
───────────────────────────────────── */

@media (max-width: 1400px) {

  .nav-inner {
   
    gap: 0;
    padding: 0 24px;
    align-items: center;
  }

  /* MENU AREA */
  .nav-links {
    display: flex;
    align-items: center;
   justify-content: flex-start;
    width: 100%;
    min-width: 0;
    gap: 0;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: visible;
  }

 

  /* APPLY AREA */
  .nav-right {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 0;
  }

 

  .btn-apply svg {
    width: 11px;
    height: 11px;
  }

  
}

  /* COLLEGE NAME */
  .nav-root.solid .nav-college-name {
    font-size: 24px;
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
.nav-root,
.nav-root.solid {
  left: 0;
  width: 100%;
  transform: none;
}
.nav-inner {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0 18px;
  height: 100%;

 display: flex;
align-items: center;
justify-content: space-between;

  .nav-brand {
    width: fit-content;
    max-width: 100%;
    gap: 14px;
    overflow: hidden;
  }

  .nav-logo-ring {
    width: 74px;
    height: 105px;
  }

  .nav-logo-img {
    width: 78px;
    height: 78px;
  }

  .nav-brand-text {
    min-width: 0;
  }

  .nav-root.transparent .nav-college-name,
  .nav-root.solid .nav-college-name {
    font-size: 25px;
  }

  .nav-college-sub {
    font-size: 9px !important;
  }

  .premium-divider {
    width: 150px;
    height: 4px;
  }

  .premium-divider::before {
    width: 57px;
  }

  .nav-right {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 0;
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
    width: 60px;
    height: 66px;
  }

  .nav-logo-img {
    width: 72px;
    height: 72px;
  }

  .nav-root.transparent .nav-college-name,
  .nav-root.solid .nav-college-name {
    font-size: 21px;
    line-height: 1.08;
    white-space: nowrap;
  }

  .nav-college-sub {
    font-size: 7px !important;
    letter-spacing: .035em;
    white-space: nowrap;
  }

  .premium-divider {
    width: 150px;
    height: 4px;
  }

  .premium-divider::before {
    width: 45px;
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
    width: 54px;
  }

  .nav-logo-img {
    width: 64px;
    height: 64px;
  }

  .nav-root.transparent .nav-college-name,
  .nav-root.solid .nav-college-name {
    font-size: 18px;
  }

  .nav-college-sub {
    font-size: 6.5px !important;
  }

  .premium-divider {
    width: 130px;
    height: 4px;
  }

  .premium-divider::before {
    width: 39px;
  }

  .nav-hamburger {
    width: 36px;
    height: 36px;

    /* FINAL STICKY HEADER ALIGNMENT */
/* =========================================
   STICKY HEADER FINAL ALIGNMENT
========================================= */

/* =========================================
   CONTACT BAR — ALWAYS VISIBLE
========================================= */

.top-contact-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 42px;
  z-index: 2000;
  display: flex;
  align-items: center;
}

.top-contact-inner {
  width: 100%;
  max-width: 1280px;
  height: 42px;
  margin: 0 auto;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
}



.top-address {
  display: inline-flex !important;
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
