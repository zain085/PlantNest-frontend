import { Link } from "react-router-dom"
import { Heart, ShoppingBag } from "lucide-react"
import { formatPrice, discountedPrice, getItemImage } from "../../utils/format.js"
import { useCart } from "../../context/CartContext.jsx"
import { useWishlist } from "../../context/WishlistContext.jsx"
import StarRating from "./StarRating.jsx"

export default function ProductCard({ product, itemType }) {
  const { addItem } = useCart()
  const { isWishlisted, toggle } = useWishlist()
  const wishlisted = isWishlisted(product._id)
  const finalPrice = discountedPrice(product.price, product.discount)
  const outOfStock = product.stock <= 0

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-primary/6 bg-white shadow-card transition-shadow duration-300 hover:shadow-soft">
      <Link to={`/product/${itemType}/${product._id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-accent-light">
          <img
            src={getItemImage(product)}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
          {product.discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-clay px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              -{product.discount}%
            </span>
          )}
          {outOfStock && (
            <span className="absolute inset-x-0 bottom-0 bg-primary/85 py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-white">
              Out of stock
            </span>
          )}
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault()
          toggle(itemType === "plant" ? "Plant" : "Accessory", product._id)
        }}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm backdrop-blur transition-transform hover:scale-110"
        aria-label="Toggle wishlist"
      >
        <Heart size={16} className={wishlisted ? "fill-clay text-clay" : ""} />
      </button>

      <div className="p-4">
        <Link to={`/product/${itemType}/${product._id}`}>
          <h3 className="line-clamp-1 font-display text-[15px] font-semibold text-ink">{product.name}</h3>
        </Link>
        <div className="mt-1">
          <StarRating value={product.avgRating} count={product.numReviews} size={12} />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-base font-semibold text-primary">{formatPrice(finalPrice)}</span>
            {product.discount > 0 && (
              <span className="text-xs text-muted line-through">{formatPrice(product.price)}</span>
            )}
          </div>
          <button
            onClick={() => addItem(itemType === "plant" ? "Plant" : "Accessory", product._id, 1)}
            disabled={outOfStock}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-110 hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-primary/30"
            aria-label="Add to cart"
          >
            <ShoppingBag size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
