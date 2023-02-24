import express, { Request, NextFunction, Response } from "express";
const router = express.Router();

export const loginTitle = "Login Page";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.render("pages/login", { ...req.ctx, title: loginTitle });
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export default router;
