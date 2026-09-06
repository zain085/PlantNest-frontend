import api from "./axios.js"

export const getPlants = (params) => api.get("/plant", { params })
export const getPlantById = (id) => api.get(`/plant/${id}`)
export const createPlant = (formData) =>
  api.post("/plant", formData, { headers: { "Content-Type": "multipart/form-data" } })
export const updatePlant = (id, formData) =>
  api.put(`/plant/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
export const deletePlant = (id) => api.delete(`/plant/${id}`)
