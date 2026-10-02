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

      {/* LOAD CINZEL FONT */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap');

        .madha-intro .madha-intro-title {
          font-family: 'Cinzel', serif !important;
          font-weight: 700 !important;
          letter-spacing: 0.08em !important;
        }

        .madha-intro .madha-intro-tagline {
          font-family: 'Cinzel', serif !important;
          font-weight: 500 !important;
          letter-spacing: 0.18em !important;
        }
      `}</style>

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

        <h1
  className="madha-intro-title"
  style={{
    fontFamily: "'Cinzel', serif",
    fontWeight: 700,
    fontSize: '33.5px',
    letterSpacing: '0.08em',
  }}
>
  MADHA COLLEGE OF NURSING
</h1>

        <hr />

        <p
          className="madha-intro-tagline"
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 500,
            letterSpacing: '0.18em',
            
          }}
        >
          Excellence in Nursing Education
        </p>

      </div>
    </div>
  )
}