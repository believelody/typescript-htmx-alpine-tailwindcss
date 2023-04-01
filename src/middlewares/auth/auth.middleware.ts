import { NextFunction, Response, Request } from "express";

const setCheckAuthAsHxTrigger = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('HX-Trigger', 'check-auth');
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
    res.setHeader('HX-Reswap', 'beforeend');
    return res.render("partials/modal/login", {
			...req.ctx,
		});
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