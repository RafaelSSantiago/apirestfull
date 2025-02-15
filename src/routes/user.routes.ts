import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.options("/*", (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
})

router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.createUser(req, res);
  } catch (error) {
    next(error);
  }
});

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
