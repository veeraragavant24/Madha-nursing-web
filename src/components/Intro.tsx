import { useEffect, useState } from 'react'

type IntroProps = {
  onComplete: () => void
}

export default function Intro({ onComplete }: IntroProps) {
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    // Logo stays visible for 2 seconds
    const showTimer = setTimeout(() => {
      setClosing(true)
    }, 2000)

    // Intro completely disappears after fade-out
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className={`madha-intro ${closing ? 'closing' : ''}`}>
      <div className="madha-intro-content">

       <div
  style={{
    position: 'relative',
    width: '180px',
    height: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  {/* WHITE GLOW BEHIND LOGO */}
  <div
  style={{
    position: 'absolute',
    width: '180px',
    height: '180px',
    top: '-10px',
    borderRadius: '50%',
    background:
      'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.73) 25%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.06) 65%, transparent 80%)',
    filter: 'blur(10px)',
    pointerEvents: 'none',
  }}
/>

  <img
    src="/logos/mdch-logo (1).png"
    alt="Madha College of Nursing"
    className="madha-intro-logo"
    style={{
      position: 'relative',
      zIndex: 2,
      display: 'block',
      width: '140px',
      height: '140px',
      objectFit: 'contain',
      maxWidth: '80vw',
      visibility: 'visible',
      opacity: 1,
    }}
  />
</div>

       <h1 className="madha-intro-title">
  MADHA COLLEGE OF NURSING
</h1>

       <hr></hr> <p className="madha-intro-tagline">
  Excellence in Nursing Education
</p>
      </div>
    </div>
  )
}