import { NextFunction, Response } from "express";
import { Request } from "../interfaces/http.interface";

const checkHTMXRequest = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['hx-request']) {
    req.ctx = { ...req.ctx, layout: null, fromHTMX: true };
  }
  // await new Promise(r => setTimeout(r, 2000));
  next();
}

export default { checkHTMXRequest };