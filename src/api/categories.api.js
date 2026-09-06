import api from "./axios.js"

export const getCategories = () => api.get("/category")
export const createCategory = (payload) => api.post("/category", payload)
export const updateCategory = (id, payload) => api.put(`/category/${id}`, payload)
export const deleteCategory = (id) => api.delete(`/category/${id}`)
