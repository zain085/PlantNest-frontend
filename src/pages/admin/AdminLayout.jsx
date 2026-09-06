import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import AdminSidebar from "../../components/admin/AdminSidebar.jsx"
import AdminTopbar from "../../components/admin/AdminTopbar.jsx"

const titles = {
  "/admin": "Dashboard Overview",
  "/admin/plants": "Manage Plants",
  "/admin/accessories": "Manage Accessories",
  "/admin/categories": "Manage Categories",
  "/admin/orders": "Order Management",
  "/admin/reviews": "Reviews & Ratings",
  "/admin/feedback": "Site Feedback",
  "/admin/users": "Registered Users",
}

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const title = titles[location.pathname] || "PlantNest Admin"

  return (
    <div className="min-h-screen bg-bgmain">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`transition-all duration-300 ${collapsed ? "pl-[76px]" : "pl-64"}`}>
        <AdminTopbar title={title} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
