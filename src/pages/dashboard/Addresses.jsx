import { useState } from "react"
import toast from "react-hot-toast"
import { Trash2, Plus, MapPin } from "lucide-react"
import { useAuth } from "../../context/AuthContext.jsx"
import { addAddress, deleteAddress } from "../../api/user.api.js"
import EmptyState from "../../components/ui/EmptyState.jsx"

export default function Addresses() {
  const { user, updateLocalUser } = useAuth()
  const [addresses, setAddresses] = useState(user?.addresses || [])
  const [form, setForm] = useState({ label: "Home", line1: "", city: "", contactNumber: "" })
  const [adding, setAdding] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setAdding(true)
    try {
      const { data } = await addAddress(form)
      setAddresses(data.addresses)
      updateLocalUser({ addresses: data.addresses })
      setForm({ label: "Home", line1: "", city: "", contactNumber: "" })
      toast.success("Address added")
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not add address")
    } finally {
      setAdding(false)
    }
  }

  const remove = async (id) => {
    const { data } = await deleteAddress(id)
    setAddresses(data.addresses)
    updateLocalUser({ addresses: data.addresses })
    toast.success("Address removed")
  }

  return (
    <div className="flex flex-col gap-6">
      {addresses.length === 0 ? (
        <EmptyState title="No saved addresses" description="Add an address to speed up checkout next time." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {addresses.map((a) => (
            <div key={a._id} className="card-surface flex items-start justify-between gap-3 p-5">
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent"><MapPin size={16} /></span>
                <div>
                  <p className="text-sm font-semibold text-ink">{a.label}</p>
                  <p className="text-sm text-muted">{a.line1}, {a.city}</p>
                  <p className="text-xs text-muted">{a.contactNumber}</p>
                </div>
              </div>
              <button onClick={() => remove(a._id)} className="text-muted hover:text-danger"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={submit} className="card-surface p-6">
        <h3 className="font-display text-lg font-semibold text-primary">Add New Address</h3>
        <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
          <input placeholder="Label (e.g. Home, Office)" value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} className="input-field" />
          <input placeholder="Contact number" value={form.contactNumber} onChange={(e) => setForm((f) => ({ ...f, contactNumber: e.target.value }))} className="input-field" />
          <input placeholder="Street address" value={form.line1} onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))} className="input-field sm:col-span-2" />
          <input placeholder="City" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="input-field" />
        </div>
        <button disabled={adding} className="btn-primary mt-4">
          <Plus size={15} /> {adding ? "Adding..." : "Add Address"}
        </button>
      </form>
    </div>
  )
}
