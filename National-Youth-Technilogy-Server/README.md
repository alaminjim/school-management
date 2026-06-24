# 🎛️ BNYTI Academy Management System - Backend API

This is the Express.js (TypeScript) REST API backend for the **Bangladesh National Youth Technical Institute (BNYTI)** Academy Management System. It manages the database, executes auth flows, computes results/grades, generates official PDFs, and handles payment gateway queries.

---

## ⚡ Tech Stack & Features

*   **Runtime:** Node.js & Express.js (TypeScript)
*   **Database ORM:** Prisma ORM (Version 7.x)
*   **Database Engine:** PostgreSQL
*   **Authentication:** Better Auth (Database sessions with multi-role permissions: Super Admin, Branch User, Student)
*   **Security:** Helmet, Express Rate Limit, CORS configuration
*   **Key Modules:**
    *   **Student Profile & Grade Processor:** CGPA/GPA computations, subject credits, written/viva/practical grades.
    *   **Document Generation Engine:** Generates official PDFs (Admit Cards, Transcripts, Completion Certificates, ID Badges) using EJS templates.
    *   **Exam Evaluator:** Validates real-time MCQ options, counts attempts, restricts retries, and computes immediate scores.
    *   **Branch Approvals:** Verifies, approves, and holds branch login registrations.
    *   **Email Notification System:** Auto-sends emails via Nodemailer with customized HTML/EJS configurations.
    *   **SSLCommerz Gateway Integration:** Handles regional checkout queries and updates database logs.

---

## ⚙️ Local Development Setup

### 1. Install Dependencies
Ensure you have Node.js (v20+) and your package manager configured:
```bash
pnpm install
# or
npm install
```

### 2. Configure Environment Variables
Create a `.env` file from the example:
```bash
cp .env.example .env
```
Provide the following credentials:
*   `DATABASE_URL`: PostgreSQL database link.
*   `BETTER_AUTH_SECRET`: Random hash.
*   `EMAIL_SENDER_SMTP_USER` & `EMAIL_SENDER_SMTP_PASS`: SMTP email coordinates.

### 3. Generate Database Client & Sync Schema
The database schema is modularly split under `prisma/`. Use Prisma CLI to generate client and synchronize databases:
```bash
pnpm prisma generate
pnpm prisma db push
```

### 4. Seed Seed Data & Launch Dev Server
```bash
pnpm run seed
pnpm run dev
```
The server will boot up and start listening on `http://localhost:5000`.

---

## 📂 Core Endpoints Map

A JSON layout of available routes can be inspected in [ENDPOINTS.json](./ENDPOINTS.json). Major namespaces:
*   `/api/v1/auth/*` - Better Auth session handlers.
*   `/StudentsList` - Manage student records and generate credentials.
*   `/allBranches` - Branch validation dashboard.
*   `/api/generate-pdf/*` - PDF builder controllers.
*   `/OnlineExam` - MCQ submissions and scoring.

---

> 📘 For client integration details and the live application structure, read the main [Root README](../README.md).
