import { Link } from "react-router-dom"
import { useState } from "react"
import { Leaf, Mail, Phone, MapPin, Send } from "lucide-react"
import toast from "react-hot-toast"
import Logo from "../ui/Logo.jsx"

export default function Footer() {
  const [email, setEmail] = useState("")

  const subscribe = (e) => {
    e.preventDefault()
    if (!email) return
    toast.success("You're on the list — welcome to the nursery!")
    setEmail("")
  }

  return (
    <footer className="mt-20 border-t border-primary/8 bg-primary text-white/85">
      <div className="section-pad mx-auto grid max-w-7xl gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="[&_span]:text-white [&_span.text-clay]:text-clay" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            An online nursery for people who want their homes a little greener — plants, gardening tools, and the
            know-how to keep both alive.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">Explore</h4>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/60">
            <li><Link to="/catalog" className="hover:text-clay">Plant Catalog</Link></li>
            <li><Link to="/accessories" className="hover:text-clay">Accessories</Link></li>
            <li><Link to="/about" className="hover:text-clay">About Us</Link></li>
            <li><Link to="/sitemap" className="hover:text-clay">Sitemap</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">Get in Touch</h4>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/60">
            <li className="flex items-center gap-2"><Mail size={14} /> hello@plantnest.com</li>
            <li className="flex items-center gap-2"><Phone size={14} /> +1 (222) 555-6666</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> 12 Greenhouse Lane, Karachi</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">Grow With Us</h4>
          <p className="mt-4 text-sm text-white/60">Weekly plant care tips and new arrivals in your inbox.</p>
          <form onSubmit={subscribe} className="mt-3 flex overflow-hidden rounded-full bg-white/10 pr-1">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button className="flex h-8 w-8 shrink-0 items-center justify-center self-center rounded-full bg-accent text-white transition-transform hover:scale-105">
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="section-pad mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-white/45 sm:flex-row">
          <p className="flex items-center gap-1.5"><Leaf size={13} /> PlantNest — Bring Nature Home</p>
          <p>© {new Date().getFullYear()} PlantNest. Built as an eGreen Nursery project.</p>
        </div>
      </div>
    </footer>
  )
}
