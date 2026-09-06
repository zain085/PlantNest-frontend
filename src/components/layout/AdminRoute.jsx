import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext.jsx"
import Loader from "../ui/Loader.jsx"

export default function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth()

  if (loading) return <Loader label="Checking your session..." />
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}
