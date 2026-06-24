# 💻 BNYTI Academy Management System - Frontend Client

This is the Next.js frontend client for the **Bangladesh National Youth Technical Institute (BNYTI)** Academy Management System. It handles the user interface, branch dashboards, student portal, certificate verification, and real-time online exams.

🔗 **Live Deployment:** [school-management-system-0.netlify.app](https://school-management-system-0.netlify.app)

---

## ⚡ Tech Stack & Features

*   **Framework:** Next.js 16.2 (App Router) & React 19
*   **Styling:** Tailwind CSS (v4) & Radix UI (fully responsive with dark/light themes)
*   **State Management:** TanStack React Query (v5) & React Context API
*   **Forms & Validation:** React Hook Form + Zod
*   **Animations:** Framer Motion (micro-animations) & Lottie React
*   **Key Modules:**
    *   **Public Landing Pages:** Courses, About, Branches list, Contact page.
    *   **Auth Module:** Better Auth client-side session handlers.
    *   **Student Dashboard:** Profile details, admit card/transcript downloads, and live exams.
    *   **Branch Dashboard:** Student list, profiles management, admissions.
    *   **Admin Dashboard:** Branch verification approvals, slider settings, global notifications, notices upload, contact messages table.

---

## ⚙️ Local Development Setup

### 1. Install Dependencies
Make sure you have Node.js (v20+) and your preferred package manager installed:
```bash
pnpm install
# or
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in this directory and define the backend connection:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
AUTH_CLIENT=http://localhost:5000/api/v1/auth
NEXT_PUBLIC_APP_URL=http://localhost:3000
BASE_URL="http://localhost:5000"
```

### 3. Run Development Server
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📁 Main Directories
*   `src/app/` - Next.js App Router folders:
    *   `(admin)` - Admin panel components and route layouts.
    *   `(auth)` - Authentication pages (sign in, sign up).
    *   `(user)` - Student dashboards.
    *   `(public)` - Landing site pages (courses, branch explorer, result checks).
*   `src/components/` - Generic reusable UI components.
*   `src/features/` - Feature-specific UI page chunks.
*   `src/core/` - Providers, hooks, and services.

---

> 📘 For the full architecture, API schema details, and backend database setup instructions, please read the main [Root README](../README.md).
