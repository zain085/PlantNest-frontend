import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { getAccessories, createAccessory, updateAccessory, deleteAccessory } from "../../api/accessories.api.js"
import { getCategories } from "../../api/categories.api.js"
import ProductFormModal from "../../components/admin/ProductFormModal.jsx"
import ConfirmDialog from "../../components/admin/ConfirmDialog.jsx"
import Loader from "../../components/ui/Loader.jsx"
import { formatPrice, getItemImage, capitalize } from "../../utils/format.js"

export default function Accessories() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const [res, catRes] = await Promise.all([getAccessories(), getCategories()])
      setItems(res.data.accessories)
      setCategories(catRes.data.categories)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (formData) => {
    setSaving(true)
    try {
      if (editing) {
        await updateAccessory(editing._id, formData)
        toast.success("Accessory updated")
      } else {
        await createAccessory(formData)
        toast.success("Accessory added")
      }
      setModalOpen(false)
      setEditing(null)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save accessory")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteAccessory(deleteTarget._id)
      toast.success("Accessory deleted")
      setDeleteTarget(null)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete accessory")
    } finally {
      setDeleting(false)
    }
  }

  const filtered = items.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  if (loading) return <Loader label="Loading accessories..." />

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search accessories..." className="input-field w-64 !py-2 pl-9 text-sm" />
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true) }} className="btn-primary !py-2.5">
          <Plus size={16} /> Add Accessory
        </button>
      </div>

      <div className="card-surface overflow-x-auto p-2">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p._id} className="border-t border-primary/6">
                <td className="flex items-center gap-3 px-4 py-3">
                  <img src={getItemImage(p)} alt="" className="h-10 w-10 rounded-xl object-cover" />
                  <span className="line-clamp-1 font-medium text-ink">{p.name}</span>
                </td>
                <td className="px-4 py-3 text-ink/70">{capitalize(p.category?.category || "—")}</td>
                <td className="px-4 py-3 text-ink/70">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.stock > 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
                    {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink/70">{p.avgRating ? p.avgRating.toFixed(1) : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => { setEditing(p); setModalOpen(true) }} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent-light hover:text-primary">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleteTarget(p)} className="flex h-8 w-8 items-center justify-center rounded-full text-danger hover:bg-danger/10">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-8 text-center text-sm text-muted">No accessories found.</p>}
      </div>

      <ProductFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        onSubmit={handleSubmit}
        categories={categories}
        initial={editing}
        type="accessory"
        saving={saving}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this accessory?"
        description={`"${deleteTarget?.name}" will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
