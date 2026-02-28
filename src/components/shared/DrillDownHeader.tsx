import type { ReactNode } from 'react'

export default function DrillDownHeader({
  image,
  children,
}: {
  image: string
  children: ReactNode
}) {
  return (
    <header className="relative h-[200px] overflow-hidden">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/[0.73] to-bg-deep/[0.93]" />
      <div className="relative flex h-full flex-col justify-end gap-2.5 px-6 py-8 sm:px-10">
        {children}
      </div>
    </header>
  )
}
