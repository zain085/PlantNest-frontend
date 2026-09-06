import { useState } from "react"
import toast from "react-hot-toast"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { submitFeedback } from "../api/feedback.api.js"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitFeedback(form)
      toast.success("Thanks — we'll get back to you soon.")
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not send your message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section-pad mx-auto max-w-6xl py-16">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-semibold text-primary">Contact Us</h1>
        <p className="mt-2 text-sm text-muted">Questions about an order, a plant, or just want to say hi?</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="flex flex-col gap-4">
          <div className="card-surface flex items-center gap-3 p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-accent"><Mail size={17} /></span>
            <div>
              <p className="text-xs text-muted">Email</p>
              <p className="text-sm font-semibold text-ink">hello@plantnest.com</p>
            </div>
          </div>
          <div className="card-surface flex items-center gap-3 p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-accent"><Phone size={17} /></span>
            <div>
              <p className="text-xs text-muted">Phone</p>
              <p className="text-sm font-semibold text-ink">+1 (222) 555-6666</p>
            </div>
          </div>
          <div className="card-surface flex items-center gap-3 p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-accent"><MapPin size={17} /></span>
            <div>
              <p className="text-xs text-muted">Address</p>
              <p className="text-sm font-semibold text-ink">12 Greenhouse Lane, Karachi</p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="card-surface p-6">
          <div className="grid gap-3.5 sm:grid-cols-2">
            <input required placeholder="Your name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="input-field" />
            <input required type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="input-field" />
          </div>
          <input placeholder="Subject" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} className="input-field mt-3.5" />
          <textarea required rows={5} placeholder="Your message" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="input-field mt-3.5 resize-none" />
          <button disabled={loading} className="btn-primary mt-4">
            {loading ? "Sending..." : "Send Message"} <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  )
}
