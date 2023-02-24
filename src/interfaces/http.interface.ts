import { Request as ExpressResquest } from "express";
import { Meta } from "./meta.interface";
import { HttpSession } from "./session.interface";
import { Author, User } from "./user.interface";

export interface HttpContext {
	user?: User;
	fromHTMX?: boolean;
	isAuthenticated?: boolean;
	currentURLPathname?: string;
	layout?: null;
  error?: string;
  title?: string;
  me?: boolean;
  meta?: Meta;
  author?: Author;
}

export interface Request extends Omit<ExpressResquest, "session"> {
	ctx?: HttpContext;
	session?: HttpSession;
}