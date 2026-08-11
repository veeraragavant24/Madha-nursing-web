import { useIntersect } from '../hooks/useIntersect'
import type { ReactNode } from 'react'

export type RevealType = 'up' | 'left' | 'right' | 'scale'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  type?: RevealType
}

/**
 * Shared scroll-reveal wrapper.
 * Fades/slides children in once they enter the viewport using IntersectionObserver.
 * Renders a plain <div> so layout is identical to the pre-existing local Reveal helpers.
 */
export default function Reveal({ children, className = '', delay = 0, type = 'up' }: RevealProps) {
  const { ref, visible } = useIntersect()
  const cls = type === 'left' ? 'reveal-left' : type === 'right' ? 'reveal-right' : type === 'scale' ? 'reveal-scale' : 'reveal'
  return (
    <div ref={ref} className={`${cls} ${visible ? 'visible' : ''} ${delay ? `delay-${delay}` : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}
