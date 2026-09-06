import api from "./axios.js"

export const getAllUsers = () => api.get("/user/admin/all")
export const getWishlist = () => api.get("/user/wishlist")
export const toggleWishlist = (payload) => api.post("/user/wishlist/toggle", payload)
export const addAddress = (payload) => api.post("/user/address", payload)
export const deleteAddress = (addressId) => api.delete(`/user/address/${addressId}`)
