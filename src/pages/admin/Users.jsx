import { useEffect, useState } from "react"
import { getAllUsers } from "../../api/user.api.js"
import Loader from "../../components/ui/Loader.jsx"
import Badge from "../../components/ui/Badge.jsx"

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllUsers()
      .then(({ data }) => setUsers(data.users))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader label="Loading users..." />

  return (
    <div className="card-surface overflow-x-auto p-2">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-3 font-medium">User</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">City</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t border-primary/6">
              <td className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-accent-light font-display text-xs font-semibold text-primary">
                  {u.avatar ? <img src={u.avatar} alt="" className="h-full w-full object-cover" /> : u.username?.[0]?.toUpperCase()}
                </span>
                <span className="font-medium text-ink">{u.fullName || u.username}</span>
              </td>
              <td className="px-4 py-3 text-ink/70">{u.email}</td>
              <td className="px-4 py-3 text-ink/70">{u.city || "—"}</td>
              <td className="px-4 py-3">
                <Badge tone={u.role === "admin" ? "clay" : "accent"}>{u.role}</Badge>
              </td>
              <td className="px-4 py-3 text-ink/70">{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && <p className="p-8 text-center text-sm text-muted">No registered users yet.</p>}
    </div>
  )
}
