import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import asyncHandler from "express-async-handler";
import { validate } from "../middlewares/validation.middleware";
import { createUserDto } from "../dtos/create-user.dto";
import { loginUserDto } from "../dtos/login-user.dto";

const router = Router();

router.options("/*", (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

router.post(
  "/signup",
  validate(createUserDto),
  asyncHandler(async (req: Request, res: Response) => {
    await UserController.createUser(req, res);
  })
);

router.post(
  "/signin",
  validate(loginUserDto),
  asyncHandler(async (req: Request, res: Response) => {
    await UserController.loginUser(req, res);
  })
);

router.use(authMiddleware);

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    await UserController.getUserById(req, res);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    await UserController.getUserById(req, res);
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    console.log("aqui")
    await UserController.updateUser(req, res);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    void await UserController.deleteUser(req, res);
  })
);

export default router;
