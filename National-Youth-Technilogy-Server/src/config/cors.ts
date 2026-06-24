import createCors from "cors";
import { envVars } from "./env";

const origin = [
  envVars.FRONTEND_URL as string,
  "http://localhost:3000",
  "https://school-management-system-0.netlify.app",
];

const cors = createCors({
  origin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

export { cors };
