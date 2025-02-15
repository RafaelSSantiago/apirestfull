import { Ijwt } from "../models/jtw.model";

declare global {
  namespace Express {
    interface Request {
      jwtTokenUser?: Ijwt;
    }
  }
}
