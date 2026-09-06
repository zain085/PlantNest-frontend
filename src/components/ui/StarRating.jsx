import { Star } from "lucide-react"

export default function StarRating({ value = 0, count, size = 14, showValue = false }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            className={n <= Math.round(value) ? "fill-clay text-clay" : "fill-transparent text-primary/15"}
          />
        ))}
      </div>
      {showValue && <span className="text-xs text-muted">{value ? value.toFixed(1) : "New"}</span>}
      {typeof count === "number" && <span className="text-xs text-muted">({count})</span>}
    </div>
  )
}
