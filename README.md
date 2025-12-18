# Mini Ordering System 🛍️

A streamlined, modern web-based ordering platform designed for small businesses. This project provides a complete solution for sellers to manage their products and orders, while offering customers a seamless checkout experience with integrated Thai PromptPay payments.

> ⚠️ **Note/Disclaimer**: The APIs used in this project (specifically for external services like EasySlip or the Grist instance) may have expired. You will need to provide your own valid API keys in the `.env` file for the project to function correctly.
---

## 🚀 Features

- **Multi-Store Architecture**: Support for multiple distinct storefronts (`/s/:store_id`), allowing the platform to serve various sellers simultaneously..
- **Smart Cart System**: Intuitive product browsing and real-time cart management.
- **Seamless Checkout**:
  - Step-by-step information collection.
  - **PromptPay Integration**: Automatic QR code generation for easy payments.
  - **Slip Verification**: Integration with **EasySlip** for automated payment validation.
- **Seller Dashboard**: A dedicated portal for sellers to track orders, view bills, and manage their store (`/seller/:store_id`).
- **Data Persistence with Grist**: innovative use of Grist as a backend CMS and database for flexible data management.
- **Responsive & Modern UI**: Built with **React 19**, **Tailwind CSS**, and **HeroUI** for a premium mobile-first experience.

## 🛠️ Tech Stack

### Frontend

- **React** & **Vite**: Fast, modern UI development.
- **Tailwind CSS**: Utility-first styling for bespoke designs.
- **HeroUI (NextUI)**: Beautiful, accessible UI components.
- **Framer Motion**: Smooth animations and transitions.

### Backend

- **Node.js** & **Express**: Robust API server.
- **Grist**: Used as a flexible, relatable database/CMS.
- **EasySlip API**: For reliable payment slip verification.

## 📦 Getting Started

### Web Demo Test 
- [Link here!](https://mini-ordering.vercel.app)
- Store ID : STOR00001
- Order ID : b1tUbz

> QR Code Verify API may expired

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mini-ordering
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory. You will need to configure the following services:

   - **Grist Configuration**: API Key and Document ID.
   - **EasySlip**: API Key for slip verification.
   - **Server**: Port configuration (default: 3000).

4. **Run Locally**
   Start both the backend server and frontend client concurrently with a single command:
   ```bash
   npm run dev
   ```
   - **Frontend**: `http://localhost:5173` (typically)
   - **Backend**: `http://localhost:3000`

### Other Scripts

- `npm run client`: Run only the frontend.
- `npm run server`: Run only the backend.
- `npm run build`: Build the frontend for production.
- `npm start`: Start the production server.

---

Developed with ❤️ using modern web technologies.
