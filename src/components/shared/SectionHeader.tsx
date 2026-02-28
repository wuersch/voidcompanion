export default function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-display text-sm font-semibold tracking-[2px] text-text-primary">
        {label}
      </h2>
      <div className="h-0.5 w-[60px] bg-gold" />
    </div>
  )
}
