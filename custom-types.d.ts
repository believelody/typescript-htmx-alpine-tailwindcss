declare namespace Express {
	interface Request {
		ctx?: HttpContext;
		session?: SessionData;
	}
}

declare namespace ExpressSession {
	export interface SessionData {
		ctx?: HttpContext;
	}
}
