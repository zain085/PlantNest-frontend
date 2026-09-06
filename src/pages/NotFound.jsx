import { Link } from "react-router-dom"
import { Sprout } from "lucide-react"

export default function NotFound() {
  return (
    <div className="section-pad mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-light text-accent">
        <Sprout size={28} />
      </span>
      <h1 className="mt-6 font-display text-4xl font-semibold text-primary">404</h1>
      <p className="mt-2 text-sm text-muted">This page hasn't sprouted yet. Let's get you back on track.</p>
      <Link to="/" className="btn-primary mt-6">Back to Home</Link>
    </div>
  )
}
