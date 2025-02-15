import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import asyncHandler from "express-async-handler";

const router = Router();

router.options("/*", (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

router.post(
  "/signup",
  asyncHandler(async (req: Request, res: Response) => {
    UserController.createUser(req, res);
  })
);

router.post("/signin", async (req: Request, res: Response) => {
  UserController.loginUser(req, res);
});

router.use(authMiddleware);

router.get("/", async (req: Request, res: Response) => {
  UserController.getUserById(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  UserController.getUserById(req, res);
});

router.patch("/:id", async (req: Request, res: Response) => {
  UserController.updateUser(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  void UserController.deleteUser(req, res);
});

export default router;
