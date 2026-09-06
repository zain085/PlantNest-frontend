import api from "./axios.js"

export const registerUser = (formData) =>
  api.post("/auth/register", formData, { headers: { "Content-Type": "multipart/form-data" } })

export const loginUser = (payload) => api.post("/auth/login", payload)
export const logoutUser = () => api.post("/auth/logout")
export const fetchProfile = () => api.get("/auth/me")
export const updateProfile = (payload) => api.put("/auth/update-profile", payload)
export const changePassword = (payload) => api.put("/auth/change-password", payload)
