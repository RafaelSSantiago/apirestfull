import { Request, Response, NextFunction } from "express";

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const oldJson = res.json;

  res.json = function (data) {
    const result = {
      status: res.statusCode,
      data,
    };
    return oldJson.call(this, result);
  };

  next();
};
