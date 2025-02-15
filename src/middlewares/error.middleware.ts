import e, { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno do servidor";
  console.log('recebi este erro', err)
  res.status(statusCode).json({
    status: "error",
    message,
  });
};
