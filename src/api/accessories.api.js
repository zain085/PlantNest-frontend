import api from "./axios.js"

export const getAccessories = (params) => api.get("/accessory", { params })
export const getAccessoryById = (id) => api.get(`/accessory/${id}`)
export const createAccessory = (formData) =>
  api.post("/accessory", formData, { headers: { "Content-Type": "multipart/form-data" } })
export const updateAccessory = (id, formData) =>
  api.put(`/accessory/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
export const deleteAccessory = (id) => api.delete(`/accessory/${id}`)
