import { Link } from "react-router-dom"
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react"
import { useCart } from "../context/CartContext.jsx"
import { formatPrice, discountedPrice, getItemImage } from "../utils/format.js"
import EmptyState from "../components/ui/EmptyState.jsx"
import Loader from "../components/ui/Loader.jsx"

export default function CartPage() {
  const { cart, loading, updateItem, removeItem } = useCart()
  const items = cart.items || []

  const subtotal = items.reduce((sum, i) => sum + discountedPrice(i.item?.price, i.item?.discount) * i.quantity, 0)
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 10
  const total = subtotal + shipping

  if (loading) return <Loader label="Loading your cart..." />

  return (
    <div className="section-pad mx-auto max-w-6xl py-10">
      <h1 className="font-display text-3xl font-semibold text-primary">My Cart</h1>

      {items.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Your cart is empty"
            description="Nothing here yet — go find a plant that needs a home."
            action={<Link to="/catalog" className="btn-primary">Shop Plants</Link>}
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <ul className="flex flex-col gap-4">
            {items.map((i) => (
              <li key={i._id} className="card-surface flex gap-4 p-4">
                <img src={getItemImage(i.item)} alt={i.item?.name} className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-base font-semibold text-ink">{i.item?.name}</p>
                      <p className="text-xs uppercase tracking-wide text-muted">{i.itemType}</p>
                    </div>
                    <button onClick={() => removeItem(i._id)} className="text-muted hover:text-danger">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-full border border-primary/12 px-2.5 py-1.5">
                      <button onClick={() => updateItem(i._id, i.quantity - 1)} className="text-primary"><Minus size={13} /></button>
                      <span className="w-5 text-center text-sm font-semibold">{i.quantity}</span>
                      <button onClick={() => updateItem(i._id, i.quantity + 1)} className="text-primary"><Plus size={13} /></button>
                    </div>
                    <span className="font-display text-lg font-semibold text-primary">
                      {formatPrice(discountedPrice(i.item?.price, i.item?.discount) * i.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="card-surface h-fit p-6">
            <h3 className="font-display text-lg font-semibold text-primary">Order Summary</h3>
            <div className="mt-4 flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between text-ink/70">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink/70">
                <span>Estimated shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="my-1 border-t border-primary/8" />
              <div className="flex justify-between text-base font-semibold text-primary">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn-primary mt-5 w-full">
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
