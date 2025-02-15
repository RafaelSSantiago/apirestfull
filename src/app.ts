import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./middlewares/error.middleware";
import { responseMiddleware } from "./middlewares/reponse.middleware";
import { defaultCorsOptions } from "./middlewares/cors";
dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  const origin = req.headers.origin;

  if (!origin) {
    res.status(400).json({
      title: "Bad Request",
      status: 400,
      detail: "Origin header is required",
    });
    return;
  }

  if (!(defaultCorsOptions.origin as string).split(",").includes(origin)) {
    res.status(403).json({
      title: "Forbidden",
      status: 403,
      detail: "Origin not allowed",
    });
    return;
  }

  next();
});

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

app.use(errorHandler);

app.use(responseMiddleware);

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API ON");
});

export default app;
