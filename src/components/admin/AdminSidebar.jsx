import { NavLink } from "react-router-dom"
import {
  LayoutDashboard, Sprout, Wrench, Tags, ClipboardList, MessageSquareText, Inbox, Users, ChevronLeft, ChevronRight,
} from "lucide-react"
import Logo from "../ui/Logo.jsx"

const links = [
  { to: "/admin", end: true, label: "Overview", icon: LayoutDashboard },
  { to: "/admin/plants", label: "Plants", icon: Sprout },
  { to: "/admin/accessories", label: "Accessories", icon: Wrench },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/orders", label: "Orders", icon: ClipboardList },
  { to: "/admin/reviews", label: "Reviews", icon: MessageSquareText },
  { to: "/admin/feedback", label: "Feedback", icon: Inbox },
  { to: "/admin/users", label: "Users", icon: Users },
]

export default function AdminSidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-primary text-white/80 transition-all duration-300 ${
        collapsed ? "w-[76px]" : "w-64"
      }`}
    >
      <div className="flex h-[72px] items-center justify-between border-b border-white/8 px-4">
        {!collapsed && <Logo className="[&_span]:text-white [&_span.text-clay]:text-clay" />}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className={`px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/35 ${collapsed && "sr-only"}`}>
          Manage
        </p>
        <div className="flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-accent text-white" : "hover:bg-white/8"
                }`
              }
              title={collapsed ? l.label : undefined}
            >
              <l.icon size={17} className="shrink-0" />
              {!collapsed && l.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className={`border-t border-white/8 p-4 text-xs text-white/40 ${collapsed && "text-center"}`}>
        {collapsed ? "PN" : "PlantNest Admin"}
      </div>
    </aside>
  )
}
