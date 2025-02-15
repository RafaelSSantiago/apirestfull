import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.contentType("application/json");

  if (req.headers["content-type"] !== "application/json" && req.method !== "GET") {
    res.status(415).json({
      error: "Midia não suportada",
      message: "Essa API aceita apenas application/json",
    });
    return;
  }

  next();
});

app.use(express.json());

app.use(errorHandler);

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API ON");
});

export default app;
