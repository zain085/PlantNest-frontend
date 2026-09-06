import { Link } from "react-router-dom"

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#0f392b" strokeWidth="2.5" />
        <path d="M24 34C24 34 14 29 14 18C14 18 24 16 30 22C34.5 26.5 32 32 24 34Z" fill="#2e7d32" />
        <path d="M24 34C24 34 20 26 24 16" stroke="#0f392b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="font-display text-[22px] leading-none tracking-tight">
        <span className="font-bold text-primary">Plant</span>
        <span className="font-normal text-clay">Nest</span>
      </span>
    </Link>
  )
}
