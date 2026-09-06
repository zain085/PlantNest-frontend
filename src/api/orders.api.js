import api from "./axios.js"

export const checkout = (payload) => api.post("/order/checkout", payload)
export const getMyOrders = () => api.get("/order/my-orders")
export const cancelOrder = (orderId) => api.put(`/order/cancel/${orderId}`)
export const getAllOrders = (params) => api.get("/order/admin/all", { params })
export const updateOrderStatus = (orderId, status) => api.put(`/order/admin/status/${orderId}`, { status })
