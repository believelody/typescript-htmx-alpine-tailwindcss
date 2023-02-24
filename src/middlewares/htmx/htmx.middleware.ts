import { NextFunction, Response, Request } from "express";

const checkHTMXRequest = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['hx-request']) {
    req.ctx = { ...req.ctx, layout: null, fromHTMX: true };
  }
  // await new Promise(r => setTimeout(r, 2000));
  next();
}

export const htmxMiddleware = { checkHTMXRequest };