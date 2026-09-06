import { useNavigate } from "react-router-dom"
import { LogOut, Home } from "lucide-react"
import { useAuth } from "../../context/AuthContext.jsx"

export default function AdminTopbar({ title }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-primary/8 bg-bgmain/90 px-6 backdrop-blur">
      <h1 className="font-display text-xl font-semibold text-primary">{title}</h1>
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/")} className="btn-ghost !px-3 text-xs">
          <Home size={14} /> View Store
        </button>
        <div className="flex items-center gap-2.5 rounded-full border border-primary/10 bg-white py-1.5 pl-1.5 pr-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-light font-display text-xs font-semibold text-primary">
            {user?.username?.[0]?.toUpperCase()}
          </span>
          <span className="text-xs font-medium text-ink">{user?.username}</span>
        </div>
        <button
          onClick={() => {
            logout()
            navigate("/")
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full text-primary/70 hover:bg-danger/10 hover:text-danger"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  )
}
