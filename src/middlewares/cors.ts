import type { CorsOptions } from "cors";

export const defaultCorsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "If-None-Match"],
};

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN || "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );