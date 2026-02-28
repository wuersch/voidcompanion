export default function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-bg-deep/60 px-3 py-1.5">
      <span className="text-xs text-text-dim">{label}</span>
      <span className="font-display text-sm font-semibold text-gold-dark">{value}</span>
    </div>
  )
}
