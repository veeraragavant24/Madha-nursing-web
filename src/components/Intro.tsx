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

        <img
  src="/logos/favico.png"
  alt="Madha College of Nursing"
  className="madha-intro-logo"
  style={{
    display: 'block',
    width: '140px',
    height: '140px',
    objectFit: 'contain',
    maxWidth: '80vw',
    visibility: 'visible',
    opacity: 1,
  }}
/>

        <h1>MADHA COLLEGE OF NURSING</h1>

        <p>Excellence in Nursing Education</p>

      </div>
    </div>
  )
}