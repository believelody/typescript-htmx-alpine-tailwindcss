import { Cart } from "@interfaces/cart.interface";
import { HttpContext } from "@interfaces/http.interface";
import { Meta } from "@interfaces/meta.interface";
import { User } from "@interfaces/user.interface";
import { Session, SessionData } from "express-session";
import { Request } from "express";

declare module "express-session" {
	interface Session {
		ctx?: HttpContext;
		cart?: Cart;
		user?: User;
		token?: string;
		meta?: Meta;
		currentURLPathname: string;
		remember?: boolean;
	}
}

declare module "express-serve-static-core" {
	interface Request {
		ctx?: HttpContext;
		session?: Session;
	}
}
