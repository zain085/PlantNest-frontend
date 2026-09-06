export const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value || 0)

export const discountedPrice = (price, discount) =>
  discount ? Math.round(price - (price * discount) / 100) : price

export const placeholderImage = (seed = "plant") =>
  `https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=60&sig=${encodeURIComponent(seed)}`

export const getItemImage = (item) => item?.images?.[0] || placeholderImage(item?._id || item?.name)

export const capitalize = (str = "") => str.charAt(0).toUpperCase() + str.slice(1)

export const statusStyles = {
  pending: "bg-warn/10 text-warn",
  confirmed: "bg-accent/10 text-accent",
  "on the way": "bg-primary/10 text-primary",
  delivered: "bg-success/10 text-success",
  cancelled: "bg-danger/10 text-danger",
}
