import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { UserPlus, Upload } from "lucide-react"
import { useAuth } from "../context/AuthContext.jsx"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "", fullName: "", email: "", contactNumber: "", age: "", city: "", password: "", confirmPassword: "",
  })
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.username.trim()) next.username = "Username is required"
    if (!emailRegex.test(form.email)) next.email = "Enter a valid email address"
    if (!form.contactNumber.trim()) next.contactNumber = "Contact number is required"
    if (form.password.length < 6) next.password = "Password must be at least 6 characters"
    if (form.password !== form.confirmPassword) next.confirmPassword = "Passwords don't match"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleAvatar = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatar(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (k !== "confirmPassword") formData.append(k, v)
      })
      if (avatar) formData.append("avatar", avatar)

      const user = await register(formData)
      toast.success(`Welcome to PlantNest, ${user.username}!`)
      navigate("/")
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section-pad mx-auto flex min-h-[80vh] max-w-lg flex-col justify-center py-16">
      <div className="card-surface p-8">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-light text-accent">
            <UserPlus size={22} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold text-primary">Create your account</h1>
          <p className="mt-1 text-sm text-muted">Join PlantNest and start building your garden.</p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3.5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dashed border-primary/25 bg-accent-light">
              {avatarPreview ? (
                <img src={avatarPreview} alt="" className="h-full w-full object-cover" />
              ) : (
                <Upload size={18} className="text-primary/50" />
              )}
            </div>
            <label className="btn-secondary cursor-pointer !py-2 text-xs">
              Upload photo (optional)
              <input type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <input placeholder="Username" value={form.username} onChange={onChange("username")} className="input-field" />
              {errors.username && <p className="mt-1 text-xs text-danger">{errors.username}</p>}
            </div>
            <div>
              <input placeholder="Full name" value={form.fullName} onChange={onChange("fullName")} className="input-field" />
            </div>
          </div>

          <div>
            <input placeholder="Email address" value={form.email} onChange={onChange("email")} className="input-field" />
            {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <input placeholder="Contact number" value={form.contactNumber} onChange={onChange("contactNumber")} className="input-field" />
              {errors.contactNumber && <p className="mt-1 text-xs text-danger">{errors.contactNumber}</p>}
            </div>
            <input placeholder="City" value={form.city} onChange={onChange("city")} className="input-field" />
          </div>

          <input type="number" placeholder="Age (optional)" value={form.age} onChange={onChange("age")} className="input-field" />

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <input type="password" placeholder="Password" value={form.password} onChange={onChange("password")} className="input-field" />
              {errors.password && <p className="mt-1 text-xs text-danger">{errors.password}</p>}
            </div>
            <div>
              <input type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={onChange("confirmPassword")} className="input-field" />
              {errors.confirmPassword && <p className="mt-1 text-xs text-danger">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button disabled={loading} className="btn-primary mt-2">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-accent hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
