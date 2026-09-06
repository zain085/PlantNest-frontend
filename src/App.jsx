import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/layout/Navbar.jsx"
import Footer from "./components/layout/Footer.jsx"
import CartDrawer from "./components/layout/CartDrawer.jsx"
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx"
import AdminRoute from "./components/layout/AdminRoute.jsx"

import Home from "./pages/Home.jsx"
import Catalog from "./pages/Catalog.jsx"
import Accessories from "./pages/Accessories.jsx"
import ProductDetail from "./pages/ProductDetail.jsx"
import CartPage from "./pages/CartPage.jsx"
import Checkout from "./pages/Checkout.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Sitemap from "./pages/Sitemap.jsx"
import NotFound from "./pages/NotFound.jsx"

import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx"
import Profile from "./pages/dashboard/Profile.jsx"
import Orders from "./pages/dashboard/Orders.jsx"
import Addresses from "./pages/dashboard/Addresses.jsx"
import Wishlist from "./pages/dashboard/Wishlist.jsx"

import AdminLayout from "./pages/admin/AdminLayout.jsx"
import AdminOverview from "./pages/admin/Overview.jsx"
import AdminPlants from "./pages/admin/Plants.jsx"
import AdminAccessories from "./pages/admin/Accessories.jsx"
import AdminCategories from "./pages/admin/Categories.jsx"
import AdminOrders from "./pages/admin/OrdersAdmin.jsx"
import AdminReviews from "./pages/admin/Reviews.jsx"
import AdminFeedback from "./pages/admin/Feedback.jsx"
import AdminUsers from "./pages/admin/Users.jsx"

function StorefrontLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-bgmain">
      <Navbar />
      <CartDrawer />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0f392b",
            color: "#fff",
            borderRadius: "999px",
            fontSize: "13.5px",
            padding: "10px 18px",
          },
        }}
      />
      <Routes>
        <Route path="/admin/*" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminOverview />} />
          <Route path="plants" element={<AdminPlants />} />
          <Route path="accessories" element={<AdminAccessories />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        <Route
          path="/*"
          element={
            <StorefrontLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/product/:type/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sitemap" element={<Sitemap />} />

                <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                  <Route index element={<Profile />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="addresses" element={<Addresses />} />
                  <Route path="wishlist" element={<Wishlist />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </StorefrontLayout>
          }
        />
      </Routes>
    </>
  )
}
