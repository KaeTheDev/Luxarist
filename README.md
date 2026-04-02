# Luxarist

> **Full-Stack Luxury Jewelry E-Commerce Platform**  
> Built with the MERN stack — MongoDB, Express, React, Node.js — with strict TypeScript across the entire codebase.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  [![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)  [![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)  [![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)  
----------

## Overview

Luxarist is a production-grade e-commerce platform engineered for the luxury jewelry market. It covers the complete commerce lifecycle — from product discovery and cart management through checkout, order fulfillment, and post-purchase review — with a dedicated admin dashboard for full operational control.

The codebase follows a  **logic-first philosophy**: strict TypeScript contracts, modular component architecture, clean separation of concerns between frontend features and shared UI primitives, and a design system built around quiet luxury aesthetics.

**Live Demo:**  [luxarist.onrender.com](https://luxarist.onrender.com/)

----------

## Features

### Storefront

-   Immersive homepage with dynamic hero video, signature product highlight, and featured collections bento grid — all CMS-editable by admin
-   Category pages with hero banners, filtering, and sorting
-   Product detail pages with image gallery, size selection, variant picking, and related product recommendations
-   Horizontally scrollable new arrivals carousel
-   Favorites system persisted per user

### Cart & Checkout

-   Persistent cart stored in  `localStorage`  via  `CartContext`
-   Slide-out cart drawer with live quantity updates and item removal
-   Full cart page with order notes
-   Checkout with shipping form, mock payment, tax calculation, and real order creation
-   Order confirmation with generated  `LUX-XXXXXX`  order number

### Customer Dashboard

-   Order history with drill-down order detail view
-   Review management — submit, view, and track approval status
-   Account settings — profile editing, password change, saved addresses

### Admin Dashboard

-   **Inventory Manager**  — full product CRUD with multi-section form (basic info, images via ImageKit, specifications)
-   **Order Management**  — view all orders, update status through the fulfillment pipeline
-   **Category Manager**  — create, edit, and delete categories; control hero images, descriptions, and featured status
-   **Customer Directory**  — view all customers with total spend and acquisition metrics
-   **Review Moderation**  — approve or reject customer reviews with Verified Acquisition enforcement
-   **Site Content Manager**  — edit hero section (video, fallback image, heading, CTA) and signature collection (product, image, all text) without touching code

### Authentication & Authorization

-   JWT-based authentication with role-based access control (`customer`  /  `admin`)
-   Protected routes with automatic redirection
-   Auth modal with login and registration tabs

### Performance & UX

-   Skeleton loading states for all async components (product grid, carousel, bento grid, product detail, signature section)
-   Progressive page rendering — no full-page loading guards
-   `useClickOutside`  hook for consistent dropdown/drawer dismiss behavior

----------

## Tech Stack

Layer

Technology

Frontend

React 19, TypeScript, Vite, Tailwind CSS

Backend

Node.js, Express, TypeScript

Database

MongoDB, Mongoose

Auth

JWT (JSON Web Tokens), bcryptjs

Media

ImageKit

Containerization

Docker, Docker Compose, nginx

Deployment

Render (backend + frontend), MongoDB Atlas

----------

## Project Structure

```
Luxarist/
├── client/                        # React frontend (Vite)
│   ├── src/
│   │   ├── api/                   # Axios instance + service functions
│   │   ├── common/                # Shared UI primitives, layout, navigation
│   │   │   ├── layout/            # MainLayout, Footer, CartDrawer
│   │   │   ├── navigation/        # Navbar, DesktopNav, MobileNav, ShopDropdown
│   │   │   └── ui/                # Skeleton components, ProductCard, ProductList
│   │   ├── context/               # CartContext, AuthContext
│   │   ├── features/              # Feature-scoped components and hooks
│   │   │   ├── auth/
│   │   │   ├── cart/              # CheckoutPage sub-components, types
│   │   │   ├── dashboard/         # Admin + Customer dashboard features
│   │   │   ├── home/              # Homepage sections
│   │   │   └── product-details/   # PDP components, review system
│   │   ├── hooks/                 # Shared hooks (useAllCategories, useSiteContent, etc.)
│   │   ├── pages/                 # Route-level page components
│   │   └── types/                 # Shared TypeScript interfaces
│   ├── Dockerfile
│   └── nginx.conf
│
├── server/                        # Express backend
│   ├── src/
│   │   ├── config/                # DB connection, env validation
│   │   ├── controllers/           # Route handler logic
│   │   ├── middleware/            # Auth, error handling, validation
│   │   ├── models/                # Mongoose schemas (User, Product, Order, Review, Category, SiteContent)
│   │   ├── routes/api/            # Express routers
│   │   ├── services/              # Business logic (order service, review service)
│   │   └── utils/                 # JWT utilities
│   └── Dockerfile
│
├── docker-compose.yml
├── .dockerignore
└── README.md

```

----------

## Getting Started

### Prerequisites

-   [Node.js 20+](https://nodejs.org/)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)  (for Docker setup)
-   [MongoDB Atlas](https://www.mongodb.com/atlas)  account (for local non-Docker setup)

----------

### Option 1 — Docker Compose (Recommended)

Runs the full stack locally with MongoDB in a container. No external database required.

**1. Clone the repository**

```bash
git clone https://github.com/your-username/Luxarist.git
cd Luxarist

```

**2. Create a root  `.env`  file**

```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
ADMIN_SECRET_PASSCODE=your_admin_passcode

```

**3. Build and start all services**

```bash
docker-compose up --build

```

**4. Access the application**

Service

URL

Frontend

http://localhost:5173

Backend API

http://localhost:3001

MongoDB

localhost:27017

**Stop the application**

```bash
docker-compose down          # Stop containers, keep data
docker-compose down -v       # Stop containers and delete MongoDB volume

```

----------

### Option 2 — Local Development (No Docker)

**1. Clone the repository**

```bash
git clone https://github.com/your-username/Luxarist.git
cd Luxarist

```

**2. Install dependencies**

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install

```

**3. Configure environment variables**

Create  `server/.env`:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
PORT=3001
ADMIN_SECRET_PASSCODE=your_admin_passcode
FRONTEND_URL=http://localhost:5173

```

Create  `client/.env`:

```env
VITE_API_URL=http://localhost:3001

```

**4. Seed the database**

```bash
cd server
npm run seed

```

**5. Start both servers**

In one terminal:

```bash
cd server && npm run dev

```

In another terminal:

```bash
cd client && npm run dev

```

**6. Access the application**

Service

URL

Frontend

http://localhost:5173

Backend API

http://localhost:3001

----------

## Environment Variables

### Server (`server/.env`)

Variable

Required

Description

`MONGO_URI`

✅

MongoDB connection string

`JWT_SECRET`

✅

Secret key for signing JWTs

`JWT_EXPIRES_IN`

✅

Token expiry (e.g.  `7d`)

`PORT`

✅

Server port (default  `3001`)

`ADMIN_SECRET_PASSCODE`

✅

Passcode to register admin accounts

`FRONTEND_URL`

✅

Allowed CORS origin

### Client (`client/.env`)

Variable

Required

Description

`VITE_API_URL`

✅

Backend API base URL

----------

## API Reference

All endpoints are prefixed with  `/api`.

Resource

Base Route

Auth

Auth

`/api/auth`

Public / Private

Products

`/api/products`

Public

Categories

`/api/categories`

Public

Orders

`/api/orders`

Private

Reviews

`/api/reviews`

Private

Site Content

`/api/site-content`

Public (GET) / Admin (PUT)

Admin

`/api/admin`

Admin only

----------

## Key Architectural Decisions

**Singleton SiteContent document**  — The homepage hero and signature section are controlled via a single MongoDB document using  `findOneAndUpdate`  with upsert. No manual seeding required — defaults are populated on first request.

**Verified Acquisition reviews**  — Customers can only review products from orders with  `Delivered`  status. Enforced at the API level via  `orderService.verifyPurchase()`.

**CartContext owns drawer state**  —  `isCartOpen`,  `openCart`, and  `closeCart`  live in  `CartContext`  so any component (e.g.  `ProductActions`) can trigger the drawer after  `addItem()`  without prop drilling.

**Feature-scoped architecture**  — Components live in  `features/`  folders scoped to their domain. Only truly shared, stateless UI primitives live in  `common/ui/`. This keeps feature complexity contained and makes the codebase navigable at scale.

**Skeleton-first loading**  — Every async component renders a layout-accurate skeleton instead of a spinner or blank space, preventing cumulative layout shift (CLS) on initial load and after Render cold starts.

----------

## License

MIT