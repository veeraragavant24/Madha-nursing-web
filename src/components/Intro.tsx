import { useEffect, useState } from 'react'

type IntroProps = {
  onComplete: () => void
}

export default function Intro({ onComplete }: IntroProps) {
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    // Keep logo visible for 2 seconds
    const showTimer = setTimeout(() => {
      setClosing(true)
    }, 2000)

    // Finish intro after fade-out
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
          src="public/logos/favico.png"
          alt="Madha College of Nursing"
          className="madha-intro-logo"
        />

        <h1>MADHA COLLEGE OF NURSING</h1>

        <p>Excellence in Nursing Education</p>

      </div>
    </div>
  )
}