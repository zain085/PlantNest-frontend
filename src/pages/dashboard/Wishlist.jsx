import { Link } from "react-router-dom"
import { useWishlist } from "../../context/WishlistContext.jsx"
import ProductCard from "../../components/ui/ProductCard.jsx"
import EmptyState from "../../components/ui/EmptyState.jsx"

export default function Wishlist() {
  const { wishlist } = useWishlist()
  const valid = wishlist.filter((w) => w.item)

  if (valid.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        description="Tap the heart on any product to save it for later."
        action={<Link to="/catalog" className="btn-primary">Browse Plants</Link>}
      />
    )
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
      {valid.map((w) => (
        <ProductCard
          key={w._id}
          product={w.item}
          itemType={w.itemType === "Plant" ? "plant" : "accessory"}
        />
      ))}
    </div>
  )
}
