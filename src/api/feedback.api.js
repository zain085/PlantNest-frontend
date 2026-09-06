import api from "./axios.js"

export const submitFeedback = (payload) => api.post("/feedback", payload)
export const getAllFeedback = () => api.get("/feedback")
export const markFeedbackRead = (id) => api.put(`/feedback/${id}/read`)
