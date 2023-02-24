import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

export const homeTitle = "HTMX, Alpine JS & Tailwindcss";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.render("pages/home", { ...req.ctx, title: homeTitle });
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export default router;
