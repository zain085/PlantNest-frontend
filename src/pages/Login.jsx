import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import toast from "react-hot-toast"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { useAuth } from "../context/AuthContext.jsx"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await login(form)
      toast.success(`Welcome back, ${user.username}!`)
      navigate(location.state?.from?.pathname || (user.role === "admin" ? "/admin" : "/"))
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section-pad mx-auto flex min-h-[80vh] max-w-md flex-col justify-center py-16">
      <div className="card-surface p-8">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-light text-accent">
            <LogIn size={22} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold text-primary">Welcome back</h1>
          <p className="mt-1 text-sm text-muted">Log in to manage your orders and wishlist.</p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3.5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/70">Email or username</label>
            <input
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="input-field"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/70">Password</label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="input-field pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button disabled={loading} className="btn-primary mt-2">
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          New to PlantNest?{" "}
          <Link to="/register" className="font-semibold text-accent hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
