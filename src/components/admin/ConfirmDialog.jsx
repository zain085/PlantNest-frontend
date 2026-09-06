import { AlertTriangle } from "lucide-react"

export default function ConfirmDialog({ open, title, description, onConfirm, onCancel, loading }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onCancel} className="absolute inset-0 bg-primary/30 backdrop-blur-sm" />
      <div className="animate-scale-in relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-glass">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-danger/10 text-danger">
          <AlertTriangle size={20} />
        </span>
        <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1.5 text-sm text-muted">{description}</p>
        <div className="mt-6 flex gap-3">
          <button onClick={onCancel} className="btn-secondary flex-1 !py-2.5">Cancel</button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-full bg-danger px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
