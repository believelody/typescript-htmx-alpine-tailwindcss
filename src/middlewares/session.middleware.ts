import { NextFunction, Response } from "express";
import { Request } from "../interfaces/http.interface";
import api from "../services/api";

const populateUserSessionInContext = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.cookies.session_user;
  const token = req.cookies.session_token;
  if (req.session) {
    req.session.user = user ?? req.session?.user;
    req.session.token = token ?? req.session?.token;
    if (req.session?.user && req.session?.token) {
      api.setHeader('Authorization', `Bearer ${req.session.token}`)
      req.ctx = { ...req.ctx, user: req.session.user, isAuthenticated: !!req.session.user };
    }
  }
  next();
}

export default { populateUserSessionInContext };