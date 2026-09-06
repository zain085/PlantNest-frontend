import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { SlidersHorizontal, X } from "lucide-react"
import { getAccessories } from "../api/accessories.api.js"
import { getCategories } from "../api/categories.api.js"
import ProductCard from "../components/ui/ProductCard.jsx"
import Loader from "../components/ui/Loader.jsx"
import EmptyState from "../components/ui/EmptyState.jsx"
import { capitalize } from "../utils/format.js"

export default function Accessories() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const category = searchParams.get("category") || ""
  const search = searchParams.get("search") || ""
  const sort = searchParams.get("sort") || "newest"
  const availability = searchParams.get("availability") || ""
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await getAccessories({ category, search, sort, availability, minPrice, maxPrice })
      setItems(data.accessories)
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [category, search, sort, availability, minPrice, maxPrice])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.categories)).catch(() => {})
  }, [])

  const activeFilterCount = [category, availability, minPrice, maxPrice].filter(Boolean).length

  const FilterPanel = (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold text-ink">Category</h4>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => updateParam("category", "")}
            className={`rounded-xl px-3 py-2 text-left text-sm ${!category ? "bg-accent-light font-semibold text-primary" : "text-ink/70 hover:bg-primary/5"}`}
          >
            All accessories
          </button>
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => updateParam("category", c._id)}
              className={`rounded-xl px-3 py-2 text-left text-sm ${category === c._id ? "bg-accent-light font-semibold text-primary" : "text-ink/70 hover:bg-primary/5"}`}
            >
              {capitalize(c.category)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-ink">Price range</h4>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" defaultValue={minPrice} onBlur={(e) => updateParam("minPrice", e.target.value)} className="input-field !py-2 text-sm" />
          <span className="text-muted">–</span>
          <input type="number" placeholder="Max" defaultValue={maxPrice} onBlur={(e) => updateParam("maxPrice", e.target.value)} className="input-field !py-2 text-sm" />
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-ink">Availability</h4>
        <div className="flex flex-col gap-1.5">
          {[{ v: "", l: "All" }, { v: "in-stock", l: "In stock" }, { v: "out-of-stock", l: "Out of stock" }].map((opt) => (
            <button
              key={opt.v}
              onClick={() => updateParam("availability", opt.v)}
              className={`rounded-xl px-3 py-2 text-left text-sm ${availability === opt.v ? "bg-accent-light font-semibold text-primary" : "text-ink/70 hover:bg-primary/5"}`}
            >
              {opt.l}
            </button>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button onClick={() => setSearchParams(search ? { search } : {})} className="text-xs font-semibold text-danger hover:underline">
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="section-pad mx-auto max-w-7xl py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-primary">Gardening Accessories</h1>
        <p className="mt-1 text-sm text-muted">Soil, tools, pots and everything else your plants ask for.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 card-surface p-5">{FilterPanel}</div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <button onClick={() => setFiltersOpen(true)} className="btn-secondary !py-2 !px-4 text-xs lg:hidden">
              <SlidersHorizontal size={14} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            <p className="hidden text-xs text-muted lg:block">{items.length} items</p>
            <select value={sort} onChange={(e) => updateParam("sort", e.target.value)} className="input-field ml-auto w-auto !py-2 text-xs">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>

          {loading ? (
            <Loader label="Fetching the toolshed..." />
          ) : items.length === 0 ? (
            <EmptyState title="No accessories match your filters" description="Try widening your search or clearing a filter." />
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
              {items.map((a) => (
                <ProductCard key={a._id} product={a} itemType="accessory" />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div onClick={() => setFiltersOpen(false)} className="absolute inset-0 bg-primary/30 backdrop-blur-sm" />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-primary">Filters</h3>
              <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
            </div>
            {FilterPanel}
          </div>
        </div>
      )}
    </div>
  )
}
