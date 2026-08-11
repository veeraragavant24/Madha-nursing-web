import { useIntersect } from '../hooks/useIntersect'
import type { ReactNode } from 'react'

interface StaggerProps {
  children: ReactNode
  className?: string
  threshold?: number
}

/**
 * Container stagger animation. When the container enters the viewport,
 * direct children reveal one-by-one (60–100ms steps handled in CSS).
 * Use for grids/lists where wrapping each child in <Reveal> is impractical.
 */
export default function Stagger({ children, className = '', threshold = 0.1 }: StaggerProps) {
  const { ref, visible } = useIntersect(threshold)
  return (
    <div ref={ref} className={`stagger ${visible ? 'is-in' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}
