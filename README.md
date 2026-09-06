# PlantNest — Frontend

React (Vite) + Tailwind CSS storefront and admin dashboard for the PlantNest online nursery, built
against the extended `PlantNest-Backend` (see its README for what changed there).

## Setup
```bash
npm install
cp .env.example .env    # defaults to http://localhost:5000/api/v1 — edit if your backend runs elsewhere
npm run dev              # http://localhost:5173
```

Make sure the backend is running first (`npm run start:dev` in the backend folder, and ideally
`npm run seed` once so there are categories + a demo admin to log in as).

## Structure
```
src/
  api/          one file per resource — thin axios wrappers, nothing else
  context/      AuthContext, CartContext, WishlistContext (React Context, no external state lib)
  components/
    layout/     Navbar, Footer, CartDrawer, route guards
    ui/         ProductCard, StarRating, Loader, EmptyState, Badge, Logo
    admin/      sidebar/topbar/stat cards + the shared product & category form modals
  pages/        storefront pages
  pages/dashboard/  logged-in user area (profile, orders, addresses, wishlist)
  pages/admin/      admin dashboard (plants, accessories, categories, orders, reviews, feedback, users)
```

## Design system
Colors, type and the glassmorphism nav all follow the brief you provided — deep forest green primary,
botanical green accent, warm terracotta/clay secondary, off-white background. Headings use **Fraunces**
(an organic serif that fits the botanical theme without falling back to the generic Playfair-on-cream
look), body/UI text uses **Plus Jakarta Sans**. Tailwind tokens for all of this live in
`tailwind.config.js` and `src/index.css`.

## What's wired up
Everything in the SRS's functional requirements is connected to the real backend — registration/login,
catalog + accessories with search/sort/filter, product detail with reviews, cart drawer + full cart page,
checkout → order creation, order history + cancellation, wishlist, saved addresses, profile + password
change, contact/feedback form, sitemap — and the full admin CRUD surface (plants, accessories,
categories, order status updates, reviews, feedback, users) with image upload via your Cloudinary setup.

Payment is intentionally out of scope, matching the SRS — checkout places the order directly.

## Known gaps / things to double-check before submitting
- No automated tests were added — the SRS deliverables list doesn't call for them, but worth a mention.
- The demo images (Unsplash) that stand in for product photos are placeholders until you upload real ones
  through the admin dashboard.
- I built this against the schema I extended in the backend — if you change field names there, mirror
  them in `src/api/*.js`.
