import { Link } from "react-router-dom"
import { Leaf } from "lucide-react"

const sections = [
  {
    title: "Shop",
    links: [
      { to: "/catalog", label: "Plant Catalog" },
      { to: "/accessories", label: "Accessories" },
      { to: "/cart", label: "My Cart" },
      { to: "/checkout", label: "Checkout" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/login", label: "Log In" },
      { to: "/register", label: "Register" },
      { to: "/dashboard/profile", label: "My Profile" },
      { to: "/dashboard/orders", label: "My Orders" },
      { to: "/dashboard/addresses", label: "Saved Addresses" },
      { to: "/dashboard/wishlist", label: "My Wishlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact Us" },
      { to: "/sitemap", label: "Sitemap" },
    ],
  },
  {
    title: "Admin",
    links: [
      { to: "/admin", label: "Dashboard Overview" },
      { to: "/admin/plants", label: "Manage Plants" },
      { to: "/admin/accessories", label: "Manage Accessories" },
      { to: "/admin/categories", label: "Manage Categories" },
      { to: "/admin/orders", label: "Manage Orders" },
      { to: "/admin/reviews", label: "User Reviews" },
      { to: "/admin/feedback", label: "User Feedback" },
      { to: "/admin/users", label: "Registered Users" },
    ],
  },
]

export default function Sitemap() {
  return (
    <div className="section-pad mx-auto max-w-5xl py-16">
      <div className="mb-10 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-light text-accent">
          <Leaf size={22} />
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-primary">Sitemap</h1>
        <p className="mt-2 text-sm text-muted">Every page in PlantNest, in one place.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((s) => (
          <div key={s.title} className="card-surface p-5">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-clay">{s.title}</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {s.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-ink/75 hover:text-primary">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
