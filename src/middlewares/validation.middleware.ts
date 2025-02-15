import { celebrate, Segments } from "celebrate";
import { RequestHandler } from "express";

export const validate = (schema: any): RequestHandler => {
  return celebrate(
    {
      [Segments.BODY]: schema,
    },
    {
      abortEarly: false,
    }
  );
};
