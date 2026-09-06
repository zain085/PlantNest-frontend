import { createContext, useContext, useEffect, useState, useCallback } from "react"
import toast from "react-hot-toast"
import { useAuth } from "./AuthContext.jsx"
import { getCart, addToCart as addToCartApi, updateCartItem as updateCartItemApi, removeCartItem as removeCartItemApi } from "../api/cart.api.js"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState({ items: [] })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const refreshCart = useCallback(async () => {
    if (!user) {
      setCart({ items: [] })
      return
    }
    try {
      setLoading(true)
      const { data } = await getCart()
      setCart(data.cart)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addItem = async (itemType, itemId, quantity = 1) => {
    if (!user) {
      toast.error("Please log in to add items to your cart")
      return false
    }
    try {
      const { data } = await addToCartApi({ itemType, itemId, quantity })
      setCart(data.cart)
      toast.success("Added to cart")
      return true
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not add to cart")
      return false
    }
  }

  const updateItem = async (cartItemId, quantity) => {
    const { data } = await updateCartItemApi(cartItemId, quantity)
    setCart(data.cart)
  }

  const removeItem = async (cartItemId) => {
    const { data } = await removeCartItemApi(cartItemId)
    setCart(data.cart)
    toast.success("Removed from cart")
  }

  const itemCount = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0

  return (
    <CartContext.Provider
      value={{ cart, itemCount, loading, addItem, updateItem, removeItem, refreshCart, drawerOpen, setDrawerOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
