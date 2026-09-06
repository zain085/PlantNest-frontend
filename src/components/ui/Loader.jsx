export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-accent/15" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin" />
      </div>
      <p className="text-sm">{label}</p>
    </div>
  )
}
