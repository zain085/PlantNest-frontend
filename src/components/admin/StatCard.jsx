export default function StatCard({ label, value, icon: Icon, tone = "primary" }) {
  const tones = {
    primary: "bg-primary text-white",
    accent: "bg-accent text-white",
    clay: "bg-clay text-white",
    warn: "bg-warn text-white",
  }
  return (
    <div className="card-surface flex items-center justify-between p-5">
      <div>
        <p className="text-xs font-medium text-muted">{label}</p>
        <p className="mt-1 font-display text-2xl font-semibold text-ink">{value}</p>
      </div>
      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tones[tone]}`}>
        <Icon size={20} />
      </span>
    </div>
  )
}
