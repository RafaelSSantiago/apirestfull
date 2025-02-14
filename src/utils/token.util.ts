import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "ecb";

interface IJwtPayload {
  id: string;
  email: string;
}

export const generateToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): IJwtPayload => {
  return jwt.verify(token, SECRET) as IJwtPayload;
};
