import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function CategoryFormModal({ open, onClose, onSubmit, initial, saving }) {
  const [category, setCategory] = useState("")

  useEffect(() => {
    setCategory(initial?.category || "")
  }, [initial, open])

  if (!open) return null

  const submit = (e) => {
    e.preventDefault()
    onSubmit({ category })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-primary/30 backdrop-blur-sm" />
      <div className="animate-scale-in relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-glass">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-primary">{initial ? "Edit" : "Add"} Category</h3>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary/6">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            required
            placeholder="Category name (e.g. Flowering)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          />
          <button disabled={saving} className="btn-primary">
            {saving ? "Saving..." : initial ? "Save Changes" : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  )
}
