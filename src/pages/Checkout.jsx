import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"
import { CheckCircle2 } from "lucide-react"
import { useCart } from "../context/CartContext.jsx"
import { checkout } from "../api/orders.api.js"
import { formatPrice, discountedPrice, getItemImage } from "../utils/format.js"
import EmptyState from "../components/ui/EmptyState.jsx"

export default function Checkout() {
  const { cart, refreshCart } = useCart()
  const navigate = useNavigate()
  const items = cart.items || []

  const [address, setAddress] = useState({ line1: "", city: "", contactNumber: "" })
  const [placing, setPlacing] = useState(false)
  const [placedOrder, setPlacedOrder] = useState(null)

  const subtotal = items.reduce((sum, i) => sum + discountedPrice(i.item?.price, i.item?.discount) * i.quantity, 0)
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 10
  const total = subtotal + shipping

  const placeOrder = async (e) => {
    e.preventDefault()
    setPlacing(true)
    try {
      const { data } = await checkout({ address })
      setPlacedOrder(data.order)
      await refreshCart()
      toast.success("Order placed!")
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not place order")
    } finally {
      setPlacing(false)
    }
  }

  if (placedOrder) {
    return (
      <div className="section-pad mx-auto max-w-xl py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-light text-accent">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold text-primary">Order placed!</h1>
        <p className="mt-2 text-sm text-muted">
          Order <span className="font-semibold text-ink">{placedOrder.orderNo}</span> is confirmed. Total charged: {formatPrice(placedOrder.total)}.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/dashboard/orders" className="btn-primary">View My Orders</Link>
          <Link to="/catalog" className="btn-secondary">Keep Shopping</Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="section-pad mx-auto max-w-3xl py-16">
        <EmptyState
          title="Nothing to check out"
          description="Add a few plants or accessories to your cart first."
          action={<Link to="/catalog" className="btn-primary">Shop Plants</Link>}
        />
      </div>
    )
  }

  return (
    <div className="section-pad mx-auto max-w-6xl py-10">
      <h1 className="font-display text-3xl font-semibold text-primary">Checkout</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={placeOrder} className="card-surface p-6">
          <h3 className="font-display text-lg font-semibold text-primary">Delivery Details</h3>
          <div className="mt-4 flex flex-col gap-3">
            <input
              required
              placeholder="Street address"
              value={address.line1}
              onChange={(e) => setAddress((a) => ({ ...a, line1: e.target.value }))}
              className="input-field"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                className="input-field"
              />
              <input
                required
                placeholder="Contact number"
                value={address.contactNumber}
                onChange={(e) => setAddress((a) => ({ ...a, contactNumber: e.target.value }))}
                className="input-field"
              />
            </div>
          </div>
          <p className="mt-4 rounded-2xl bg-accent-light/60 p-3 text-xs text-primary/80">
            This project covers cart-to-order flow only — online payment isn't part of the current scope, so orders
            are placed as cash-on-delivery style confirmations.
          </p>
          <button disabled={placing} className="btn-primary mt-5 w-full">
            {placing ? "Placing order..." : `Place Order — ${formatPrice(total)}`}
          </button>
        </form>

        <div className="card-surface h-fit p-6">
          <h3 className="font-display text-lg font-semibold text-primary">Order Summary</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((i) => (
              <li key={i._id} className="flex items-center gap-3">
                <img src={getItemImage(i.item)} alt="" className="h-12 w-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-ink">{i.item?.name}</p>
                  <p className="text-xs text-muted">Qty {i.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-primary">
                  {formatPrice(discountedPrice(i.item?.price, i.item?.discount) * i.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-primary/8 pt-4 text-sm">
            <div className="flex justify-between text-ink/70"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-ink/70"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between text-base font-semibold text-primary"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
