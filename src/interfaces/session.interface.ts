import { Session, SessionData } from "express-session";
import { HttpContext } from "./http.interface";

export interface HttpSession extends Session, SessionData, HttpContext {
  token?: string;
  remember?: boolean;
}