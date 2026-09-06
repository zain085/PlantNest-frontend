import { createContext, useContext, useEffect, useState, useCallback } from "react"
import toast from "react-hot-toast"
import { useAuth } from "./AuthContext.jsx"
import { getWishlist, toggleWishlist as toggleWishlistApi } from "../api/user.api.js"

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const [wishlist, setWishlist] = useState([])

  const refreshWishlist = useCallback(async () => {
    if (!user) {
      setWishlist([])
      return
    }
    try {
      const { data } = await getWishlist()
      setWishlist(data.wishlist)
    } catch {
      // silent
    }
  }, [user])

  useEffect(() => {
    refreshWishlist()
  }, [refreshWishlist])

  const isWishlisted = (itemId) => wishlist.some((w) => w.item?._id === itemId || w.item === itemId)

  const toggle = async (itemType, itemId) => {
    if (!user) {
      toast.error("Please log in to save items to your wishlist")
      return
    }
    const wasWishlisted = isWishlisted(itemId)
    const { data } = await toggleWishlistApi({ itemType, itemId })
    setWishlist(data.wishlist)
    toast.success(wasWishlisted ? "Removed from wishlist" : "Added to wishlist")
  }

  return (
    <WishlistContext.Provider value={{ wishlist, isWishlisted, toggle, refreshWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
