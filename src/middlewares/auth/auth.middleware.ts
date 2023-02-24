import { NextFunction, Response, Request } from "express";

const setCheckAuthAsHxTrigger = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "GET" && !req.originalUrl.includes("/api")) {
    res.setHeader('HX-Trigger', 'check-auth');
  }
  next();
}

const checkAuthenticatedUserAndRedirect = (req: Request, res: Response, next: NextFunction) => {
  if (req.session?.user) {
    return res.redirect("/");
  }
  next();
}

const checkUnauthenticatedUserAndRedirect = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) {
    if (req.ctx?.fromHTMX) {
      res.setHeader('HX-Push', '/login');
      res.statusCode = 401;
      return res.render("pages/login", { ...req.ctx, title: "Login" });
    } else {
      return res.redirect('/login');
    }
  }
  next();
}

const populateMeInContext = (req: Request, res: Response, next: NextFunction) => {
  if (req.ctx?.isAuthenticated) {
    req.ctx = { ...req.ctx, me: true };
  }
  next();
}

export const authMiddleware = { setCheckAuthAsHxTrigger, checkAuthenticatedUserAndRedirect, checkUnauthenticatedUserAndRedirect, populateMeInContext };