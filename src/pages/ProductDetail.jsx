import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import toast from "react-hot-toast"
import { Heart, Minus, Plus, ShoppingBag, Droplets, Sun, Thermometer, Sprout, Star } from "lucide-react"
import { getPlantById } from "../api/plants.api.js"
import { getAccessoryById } from "../api/accessories.api.js"
import { getProductReviews, addReview } from "../api/reviews.api.js"
import { useCart } from "../context/CartContext.jsx"
import { useWishlist } from "../context/WishlistContext.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import StarRating from "../components/ui/StarRating.jsx"
import Loader from "../components/ui/Loader.jsx"
import { formatPrice, discountedPrice, getItemImage, capitalize } from "../utils/format.js"

export default function ProductDetail() {
  const { type, id } = useParams()
  const isPlant = type === "plant"
  const itemTypeLabel = isPlant ? "Plant" : "Accessory"

  const { user } = useAuth()
  const { addItem } = useCart()
  const { isWishlisted, toggle } = useWishlist()

  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [reviewForm, setReviewForm] = useState({ title: "", description: "", rating: 5 })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const fetchProduct = isPlant ? getPlantById(id) : getAccessoryById(id)
        const [{ data: productData }, { data: reviewData }] = await Promise.all([
          fetchProduct,
          getProductReviews(id),
        ])
        setProduct(isPlant ? productData.plant : productData.accessory)
        setReviews(reviewData.reviews)
        setActiveImage(0)
      } catch {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, isPlant])

  const submitReview = async (e) => {
    e.preventDefault()
    if (!user) return toast.error("Please log in to leave a review")
    setSubmitting(true)
    try {
      const { data } = await addReview({ ...reviewForm, itemType: itemTypeLabel, itemId: id })
      setReviews((prev) => [data.review, ...prev])
      setReviewForm({ title: "", description: "", rating: 5 })
      toast.success("Review submitted — thank you!")
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not submit review")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loader label="Loading product..." />
  if (!product) {
    return (
      <div className="section-pad mx-auto max-w-3xl py-24 text-center">
        <h2 className="font-display text-2xl font-semibold text-primary">Product not found</h2>
        <Link to={isPlant ? "/catalog" : "/accessories"} className="btn-primary mt-6 inline-flex">
          Back to {isPlant ? "Catalog" : "Accessories"}
        </Link>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [getItemImage(product)]
  const finalPrice = discountedPrice(product.price, product.discount)
  const outOfStock = product.stock <= 0
  const wishlisted = isWishlisted(product._id)

  const careItems = [
    product.wateringSchedule && { icon: Droplets, label: "Watering", value: product.wateringSchedule },
    product.sunlight && { icon: Sun, label: "Sunlight", value: product.sunlight },
    product.temperature && { icon: Thermometer, label: "Temperature", value: product.temperature },
    product.careLevel && { icon: Sprout, label: "Care Level", value: capitalize(product.careLevel) },
  ].filter(Boolean)

  return (
    <div className="section-pad mx-auto max-w-7xl py-10">
      <nav className="mb-6 text-xs text-muted">
        <Link to="/" className="hover:text-primary">Home</Link> /{" "}
        <Link to={isPlant ? "/catalog" : "/accessories"} className="hover:text-primary">
          {isPlant ? "Catalog" : "Accessories"}
        </Link>{" "}
        / <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-3xl bg-accent-light">
            <img src={images[activeImage]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`h-16 w-16 overflow-hidden rounded-xl border-2 ${activeImage === idx ? "border-accent" : "border-transparent"}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.category?.category && (
            <p className="text-xs font-semibold uppercase tracking-wide text-clay">{capitalize(product.category.category)}</p>
          )}
          <h1 className="mt-2 font-display text-3xl font-semibold text-primary">{product.name}</h1>
          {product.species && <p className="mt-1 text-sm italic text-muted">{product.species}</p>}
          <div className="mt-3">
            <StarRating value={product.avgRating} count={product.numReviews} showValue />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold text-primary">{formatPrice(finalPrice)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-base text-muted line-through">{formatPrice(product.price)}</span>
                <span className="rounded-full bg-clay/15 px-2.5 py-1 text-xs font-semibold text-clay">-{product.discount}%</span>
              </>
            )}
          </div>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink/75">{product.description || "No description provided yet."}</p>

          {careItems.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {careItems.map((c) => (
                <div key={c.label} className="rounded-2xl border border-primary/8 bg-white p-3 text-center">
                  <c.icon size={18} className="mx-auto text-accent" />
                  <p className="mt-1.5 text-[11px] font-semibold text-ink">{c.label}</p>
                  <p className="text-[11px] text-muted">{c.value}</p>
                </div>
              ))}
            </div>
          )}

          <p className={`mt-5 text-sm font-medium ${outOfStock ? "text-danger" : "text-success"}`}>
            {outOfStock ? "Out of stock" : `${product.stock} in stock`}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-full border border-primary/12 px-3 py-2">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="text-primary"><Minus size={15} /></button>
              <span className="w-5 text-center text-sm font-semibold">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))} className="text-primary"><Plus size={15} /></button>
            </div>
            <button
              disabled={outOfStock}
              onClick={() => addItem(itemTypeLabel, product._id, quantity)}
              className="btn-primary flex-1 sm:flex-none disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button
              onClick={() => toggle(itemTypeLabel, product._id)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/12 text-primary hover:bg-accent-light"
            >
              <Heart size={18} className={wishlisted ? "fill-clay text-clay" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-primary">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No reviews yet — be the first to share your experience.</p>
          ) : (
            <ul className="mt-6 flex flex-col gap-5">
              {reviews.map((r) => (
                <li key={r._id} className="card-surface p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-light font-display text-xs font-semibold text-primary">
                        {r.user?.username?.[0]?.toUpperCase() || "?"}
                      </span>
                      <span className="text-sm font-semibold text-ink">{r.user?.username || "Anonymous"}</span>
                    </div>
                    <StarRating value={r.rating} size={13} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-ink">{r.title}</p>
                  <p className="mt-1 text-sm text-ink/70">{r.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card-surface h-fit p-6">
          <h3 className="font-display text-lg font-semibold text-primary">Write a review</h3>
          {user ? (
            <form onSubmit={submitReview} className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button type="button" key={n} onClick={() => setReviewForm((f) => ({ ...f, rating: n }))}>
                    <Star
                      size={20}
                      className={n <= reviewForm.rating ? "fill-clay text-clay" : "fill-transparent text-primary/15"}
                    />
                  </button>
                ))}
              </div>
              <input
                required
                placeholder="Review title"
                value={reviewForm.title}
                onChange={(e) => setReviewForm((f) => ({ ...f, title: e.target.value }))}
                className="input-field"
              />
              <textarea
                required
                placeholder="Tell others what you think..."
                rows={4}
                value={reviewForm.description}
                onChange={(e) => setReviewForm((f) => ({ ...f, description: e.target.value }))}
                className="input-field resize-none"
              />
              <button disabled={submitting} className="btn-primary">
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          ) : (
            <p className="mt-4 text-sm text-muted">
              <Link to="/login" className="font-semibold text-accent hover:underline">Log in</Link> to leave a review.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
