import type { ReactNode } from 'react'

export default function WowheadLink({
  type,
  id,
  children,
  className,
}: {
  type: 'quest' | 'achievement'
  id: number
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={`https://www.wowhead.com/${type}=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}
