Summary of APIs discovered in `zahid-bin-anis-server/index.js`

Notes:

- `zahid-bin-anis-server` is a large single-file Express app (~4k LOC) using MongoDB and Firebase Admin for auth.
- `bteb` is a TypeScript Express app with modular routes (`/api/v1`) and `better-auth` integration.
- Goal: port routes from `zahid-bin-anis-server` into `bteb` modules, using Prisma + PostgreSQL and `better-auth`/improved auth.

High-level grouping (suggested modules):

- auth
  - current: Firebase token verification (`verifyToken`, `verifyAdmin`, etc.)
  - bteb: keep `auth` module; replace Firebase checks with `better-auth` + Prisma user table

- notices / noticeboard
  - POST /NoticeAdd
  - GET /NoticeAdd
  - DELETE /NoticeAdd/:id
  - (maps -> `modules/notice`)

- subjects
  - POST /subjectAdder
  - GET /subjectAdder
  - DELETE /subjectAdder/:id
  - (maps -> `modules/subject`)

- pdf & document generation
  - GET /api/generate-pdf/:studentId
  - POST /api/generate-admit-card
  - POST /api/generate-registration-Card
  - POST /api/generate-certificate
  - POST /api/generate-transcript
  - POST /api/generate-transcriptOne
  - POST /api/generate-NIDCard
  - (maps -> `modules/documents`)

- branches / courses / students
  - many endpoints: /allBranches, /allCourses, /addCourse, /deleteCourse/:id, /StudentsList (GET/POST/PATCH/DELETE), /studentResult/:studentId, /student-profile/:studentId, /OnlineExam, /OnlineExamPageAddAdmin, /ExamSuggestion
  - (maps -> `modules/branches`, `modules/courses`, `modules/students`, `modules/exams`)

- footer, cards, info cards, home slider, success students
  - /footer (GET/POST/PUT/DELETE)
  - /cards (GET/POST/PUT/DELETE)
  - /successStudents (GET/POST/PUT/DELETE)
  - /InfoCard (GET/POST/PUT/DELETE)
  - /homeSlider (GET/POST/DELETE)
  - (maps -> `modules/content` or split into `footer`, `cards`, `home` modules)

- OMR / admin messages / tables
  - /api/OMRSheet (POST/GET/DELETE)
  - /api/AdminMessageOMRSheet (POST/GET/DELETE)
  - /api/AllTable (POST/GET/DELETE)
  - (maps -> `modules/omr`)

- image upload / imgbb
  - POST /upload-to-imgbb
  - endpoints using multer and sharp
  - (maps -> `modules/media`)

- misc
  - /getrole/:email
  - /bulk (bulk insert of questions)
  - /upload-to-imgbb
  - /users
  - /cards

Implementation considerations / next steps:

1. Inventory all endpoints + request/response shapes and dependencies (DB collections used, external services like Firebase, imgbb). Create per-endpoint TODOs.
2. Design Prisma schema (users, branches, courses, students, notices, exams, files, cards, footer, omr, etc.) to replace MongoDB collections.
3. Implement auth: migrate from Firebase token verification to `better-auth` + JWT / session backed by Prisma `User` model. Keep role checks (`admin`, `member`) in middleware.
4. Scaffold modules in `bteb/src/modules/*` matching above groups. Add route files, controllers, services, and Prisma client usage.
5. Port logic incrementally, write unit/integration tests, and run local migrations for PostgreSQL.

Where I found endpoints:

- `zahid-bin-anis-server/index.js` (single-file app, many app.get/post/put/delete handlers)
- `zahid-bin-anis-server/server_init_logs.ts` (bootstrap / health endpoint)

Recommended immediate next action:

- Create a detailed CSV/JSON of all endpoints (method,path,line,brief description) so we can start scaffolding modules automatically. Should I generate that file now?
