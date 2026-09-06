import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Leaf,
  Sprout,
  Star,
  ChevronRight,
} from "lucide-react"
import { getPlants } from "../api/plants.api.js"
import { getCategories } from "../api/categories.api.js"
import ProductCard from "../components/ui/ProductCard.jsx"
import Loader from "../components/ui/Loader.jsx"
import { capitalize } from "../utils/format.js"

const categoryIcons = {
  flowering: "🌸",
  "non-flowering": "🌿",
  indoor: "🪴",
  outdoor: "🌳",
  succulents: "🌵",
  medicinal: "🍃",
}

export default function Home() {
  const [plants, setPlants] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [plantsRes, catRes] = await Promise.all([
          getPlants({ sort: "newest" }),
          getCategories(),
        ])

        setPlants(plantsRes.data.plants.slice(0, 8))
        setCategories(catRes.data.categories)
      } catch {
        // Storefront continues rendering even if API fails.
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div className="bg-[#f7f8f3]">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative min-h-[680px] overflow-hidden bg-[#183b2d] lg:min-h-[760px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=2200&auto=format&fit=crop&q=85')",
          }}
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-[#10291f]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10291f]/95 via-[#10291f]/65 to-[#10291f]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10291f]/80 via-transparent to-[#10291f]/20" />

        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#9bbf9a]/15 blur-[120px]" />

        <div className="section-pad relative mx-auto flex min-h-[680px] max-w-7xl items-center py-24 lg:min-h-[760px]">
          <div className="w-full max-w-3xl">
            {/* Eyebrow */}
            <div className="mb-7 inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white/90 backdrop-blur-md">
              <Sprout size={14} className="text-[#b7d7a8]" />
              Grown with care. Delivered with love.
            </div>

            {/* Heading */}
            <h1 className="animate-fade-up font-display text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-[88px]">
              Bring a little
              <span className="block italic font-normal text-[#c4dbb7]">
                wildness
              </span>
              home.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl animate-fade-up text-base leading-7 text-white/70 sm:text-lg">
              Beautiful plants, thoughtful accessories, and everything you
              need to create a home that feels alive.
            </p>

            {/* CTA */}
            <div className="mt-9 flex animate-fade-up flex-wrap gap-3">
              <Link
                to="/catalog"
                className="group inline-flex items-center gap-2 rounded-full bg-[#c6dcb9] px-6 py-3.5 text-sm font-semibold text-[#17382b] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
              >
                Explore our plants
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/accessories"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Shop accessories
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#b7d7a8]" />
                Healthy plants
              </div>

              <div className="flex items-center gap-2">
                <Truck size={15} className="text-[#b7d7a8]" />
                Careful delivery
              </div>

              <div className="flex items-center gap-2">
                <Star size={15} className="fill-[#b7d7a8] text-[#b7d7a8]" />
                Loved by plant people
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f7f8f3] to-transparent" />
      </section>

      {/* =====================================================
          CATEGORY SECTION
      ===================================================== */}
      <section className="section-pad relative mx-auto max-w-7xl py-20 lg:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Find your green
            </span>

            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              Shop by category
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
              From tiny desk companions to statement-making outdoor plants,
              find something that belongs in your space.
            </p>
          </div>

          <Link
            to="/catalog"
            className="hidden items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-primary sm:flex"
          >
            View all
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {(categories.length
            ? categories
            : Object.keys(categoryIcons).map((category) => ({
                category,
                _id: category,
              }))
          ).map((cat) => (
            <Link
              key={cat._id}
              to={`/catalog?category=${cat._id}`}
              className="group relative overflow-hidden rounded-[1.75rem] border border-primary/5 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-accent-light opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex flex-col items-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-[#eef3e9] text-3xl transition-transform duration-300 group-hover:scale-110">
                  {categoryIcons[cat.category] || "🌱"}
                </span>

                <span className="mt-4 text-[13px] font-semibold text-ink">
                  {capitalize(cat.category)}
                </span>

                <span className="mt-1 text-[11px] text-muted">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}
      <section className="section-pad mx-auto max-w-7xl pb-20 lg:pb-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Fresh arrivals
            </span>

            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              Plants looking for a home
            </h2>

            <p className="mt-2 text-sm text-muted">
              Freshly stocked, carefully selected, and ready to grow with you.
            </p>
          </div>

          <Link
            to="/catalog"
            className="hidden items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-primary sm:flex"
          >
            Shop all plants
            <ChevronRight size={16} />
          </Link>
        </div>

        {loading ? (
          <Loader label="Finding your next plant..." />
        ) : plants.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-primary/10 bg-white/70 p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-light">
              <Sprout size={24} className="text-accent" />
            </div>

            <p className="mt-4 text-sm font-semibold text-ink">
              The nursery is getting ready.
            </p>

            <p className="mt-1 text-sm text-muted">
              New plants will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {plants.map((plant) => (
              <ProductCard
                key={plant._id}
                product={plant}
                itemType="plant"
              />
            ))}
          </div>
        )}
      </section>

      {/* =====================================================
          BOTANICAL IMAGE BANNER
      ===================================================== */}
      <section className="section-pad mx-auto max-w-7xl pb-20 lg:pb-24">
        <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] bg-[#183b2d]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1800&auto=format&fit=crop&q=80')",
            }}
          />

          <div className="absolute inset-0 bg-[#173a2b]/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10291f]/95 via-[#173a2b]/65 to-transparent" />

          <div className="relative flex min-h-[420px] items-center p-8 sm:p-12 lg:p-16">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c4dbb7]">
                More than decoration
              </span>

              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                Make your space feel
                <span className="block italic font-normal text-[#c4dbb7]">
                  alive.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-white/65 sm:text-base">
                The right plant can change the atmosphere of an entire room.
                Discover greenery that fits your lifestyle, light, and space.
              </p>

              <Link
                to="/catalog"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c6dcb9]"
              >
                Find your plant
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ===================================================== */}
      <section className="section-pad mx-auto max-w-7xl pb-20 lg:pb-28">
        <div className="grid overflow-hidden rounded-[2rem] border border-primary/5 bg-white shadow-card sm:grid-cols-3">
          <div className="group border-b border-primary/5 p-7 transition-colors hover:bg-[#f6f8f2] sm:border-b-0 sm:border-r">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf3e9] text-primary transition-transform duration-300 group-hover:scale-105">
              <Truck size={20} />
            </span>

            <h3 className="mt-5 text-sm font-semibold text-ink">
              Careful delivery
            </h3>

            <p className="mt-2 text-xs leading-5 text-muted">
              Every plant is packed carefully to protect leaves, roots, and
              soil during its journey.
            </p>
          </div>

          <div className="group border-b border-primary/5 p-7 transition-colors hover:bg-[#f6f8f2] sm:border-b-0 sm:border-r">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf3e9] text-primary transition-transform duration-300 group-hover:scale-105">
              <Leaf size={20} />
            </span>

            <h3 className="mt-5 text-sm font-semibold text-ink">
              Plant care guidance
            </h3>

            <p className="mt-2 text-xs leading-5 text-muted">
              Light, watering, temperature, and care notes to help your new
              plant thrive.
            </p>
          </div>

          <div className="group p-7 transition-colors hover:bg-[#f6f8f2]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf3e9] text-primary transition-transform duration-300 group-hover:scale-105">
              <ShieldCheck size={20} />
            </span>

            <h3 className="mt-5 text-sm font-semibold text-ink">
              Healthy on arrival
            </h3>

            <p className="mt-2 text-xs leading-5 text-muted">
              Plants are inspected before shipping so they arrive ready for
              their new home.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}