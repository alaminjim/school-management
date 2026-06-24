# 🏫 Bangladesh National Youth Technical Institute (BNYTI)
### Enterprise School, Branch & Academy Management System

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-lightgrey?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-7.x-2d3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.5-orange?style=for-the-badge)](https://better-auth.com/)

A modern, high-performance, full-stack Academic Management & Student Portal system. Specially designed for national training boards or institutes to coordinate multiple branches, process student admissions, administer time-limited online exams, generate official academic documents, and calculate CGPA.

🔗 **Live Website:** [school-management-system-0.netlify.app](https://school-management-system-0.netlify.app)

---

## 📸 Key Portals & Previews
* **Public Portal**: Home slider, Course directory, Branch map, Verification panels.
* **Student Portal**: Student Profile, online exams, PDF document downloads.
* **Branch Dashboard**: Register students, manage profiles, request approvals.
* **Super Admin Control Center**: Branch validation, global notices, question banks, sliders management.

---

## 🚀 Core Features

### 🏢 1. Multi-Branch Network Management
- **Autonomous Branches**: Registered branches function as separate educational units under the board.
- **Workflow Approvals**: New branch requests default to `PENDING` state and require verification, approval, or rejection from the Super Admin.
- **Branch Profiles**: Includes director name, logo upload, official signature image, and geolocation information.

### 🎓 2. Student Registry & Admissions
- **Admission Forms**: Complete profile registry including personal info, academic background, signature, and headshot.
- **Unique ID Generation**: Automated, collision-free allocation of Student IDs, Roll numbers, and Registration numbers.
- **Dashboard Records**: Comprehensive searchable list of active students.

### 📄 3. Automated PDF & Academic Document Generation
Generates official, beautifully-formatted, print-ready PDF files dynamically via backend:
- 🎟️ **Admit Cards**: Instant admit card processing for final examinations.
- 📇 **Registration Cards**: Student credentials for course enrollment.
- 🎓 **Completion Certificates**: Authentic graduation credentials.
- 📊 **Semester Transcripts / Marksheets**: Dynamic calculation of credits, points, GPA, grade letters, and overall CGPA based on written, practical, and viva scores.
- 💳 **National-ID Style Student Cards**: Modern double-sided badge rendering for ID badges.

### ✍️ 4. Interactive Online Exam Portal
- **MCQ Engines**: Admins upload and format exam questionnaires.
- **Restricted Access**: Students require admin clearance (`examAllowed`) to launch final tests.
- **Real-Time Testing**: Automated timers, submission monitors, and attempt constraints to prevent retries.
- **Instant Evaluation**: Immediate evaluation of answers, displaying score summaries and correct key overlays.

### ⚙️ 5. Content Management (CMS) & Noticeboards
- **Global Notices**: Broadcast PDF documents and warning alerts across all panels.
- **Noticeboard Tickers**: Dynamic notification marquee on the landing screen.
- **Interactive Forms**: User contact queries fed directly to the admin backend.
- **Slider Control**: Direct management of landing page media sliders and team highlights.

### 🔍 6. Public Verification Registry
- **Result Verification**: Verify specific student marks and grades by inputting roll and registration credentials.
- **Branch Directory**: View verified branches across the country.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** Next.js 16.2 (App Router) & React 19
- **State Management:** TanStack React Query (v5)
- **Styling:** Tailwind CSS (v4) & Radix UI (Sleek dark/light theme support)
- **Animations:** Framer Motion & Lottie React
- **Forms:** React Hook Form & Zod Schema Validation
- **Utilities:** Axios, Lucide Icons, Swiper Slider, SweetAlert2, React QR Code

### Backend (API Server)
- **Server:** Node.js & Express.js (written in clean TypeScript)
- **Database ORM:** Prisma Client (supports modern split-file schemas: `auth.prisma`, `students.prisma`, `exam.prisma`, etc.)
- **Database Engine:** PostgreSQL
- **Authentication:** Better Auth (Modern framework with multi-role configurations)
- **Integrations:** SSLCommerz (Local payment gateway), Nodemailer (Verification emails), EJS (Dynamic template compiling)

---

## 📂 Project Architecture

The codebase splits concerns into frontend and backend workspaces:

```text
school-management/
├── National-Youth-Technilogy/         # Frontend React Application
│   ├── src/
│   │   ├── app/                      # App router: (admin), (user), (public), (auth)
│   │   ├── components/               # Shared UI elements
│   │   ├── context/                  # Theme & Global state providers
│   │   ├── features/                 # Modular page feature components
│   │   └── core/                     # Providers, services, configuration
│   ├── public/                       # Static assets
│   ├── tailwind.config.ts            # Tailwind custom styling setup
│   └── package.json
│
└── National-Youth-Technilogy-Server/  # Backend API Server
    ├── src/
    │   ├── app.ts                    # Application entrypoint
    │   ├── server.ts                 # Server listener configuration
    │   ├── config/                   # CORS, Environment, and Rate Limit configurations
    │   ├── database/                 # Prisma instance
    │   ├── modules/                  # Modular features (auth, students, exams, etc.)
    │   ├── routes/                   # Route routing definitions
    │   └── templates/                # EJS layout structures for emails / PDFs
    ├── prisma/                       # Multi-schema Prisma structures
    └── package.json
```

---

## ⚙️ Development Setup

### Prerequisite Checklist
- **Node.js:** v20.x or higher
- **Package Manager:** `pnpm` (recommended) or `npm`
- **Database:** PostgreSQL instance running

---

### 1. Database & Backend Configuration

1. Navigate to the server folder:
   ```bash
   cd National-Youth-Technilogy-Server
   ```

2. Install server dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Configure your Environment variables:
   Copy the example file to `.env`:
   ```bash
   cp .env.example .env
   ```
   Provide inputs for the following configurations:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `BETTER_AUTH_SECRET`: Generate a cryptographically secure token.
   - `EMAIL_SENDER_SMTP_USER` & `EMAIL_SENDER_SMTP_PASS`: For sending automated emails.
   - `SSL_STORE_ID` & `SSL_STORE_PASSWORD`: Payment gateway credentials (optional for local run).

4. Generate the database client and execute schema sync:
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. Seed initial data (optional):
   ```bash
   pnpm run seed
   ```

6. Launch the development server:
   ```bash
   pnpm run dev
   ```
   The backend API will initialize at `http://localhost:5000`.

---

### 2. Frontend Configuration

1. Navigate to the frontend folder:
   ```bash
   cd ../National-Youth-Technilogy
   ```

2. Install client dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Create the environment configuration file `.env`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
   AUTH_CLIENT=http://localhost:5000/api/v1/auth
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   BASE_URL="http://localhost:5000"
   ```

4. Launch the Next.js development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open your browser and head to `http://localhost:3000`.

---

## 📄 License
This application is proprietary software. All rights reserved. Designed for the Bangladesh National Youth Technical Institute.
