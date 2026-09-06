import { NavLink, Outlet } from "react-router-dom"
import { User, PackageSearch, MapPin, Heart } from "lucide-react"
import { useAuth } from "../../context/AuthContext.jsx"

const links = [
  { to: "/dashboard/profile", label: "Profile", icon: User },
  { to: "/dashboard/orders", label: "My Orders", icon: PackageSearch },
  { to: "/dashboard/addresses", label: "Addresses", icon: MapPin },
  { to: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
]

export default function DashboardLayout() {
  const { user } = useAuth()

  return (
    <div className="section-pad mx-auto max-w-6xl py-10">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-primary/12 bg-accent-light">
          {user?.avatar ? (
            <img src={user.avatar} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-lg font-semibold text-primary">{user?.username?.[0]?.toUpperCase()}</span>
          )}
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary">{user?.fullName || user?.username}</h1>
          <p className="text-sm text-muted">{user?.email}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-white" : "bg-white text-ink/70 hover:bg-accent-light"
                }`
              }
            >
              <l.icon size={16} /> {l.label}
            </NavLink>
          ))}
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
