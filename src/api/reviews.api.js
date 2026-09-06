import api from "./axios.js"

export const getProductReviews = (productId) => api.get(`/review/product/${productId}`)
export const addReview = (payload) => api.post("/review", payload)
