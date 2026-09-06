export default function Badge({ children, tone = "accent" }) {
  const tones = {
    accent: "bg-accent-light text-accent",
    clay: "bg-clay/15 text-clay",
    primary: "bg-primary/10 text-primary",
    danger: "bg-danger/10 text-danger",
    warn: "bg-warn/10 text-warn",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  )
}
