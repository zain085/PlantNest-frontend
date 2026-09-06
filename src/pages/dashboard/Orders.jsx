import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { getMyOrders, cancelOrder } from "../../api/orders.api.js"
import { formatPrice, statusStyles, capitalize } from "../../utils/format.js"
import Loader from "../../components/ui/Loader.jsx"
import EmptyState from "../../components/ui/EmptyState.jsx"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const { data } = await getMyOrders()
      setOrders(data.orders)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleCancel = async (id) => {
    try {
      await cancelOrder(id)
      toast.success("Order cancelled")
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not cancel order")
    }
  }

  if (loading) return <Loader label="Loading your orders..." />

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Your placed orders will show up here."
        action={<Link to="/catalog" className="btn-primary">Start Shopping</Link>}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((o) => (
        <div key={o._id} className="card-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-display text-sm font-semibold text-ink">{o.orderNo}</p>
              <p className="text-xs text-muted">{new Date(o.createdAt).toLocaleDateString()}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[o.status]}`}>
              {o.status}
            </span>
          </div>
          <ul className="mt-3 flex flex-col gap-1.5 border-t border-primary/6 pt-3">
            {o.items.map((it, idx) => (
              <li key={idx} className="flex justify-between text-sm text-ink/75">
                <span>{it.name} × {it.quantity}</span>
                <span>{formatPrice(it.price * it.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-primary/6 pt-3">
            <span className="font-display text-base font-semibold text-primary">{formatPrice(o.total)}</span>
            {["pending", "confirmed"].includes(o.status) && (
              <button onClick={() => handleCancel(o._id)} className="text-xs font-semibold text-danger hover:underline">
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
