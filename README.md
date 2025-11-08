# 🛒 Vibe Commerce — Mock E-Commerce Cart 

A simple **Full Stack Shopping Cart Application** built for the **Vibe Commerce **.  
It demonstrates product listing, add/remove from cart, checkout flow, and database integration using **React, Node.js, and MongoDB**.

---

## 🚀 Features

### 🖥️ Frontend (React + Vite)
- Products grid with **Add to Cart** functionality  
- Cart page showing items, quantities, total price  
- Quantity controls (**+ / − / remove**)  
- Checkout flow with success receipt page  
- Toast notifications for all actions  
- Fully **responsive** design (mobile/tablet/desktop)

### ⚙️ Backend (Node.js + Express + MongoDB)
- RESTful API for:
  - `GET /api/products` — Fetch products
  - `POST /api/cart` — Add/Update item in cart
  - `GET /api/cart` — Get all cart items + total
  - `DELETE /api/cart/:id` — Remove item
  - `POST /api/checkout` — Mock checkout and return receipt
- Error handling with proper HTTP codes
- MongoDB models: `Product`, `Cart`
- Mock data seeding endpoint `/api/products/seed`

---




## 🛠️ Project Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/vibe-commerce-cart.git
cd vibe-commerce-cart
2️⃣ Backend Setup
bash
cd backend
npm install

Create a .env file:
env
Copy code
ctreate an account in mongodbatlas and get user password
MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/e-com"
PORT=5000

Run the backend:
bash
nodemon src/index.js

---

3️⃣ Frontend Setup
bash
cd ../frontend
npm install
npm run dev

Browser
go to
http://localhost:5000/api/products/seed
it will add dummy data produt in the data base and then u can open frontend and ineract with the ui
