import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { loginUser, logoutUser, registerUser, fetchProfile } from "../api/auth.api.js"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("plantnest_token")
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const { data } = await fetchProfile()
        setUser(data.user)
      } catch {
        localStorage.removeItem("plantnest_token")
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const login = async (payload) => {
    const { data } = await loginUser(payload)
    localStorage.setItem("plantnest_token", data.token)
    setUser(data.user)
    return data.user
  }

  const register = async (formData) => {
    const { data } = await registerUser(formData)
    localStorage.setItem("plantnest_token", data.token)
    setUser(data.user)
    return data.user
  }

  const logout = async () => {
    try {
      await logoutUser()
    } catch {
      // ignore network errors on logout
    }
    localStorage.removeItem("plantnest_token")
    setUser(null)
    toast.success("Logged out")
  }

  const updateLocalUser = (patch) => setUser((prev) => ({ ...prev, ...patch }))

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateLocalUser, isAdmin: user?.role === "admin" }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
