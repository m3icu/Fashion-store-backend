# 🛍️ Fashion Store Backend

A modern RESTful e-commerce backend built with **Node.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**. This project supports product management, product variants, shopping cart, checkout, order management, stock control, and Shopee product synchronization through Excel imports.

---

## ✨ Features

### Authentication

* JWT Authentication
* Admin Login
* Customer Registration & Login
* Protected Routes
* Role-based Authorization

### Category Management

* Create Category
* Update Category
* Delete Category
* Get Categories

### Product Management

* Create Product
* Update Product
* Delete Product
* Product Search
* Product Pagination
* Product Sorting
* Product Image Upload
* Product Weight Management

### Product Variants

* Multiple variants per product
* SKU Management
* Individual Price
* Individual Stock
* Variant-based Checkout

### Shopping Cart

* Add Item to Cart
* Update Quantity
* Remove Item
* Cart Summary
* Variant-based Cart

### Checkout & Orders

* Create Order
* Order History
* Order Detail
* Update Order Status
* Automatic Cart Clearing
* Stock Reduction after Checkout

### Shopee Import Engine

* Import Products from Shopee Excel
* Import Variants
* Import Shipping Weight
* Product Synchronization
* Variant Synchronization
* Update Existing Products
* Create New Products Automatically

---

## 🚀 Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Prisma ORM

### Authentication

* JWT
* bcrypt

### File Upload

* Multer

### Validation

* Joi

### Utilities

* XLSX
* Slugify

---

## 📂 Project Structure

```text
src/
│
├── controllers/
├── services/
├── routes/
├── middlewares/
├── validations/
├── lib/
├── uploads/
│
├── prisma/
│
└── app.js
```

---

## 🗄️ Database Design

Main entities:

* Admin
* Customer
* Category
* Product
* ProductVariant
* Cart
* Order
* OrderItem

Relationship:

```text
Category
    │
    ▼
 Product
    │
    ▼
ProductVariant
    │
 ┌──┴─────────┐
 ▼            ▼
Cart      OrderItem
               │
               ▼
             Order
```

---

## 📦 API Features

### Authentication

* Register Customer
* Login Customer
* Register Admin
* Login Admin

### Products

* CRUD Products
* Search Products
* Pagination
* Category Filter
* Product Detail

### Variants

* Variant-based Inventory
* Variant Stock
* Variant Pricing

### Cart

* Add to Cart
* Update Cart
* Delete Cart Item
* Cart Summary

### Orders

* Checkout
* Order History
* Order Detail
* Update Order Status

---

## 📈 Shopee Synchronization

The backend includes a Shopee synchronization engine capable of importing:

* Product Information
* Sales Information
* Shipping Weight
* Product Variants
* Stock
* Prices

Current tested dataset:

* Products : 2,900+
* Variants : 14,000+
* Zero import errors

---

## ⚙️ Installation

Clone repository

```bash
git clone https://github.com/m3icu/fashion-store-backend.git
```

Install dependencies

```bash
npm install
```

Create environment file

```env
DATABASE_URL=
JWT_SECRET=
PORT=3000
```

Run migration

```bash
npx prisma migrate dev
```

Run project

```bash
npm run dev
```

---

## 📌 Future Improvements

* Dashboard Statistics
* Payment Gateway Integration
* Shipping API Integration
* Product Image Synchronization
* Wishlist
* Product Reviews
* Email Notifications
* Docker Support
* CI/CD Pipeline

---

## 👨‍💻 Author

Developed as a personal portfolio project to demonstrate backend development skills using Express.js, Prisma ORM, PostgreSQL, and RESTful API architecture.
