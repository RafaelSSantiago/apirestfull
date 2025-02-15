import { isCelebrateError } from "celebrate";
import e, { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message: any = err.message || "Erro interno do servidor";

  if (isCelebrateError(err)) {
    statusCode = 400;
    message = err.details.get("body")?.details.map((errors) => errors.message);
  }
  console.log(err)
  res.status(statusCode).json({
    status: "error"
  });
};
