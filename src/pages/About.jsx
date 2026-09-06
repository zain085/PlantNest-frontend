import { Leaf, Sprout, Users, Heart } from "lucide-react"

const stats = [
  { label: "Plants rehomed", value: "12,000+" },
  { label: "Species catalogued", value: "300+" },
  { label: "Cities delivered to", value: "40+" },
]

const values = [
  { icon: Leaf, title: "Healthy stock, always", text: "Every plant is inspected before it's listed and again before it ships." },
  { icon: Sprout, title: "Care that travels with it", text: "Watering, light and temperature notes come with every plant page." },
  { icon: Users, title: "Built for beginners too", text: "Care-level badges make it easy to pick something you can actually keep alive." },
]

export default function About() {
  return (
    <div>
      <section className="bg-primary py-20 text-center text-white">
        <div className="section-pad mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-clay">
            <Heart size={13} /> About PlantNest
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold">We believe every room deserves something green.</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            PlantNest started as a simple idea: shopping for plants shouldn't mean driving between five nurseries.
            We bring the catalog, the care instructions, and the delivery to you.
          </p>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-5xl py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="card-surface p-6 text-center">
              <p className="font-display text-3xl font-semibold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad mx-auto max-w-5xl pb-20">
        <h2 className="text-center font-display text-2xl font-semibold text-primary">What we care about</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl border border-primary/6 bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-light text-accent">
                <v.icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{v.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
