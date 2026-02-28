export default function ProgressBar({
  percent,
  fillColor,
  height = 8,
}: {
  percent: number
  fillColor: string
  height?: number
}) {
  const clamped = Math.max(0, Math.min(100, percent))
  return (
    <div
      className="w-full overflow-hidden rounded-full bg-bg-elevated"
      style={{ height }}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${clamped}%`, backgroundColor: fillColor }}
      />
    </div>
  )
}
