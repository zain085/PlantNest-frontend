import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Mail, CheckCircle2 } from "lucide-react"
import { getAllFeedback, markFeedbackRead } from "../../api/feedback.api.js"
import Loader from "../../components/ui/Loader.jsx"

export default function Feedback() {
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await getAllFeedback()
      setFeedback(data.feedback)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const markRead = async (id) => {
    try {
      await markFeedbackRead(id)
      toast.success("Marked as read")
      load()
    } catch {
      toast.error("Could not update")
    }
  }

  if (loading) return <Loader label="Loading feedback..." />

  return (
    <div className="flex flex-col gap-4">
      {feedback.length === 0 ? (
        <p className="card-surface p-8 text-center text-sm text-muted">No feedback submitted yet.</p>
      ) : (
        feedback.map((f) => (
          <div key={f._id} className={`card-surface p-5 ${!f.read && "border-l-4 !border-l-accent"}`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  {f.name} {!f.read && <span className="h-2 w-2 rounded-full bg-accent" />}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted"><Mail size={11} /> {f.email}</p>
              </div>
              {!f.read && (
                <button onClick={() => markRead(f._id)} className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline">
                  <CheckCircle2 size={13} /> Mark read
                </button>
              )}
            </div>
            <p className="mt-2 text-sm font-medium text-ink">{f.subject}</p>
            <p className="mt-1 text-sm text-ink/70">{f.message}</p>
            <p className="mt-2 text-xs text-muted">{new Date(f.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  )
}
