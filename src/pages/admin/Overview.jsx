import { useEffect, useState } from "react"
import { Users, Sprout, ClipboardList, AlertTriangle, DollarSign, Inbox } from "lucide-react"
import { getPlants } from "../../api/plants.api.js"
import { getAccessories } from "../../api/accessories.api.js"
import { getAllOrders } from "../../api/orders.api.js"
import { getAllUsers } from "../../api/user.api.js"
import { getAllFeedback } from "../../api/feedback.api.js"
import StatCard from "../../components/admin/StatCard.jsx"
import { formatPrice, statusStyles } from "../../utils/format.js"
import Loader from "../../components/ui/Loader.jsx"

export default function Overview() {
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    const load = async () => {
      const [plantsRes, accessoriesRes, ordersRes, usersRes, feedbackRes] = await Promise.all([
        getPlants(), getAccessories(), getAllOrders(), getAllUsers(), getAllFeedback(),
      ])
      const plants = plantsRes.data.plants
      const accessories = accessoriesRes.data.accessories
      const orders = ordersRes.data.orders
      const users = usersRes.data.users
      const feedback = feedbackRes.data.feedback

      const totalSales = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0)
      const lowStock = [...plants, ...accessories].filter((p) => p.stock <= 5).length

      setStats({
        totalUsers: users.length,
        totalProducts: plants.length + accessories.length,
        totalOrders: orders.length,
        lowStock,
        totalSales,
        unreadFeedback: feedback.filter((f) => !f.read).length,
      })
      setRecentOrders(orders.slice(0, 6))
    }
    load()
  }, [])

  if (!stats) return <Loader label="Loading dashboard..." />

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Sales" value={formatPrice(stats.totalSales)} icon={DollarSign} tone="accent" />
        <StatCard label="Total Orders" value={stats.totalOrders} icon={ClipboardList} tone="primary" />
        <StatCard label="Total Users" value={stats.totalUsers} icon={Users} tone="clay" />
        <StatCard label="Total Products" value={stats.totalProducts} icon={Sprout} tone="primary" />
        <StatCard label="Low Stock Alerts" value={stats.lowStock} icon={AlertTriangle} tone="warn" />
        <StatCard label="Unread Feedback" value={stats.unreadFeedback} icon={Inbox} tone="accent" />
      </div>

      <div className="card-surface p-5">
        <h3 className="font-display text-lg font-semibold text-primary">Recent Orders</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/8 text-xs uppercase tracking-wide text-muted">
                <th className="pb-3 pr-4 font-medium">Order No.</th>
                <th className="pb-3 pr-4 font-medium">Customer</th>
                <th className="pb-3 pr-4 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o._id} className="border-b border-primary/5">
                  <td className="py-3 pr-4 font-medium text-ink">{o.orderNo}</td>
                  <td className="py-3 pr-4 text-ink/70">{o.user?.username || "—"}</td>
                  <td className="py-3 pr-4 text-ink/70">{formatPrice(o.total)}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${statusStyles[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
