import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getAllOrders, updateOrderStatus } from "../../api/orders.api.js"
import Loader from "../../components/ui/Loader.jsx"
import { formatPrice, statusStyles } from "../../utils/format.js"

const statuses = ["pending", "confirmed", "on the way", "delivered", "cancelled"]

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("")

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await getAllOrders(filter ? { status: filter } : {})
      setOrders(data.orders)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const changeStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status)
      toast.success("Order status updated")
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update status")
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter("")} className={`rounded-full px-4 py-2 text-xs font-semibold ${!filter ? "bg-primary text-white" : "bg-white text-ink/70"}`}>
          All
        </button>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-2 text-xs font-semibold capitalize ${filter === s ? "bg-primary text-white" : "bg-white text-ink/70"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader label="Loading orders..." />
      ) : (
        <div className="card-surface overflow-x-auto p-2">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-medium">Order No.</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-t border-primary/6">
                  <td className="px-4 py-3 font-medium text-ink">{o.orderNo}</td>
                  <td className="px-4 py-3 text-ink/70">{o.user?.username || "—"}</td>
                  <td className="px-4 py-3 text-ink/70">{o.items.length} item(s)</td>
                  <td className="px-4 py-3 text-ink/70">{formatPrice(o.total)}</td>
                  <td className="px-4 py-3 text-ink/70">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => changeStatus(o._id, e.target.value)}
                      className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[o.status]}`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <p className="p-8 text-center text-sm text-muted">No orders found.</p>}
        </div>
      )}
    </div>
  )
}
