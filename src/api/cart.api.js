import api from "./axios.js"

export const getCart = () => api.get("/cart")
export const addToCart = (payload) => api.post("/cart/add", payload)
export const updateCartItem = (itemId, quantity) => api.put(`/cart/update/${itemId}`, { quantity })
export const removeCartItem = (itemId) => api.delete(`/cart/remove/${itemId}`)
