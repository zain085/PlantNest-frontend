import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../api/categories.api.js"
import CategoryFormModal from "../../components/admin/CategoryFormModal.jsx"
import ConfirmDialog from "../../components/admin/ConfirmDialog.jsx"
import Loader from "../../components/ui/Loader.jsx"
import { capitalize } from "../../utils/format.js"

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await getCategories()
      setCategories(data.categories)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (payload) => {
    setSaving(true)
    try {
      if (editing) {
        await updateCategory(editing._id, payload)
        toast.success("Category updated")
      } else {
        await createCategory(payload)
        toast.success("Category added")
      }
      setModalOpen(false)
      setEditing(null)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save category")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteCategory(deleteTarget._id)
      toast.success("Category deleted")
      setDeleteTarget(null)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete category")
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <Loader label="Loading categories..." />

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button onClick={() => { setEditing(null); setModalOpen(true) }} className="btn-primary !py-2.5">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c._id} className="card-surface flex items-center justify-between p-5">
            <span className="font-display text-base font-semibold text-ink">{capitalize(c.category)}</span>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(c); setModalOpen(true) }} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent-light hover:text-primary">
                <Pencil size={14} />
              </button>
              <button onClick={() => setDeleteTarget(c)} className="flex h-8 w-8 items-center justify-center rounded-full text-danger hover:bg-danger/10">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {categories.length === 0 && <p className="text-sm text-muted">No categories yet.</p>}
      </div>

      <CategoryFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        onSubmit={handleSubmit}
        initial={editing}
        saving={saving}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this category?"
        description={`"${capitalize(deleteTarget?.category || "")}" will be removed. Products in this category will need reassigning.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
