import { Leaf } from "lucide-react"

export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-primary/15 bg-white/60 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-accent">
        <Leaf size={26} />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-primary">{title}</h3>
        {description && <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  )
}
