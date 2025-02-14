import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.util";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Token não fornecido." });
    return
  }

  const [, token] = authHeader.split(" ");

  const decoded = verifyToken(token);
  req.user = {
    id: decoded.id,
    email: decoded.email,
  };

  if (decoded) {
    next();
  } else {
     res.status(401).json({ message: "Token inválido." });
     return;
  }
};
