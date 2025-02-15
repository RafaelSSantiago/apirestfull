import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.util";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Token not provided." });
    return;
  }

  const [, token] = authHeader.split(" ");

  const decoded = verifyToken(token);
  req.jwtTokenUser = {
    id: decoded.id,
    email: decoded.email,
  };

  if (decoded) {
    next();
  } else {
    res.status(401).json({ message: "Invalid Token." });
    return;
  }
};
