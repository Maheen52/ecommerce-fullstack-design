# LUXE — Full-Stack eCommerce Application

A production-grade eCommerce web application built with React, Node.js, Express, and MongoDB.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, React Router v6, Axios  |
| Styling    | CSS3, CSS Variables, Flexbox/Grid |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB + Mongoose                |
| Auth       | JWT (jsonwebtoken) + bcryptjs     |
| Deployment | Render / Vercel / Heroku          |

---

## Project Structure

```
ecommerce-fullstack-design/
├── frontend/                    # React app (Week 1 & 2)
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js        # Responsive navigation
│       │   ├── Footer.js
│       │   └── ProductCard.js   # Reusable product card with quick-add
│       ├── context/
│       │   ├── CartContext.js   # Global cart state + localStorage persist
│       │   └── AuthContext.js   # JWT auth state management
│       ├── pages/
│       │   ├── HomePage.js      # Hero, featured products, categories
│       │   ├── ProductListingPage.js  # Search, filter, sort, pagination
│       │   ├── ProductDetailsPage.js  # Full product view + related items
│       │   ├── CartPage.js      # Cart management + order summary
│       │   ├── LoginPage.js     # JWT login
│       │   ├── RegisterPage.js  # New user registration
│       │   └── AdminPanel.js    # CRUD product management (admin only)
│       ├── App.js               # Router + protected routes
│       └── index.css            # Design system / global styles
│
├── backend/                     # Node + Express API (Week 2 & 3)
│   ├── models/
│   │   ├── User.js              # User schema (bcrypt, roles)
│   │   └── Product.js           # Product schema (text index for search)
│   ├── routes/
│   │   ├── auth.js              # POST /register, /login — GET /me
│   │   └── products.js          # Full CRUD — GET, POST, PUT, DELETE
│   ├── middleware/
│   │   └── auth.js              # JWT protect + adminOnly middleware
│   ├── config/
│   │   └── seed.js              # Seed DB with 12 products + admin user
│   ├── .env.example
│   └── server.js                # Express entry point
│
├── package.json                 # Root scripts (concurrently dev)
└── README.md
```

---

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone & install
```bash
git clone https://github.com/your-username/ecommerce-fullstack-design
cd ecommerce-fullstack-design
npm run install:all
```

### 2. Configure backend environment
```bash
cp backend/.env.example backend/.env
# Edit backend/.env and set your MONGO_URI and JWT_SECRET
```

### 3. Seed the database
```bash
npm run seed
```
This creates 12 sample products and an admin account:
- **Email:** admin@luxe.com
- **Password:** admin123

### 4. Run in development
```bash
npm run dev
```
- Frontend → http://localhost:3000
- Backend API → http://localhost:5000

---

## API Endpoints

### Authentication
| Method | Endpoint             | Access | Description           |
|--------|----------------------|--------|-----------------------|
| POST   | /api/auth/register   | Public | Create new account    |
| POST   | /api/auth/login      | Public | Login → returns JWT   |
| GET    | /api/auth/me         | Auth   | Get current user      |

### Products
| Method | Endpoint             | Access | Description                 |
|--------|----------------------|--------|-----------------------------|
| GET    | /api/products        | Public | List products (search/sort) |
| GET    | /api/products/:id    | Public | Get single product          |
| POST   | /api/products        | Admin  | Create product              |
| PUT    | /api/products/:id    | Admin  | Update product              |
| DELETE | /api/products/:id    | Admin  | Delete product              |

#### Query parameters for GET /api/products
- `search` — text search across name, description, category
- `category` — filter by category (Electronics, Clothing, Accessories, Home, Beauty)
- `sort` — `newest` | `price_asc` | `price_desc` | `name_asc`
- `page` — page number (default 1)
- `limit` — items per page (default 12)

---

## Features

### Week 1 — Static Frontend
- ✅ Home page with hero section + featured products
- ✅ Product listing page
- ✅ Product details page
- ✅ Cart page
- ✅ Fully responsive (mobile + desktop) using CSS Grid & Flexbox

### Week 2 — Backend + Dynamic Integration
- ✅ MongoDB with Mongoose models
- ✅ Express REST API with full CRUD
- ✅ Products dynamically fetched from backend
- ✅ Search bar filtering by name/category
- ✅ Cart with localStorage persistence

### Week 3 — Auth, Admin, Deployment
- ✅ JWT user authentication (login + register)
- ✅ Protected admin routes (middleware + React ProtectedRoute)
- ✅ Admin panel: add/edit/delete products with confirmation
- ✅ Cart management: add, remove, update quantity
- ✅ Responsive testing — works on all screen sizes

---

## Deployment

### Render (recommended)
1. Push repo to GitHub
2. Create a **Web Service** for the backend on Render
3. Set environment variables (MONGO_URI, JWT_SECRET, NODE_ENV=production)
4. Create a **Static Site** for the frontend, build command: `npm run build`

### Vercel (frontend only)
```bash
cd frontend
npm run build
vercel deploy
```

### Heroku (full stack)
```bash
heroku create your-app-name
heroku config:set MONGO_URI=... JWT_SECRET=...
git push heroku main
```

---

## Evaluation Criteria Coverage

| Criterion          | Implementation                                            |
|--------------------|-----------------------------------------------------------|
| Functionality      | Full CRUD, auth, cart, search, responsive                |
| Code Quality       | Context API, clean component structure, error handling   |
| Database Design    | Indexed Product schema, role-based User schema           |
| Timely Submission  | Weekly milestones structure matches task requirements    |

---

**Deadline: 5th June, 2026**

Good luck! 🎉
