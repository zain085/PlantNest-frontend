import { useState, useRef, useEffect } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Search, Heart, ShoppingBag, User, Menu, X, LogOut, LayoutDashboard, PackageSearch } from "lucide-react"
import Logo from "../ui/Logo.jsx"
import { useAuth } from "../../context/AuthContext.jsx"
import { useCart } from "../../context/CartContext.jsx"
import { useWishlist } from "../../context/WishlistContext.jsx"

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/accessories", label: "Accessories" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
  { to: "/sitemap", label: "Sitemap" },
]

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth()
  const { itemCount, setDrawerOpen } = useCart()
  const { wishlist } = useWishlist()
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [search, setSearch] = useState("")
  const profileRef = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(`/catalog?search=${encodeURIComponent(search)}`)
    setMobileOpen(false)
  }

  return (
    <header className="glass-nav sticky top-0 z-40">
      <div className="section-pad mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
                  isActive ? "bg-primary/8 text-primary" : "text-ink/70 hover:text-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <form onSubmit={submitSearch} className="relative hidden md:block">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search plants, tools..."
              className="w-44 rounded-full border border-primary/10 bg-white/70 py-2 pl-9 pr-3 text-[13px] transition-all focus:w-60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 lg:w-52 lg:focus:w-72"
            />
          </form>

          <Link
            to="/dashboard/wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-primary/80 transition-colors hover:bg-primary/6 hover:text-primary"
            aria-label="Wishlist"
          >
            <Heart size={19} />
            {wishlist.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-primary/80 transition-colors hover:bg-primary/6 hover:text-primary"
            aria-label="Cart"
          >
            <ShoppingBag size={19} />
            {itemCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-primary/12 bg-accent-light text-primary transition-transform hover:scale-105"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-display text-sm font-semibold">{user.username?.[0]?.toUpperCase()}</span>
                )}
              </button>
              {profileOpen && (
                <div className="animate-scale-in absolute right-0 top-12 w-52 origin-top-right rounded-2xl border border-primary/8 bg-white p-1.5 shadow-glass">
                  <div className="px-3 py-2 border-b border-primary/6 mb-1">
                    <p className="truncate text-sm font-semibold text-ink">{user.fullName || user.username}</p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                  </div>
                  {isAdmin && (
                    <Link
                      onClick={() => setProfileOpen(false)}
                      to="/admin"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink/80 hover:bg-accent-light hover:text-primary"
                    >
                      <LayoutDashboard size={15} /> Admin Dashboard
                    </Link>
                  )}
                  <Link
                    onClick={() => setProfileOpen(false)}
                    to="/dashboard/orders"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink/80 hover:bg-accent-light hover:text-primary"
                  >
                    <PackageSearch size={15} /> My Orders
                  </Link>
                  <Link
                    onClick={() => setProfileOpen(false)}
                    to="/dashboard/profile"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink/80 hover:bg-accent-light hover:text-primary"
                  >
                    <User size={15} /> My Profile
                  </Link>
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      logout()
                      navigate("/")
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-danger hover:bg-danger/5"
                  >
                    <LogOut size={15} /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary !px-5 !py-2.5 hidden sm:inline-flex">
              Log In
            </Link>
          )}

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-primary lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-primary/8 bg-bgmain/95 px-5 py-4 lg:hidden">
          <form onSubmit={submitSearch} className="relative mb-3">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search plants, tools..."
              className="input-field !py-2.5 pl-9"
            />
          </form>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                onClick={() => setMobileOpen(false)}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2.5 text-sm font-medium ${isActive ? "bg-primary/8 text-primary" : "text-ink/75"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {!user && (
              <Link onClick={() => setMobileOpen(false)} to="/login" className="btn-primary mt-2">
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
