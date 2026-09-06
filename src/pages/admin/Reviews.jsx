import { useEffect, useState } from "react"
import { getPlants } from "../../api/plants.api.js"
import { getAccessories } from "../../api/accessories.api.js"
import { getProductReviews } from "../../api/reviews.api.js"
import Loader from "../../components/ui/Loader.jsx"
import StarRating from "../../components/ui/StarRating.jsx"

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [plantsRes, accessoriesRes] = await Promise.all([getPlants(), getAccessories()])
        const products = [
          ...plantsRes.data.plants.map((p) => ({ ...p, kind: "Plant" })),
          ...accessoriesRes.data.accessories.map((a) => ({ ...a, kind: "Accessory" })),
        ].filter((p) => p.numReviews > 0)

        const all = await Promise.all(products.map((p) => getProductReviews(p._id)))
        const combined = all.flatMap((res, idx) =>
          res.data.reviews.map((r) => ({ ...r, productName: products[idx].name, productKind: products[idx].kind }))
        )
        combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setReviews(combined)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <Loader label="Loading reviews..." />

  return (
    <div className="flex flex-col gap-4">
      {reviews.length === 0 ? (
        <p className="card-surface p-8 text-center text-sm text-muted">No reviews submitted yet.</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="card-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-ink">{r.user?.username || "Anonymous"}</p>
                <p className="text-xs text-muted">on {r.productName} ({r.productKind})</p>
              </div>
              <StarRating value={r.rating} size={14} />
            </div>
            <p className="mt-3 text-sm font-semibold text-ink">{r.title}</p>
            <p className="mt-1 text-sm text-ink/70">{r.description}</p>
          </div>
        ))
      )}
    </div>
  )
}
