import { useState, useEffect } from "react"
import { X, Upload } from "lucide-react"
import { capitalize } from "../../utils/format.js"

const emptyForm = {
  name: "", price: "", discount: "", stock: "", category: "", description: "",
  species: "", careLevel: "easy", wateringSchedule: "", sunlight: "", temperature: "",
}

export default function ProductFormModal({ open, onClose, onSubmit, categories, initial, type, saving }) {
  const [form, setForm] = useState(emptyForm)
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        price: initial.price || "",
        discount: initial.discount || "",
        stock: initial.stock || "",
        category: initial.category?._id || initial.category || "",
        description: initial.description || "",
        species: initial.species || "",
        careLevel: initial.careLevel || "easy",
        wateringSchedule: initial.wateringSchedule || "",
        sunlight: initial.sunlight || "",
        temperature: initial.temperature || "",
      })
      setPreviews(initial.images || [])
    } else {
      setForm(emptyForm)
      setPreviews([])
    }
    setFiles([])
  }, [initial, open])

  if (!open) return null

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || [])
    setFiles(selected)
    setPreviews(selected.map((f) => URL.createObjectURL(f)))
  }

  const submit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(form).forEach(([k, v]) => {
      if (type === "accessory" && ["species", "careLevel", "wateringSchedule", "sunlight", "temperature"].includes(k)) return
      formData.append(k, v)
    })
    files.forEach((f) => formData.append("images", f))
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-primary/30 backdrop-blur-sm" />
      <div className="animate-scale-in relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-glass">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-primary">
            {initial ? "Edit" : "Add New"} {capitalize(type)}
          </h3>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary/6">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3.5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/70">Images</label>
            <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-primary/25 bg-accent-light/40 px-4 py-3 text-xs text-primary">
              <Upload size={15} /> Upload up to 5 images
              <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
            </label>
            {previews.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {previews.map((src, idx) => (
                  <img key={idx} src={src} alt="" className="h-16 w-16 rounded-xl object-cover" />
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            <input required placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="input-field" />
            <select required value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="input-field">
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{capitalize(c.category)}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-3">
            <input required type="number" placeholder="Price" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="input-field" />
            <input type="number" placeholder="Discount %" value={form.discount} onChange={(e) => setForm((f) => ({ ...f, discount: e.target.value }))} className="input-field" />
            <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} className="input-field" />
          </div>

          <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="input-field resize-none" />

          {type === "plant" && (
            <>
              <input placeholder="Species (optional)" value={form.species} onChange={(e) => setForm((f) => ({ ...f, species: e.target.value }))} className="input-field" />
              <div className="grid gap-3.5 sm:grid-cols-2">
                <select value={form.careLevel} onChange={(e) => setForm((f) => ({ ...f, careLevel: e.target.value }))} className="input-field">
                  <option value="easy">Easy care</option>
                  <option value="moderate">Moderate care</option>
                  <option value="demanding">Demanding care</option>
                </select>
                <input placeholder="Watering schedule" value={form.wateringSchedule} onChange={(e) => setForm((f) => ({ ...f, wateringSchedule: e.target.value }))} className="input-field" />
                <input placeholder="Sunlight needs" value={form.sunlight} onChange={(e) => setForm((f) => ({ ...f, sunlight: e.target.value }))} className="input-field" />
                <input placeholder="Temperature range" value={form.temperature} onChange={(e) => setForm((f) => ({ ...f, temperature: e.target.value }))} className="input-field" />
              </div>
            </>
          )}

          <button disabled={saving} className="btn-primary mt-2">
            {saving ? "Saving..." : initial ? "Save Changes" : `Add ${capitalize(type)}`}
          </button>
        </form>
      </div>
    </div>
  )
}
