import { useState } from "react"
import toast from "react-hot-toast"
import { KeyRound, Save } from "lucide-react"
import { useAuth } from "../../context/AuthContext.jsx"
import { updateProfile, changePassword } from "../../api/auth.api.js"

export default function Profile() {
  const { user, updateLocalUser } = useAuth()
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    contactNumber: user?.contactNumber || "",
    age: user?.age || "",
    city: user?.city || "",
  })
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" })
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  const saveProfile = async (e) => {
    e.preventDefault()
    setSavingProfile(true)
    try {
      const { data } = await updateProfile(form)
      updateLocalUser(data.user)
      toast.success("Profile updated")
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update profile")
    } finally {
      setSavingProfile(false)
    }
  }

  const savePassword = async (e) => {
    e.preventDefault()
    setSavingPassword(true)
    try {
      await changePassword(passwordForm)
      toast.success("Password changed")
      setPasswordForm({ currentPassword: "", newPassword: "" })
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not change password")
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={saveProfile} className="card-surface p-6">
        <h3 className="font-display text-lg font-semibold text-primary">Profile Details</h3>
        <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
          <input placeholder="Full name" value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} className="input-field" />
          <input placeholder="Contact number" value={form.contactNumber} onChange={(e) => setForm((f) => ({ ...f, contactNumber: e.target.value }))} className="input-field" />
          <input type="number" placeholder="Age" value={form.age} onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))} className="input-field" />
          <input placeholder="City" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="input-field" />
        </div>
        <button disabled={savingProfile} className="btn-primary mt-4">
          <Save size={15} /> {savingProfile ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <form onSubmit={savePassword} className="card-surface p-6">
        <h3 className="font-display text-lg font-semibold text-primary">Change Password</h3>
        <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
          <input
            type="password"
            placeholder="Current password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm((f) => ({ ...f, currentPassword: e.target.value }))}
            className="input-field"
          />
          <input
            type="password"
            placeholder="New password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))}
            className="input-field"
          />
        </div>
        <button disabled={savingPassword} className="btn-secondary mt-4">
          <KeyRound size={15} /> {savingPassword ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  )
}
