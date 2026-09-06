import { Link } from "react-router-dom"
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "../../context/CartContext.jsx"
import { formatPrice, discountedPrice, getItemImage } from "../../utils/format.js"
import EmptyState from "../ui/EmptyState.jsx"

export default function CartDrawer() {
  const { cart, drawerOpen, setDrawerOpen, updateItem, removeItem } = useCart()
  const items = cart.items || []

  const subtotal = items.reduce((sum, i) => {
    const price = discountedPrice(i.item?.price, i.item?.discount)
    return sum + price * i.quantity
  }, 0)

  return (
    <>
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-50 bg-primary/25 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-glass transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-primary/8 px-6 py-5">
          <h2 className="font-display text-lg font-semibold text-primary">Your Cart ({items.length})</h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary/6"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              description="Browse the catalog and add a few green companions."
              action={
                <Link onClick={() => setDrawerOpen(false)} to="/catalog" className="btn-primary">
                  Shop Plants
                </Link>
              }
            />
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((i) => (
                <li key={i._id} className="flex gap-3">
                  <img
                    src={getItemImage(i.item)}
                    alt={i.item?.name}
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-1 text-sm font-semibold text-ink">{i.item?.name}</p>
                      <button onClick={() => removeItem(i._id)} className="text-muted hover:text-danger">
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-primary/10 px-1">
                        <button
                          onClick={() => updateItem(i._id, i.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center text-primary"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-4 text-center text-xs font-medium">{i.quantity}</span>
                        <button
                          onClick={() => updateItem(i._id, i.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center text-primary"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-display text-sm font-semibold text-primary">
                        {formatPrice(discountedPrice(i.item?.price, i.item?.discount) * i.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-primary/8 px-6 py-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-display text-lg font-semibold text-primary">{formatPrice(subtotal)}</span>
            </div>
            <Link onClick={() => setDrawerOpen(false)} to="/cart" className="btn-secondary mb-2 w-full">
              View Cart
            </Link>
            <Link onClick={() => setDrawerOpen(false)} to="/checkout" className="btn-primary w-full">
              <ShoppingBag size={16} /> Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
