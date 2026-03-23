#  Luxarist

**High-End Jewelry E-Commerce Management System**

Luxarist is a sophisticated, full-stack e-commerce platform built for the luxury jewelry market. The project is engineered with a **"Logic-First" philosophy**, prioritizing strict data integrity, modular component architecture, and a high-fidelity user interface.

---

##  🏗 Tech Stack

###  Core Frameworks

-  **MongoDB** – NoSQL database chosen for its flexible schema, allowing for complex jewelry metadata (materials, gemstone specs, and weights).

-  **Express.js** – Minimalist web framework for Node.js, handling RESTful API routing and middleware.

-  **React** – Frontend library with a functional, component-based architecture and a "Composition" pattern.

-  **Node.js** – Scalable backend environment managing server-side logic and database integration.

###  Engineering Standards

-  **TypeScript** – Implemented across the entire stack. Advanced Generics and strict Interfaces eliminate runtime errors and provide a self-documenting codebase.

-  **Tailwind CSS** – Utility-first styling approach used to build a bespoke design system. The UI focuses on a "Stone" color palette, serif typography, and generous negative space.

-  **Vite** – High-performance build tool ensuring a rapid development cycle and optimized asset bundling.
---
##  💎 Key Features

###  1. Advanced Admin Management

A comprehensive dashboard built for precision inventory control:

-  **Dynamic Form Engine** – Multi-section product creator (`SectionBasicInfo`, `SectionImages`, `SectionSpecs`) that adapts in real-time based on product categories.

-  **Automated SKU Generation** – Centralized utility that builds unique identifiers (e.g., `RING-DIA-001`) by combining category prefixes with material and gemstone data.

-  **Type-Safe State Handling** – Centralized form state management using a generic `onChange` handler to ensure all product updates strictly match the `AdminProduct` schema.


###  2. Architecture & Design Patterns

-  **Section Composition** – Breaking complex views into isolated, testable components to maintain a "DRY" (Don't Repeat Yourself) codebase.

-  **Centralized Configuration** – Business logic decoupled from the UI, stored in a headless `categoryConfig.ts` for easy scalability and maintenance.

-  **Asset Pipeline** – Integrated image upload services utilizing FormData and asynchronous fetch patterns for real-time asset management.

---
##  🚀 Installation & Setup

###  Clone the Repository

git clone https://github.com/kaethedev/Luxarist.git

cd Luxarist

###  Install Dependencies

Install dependencies for both client and server:

npm install


### Environment Setup

Create a .env file in the root directory with the following variables

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5000

### Launch the Application

Run the development server:

npm run dev