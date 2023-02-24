import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

export const contactTitle = "Contact Us";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.render("pages/contact", { ...req.ctx, title: contactTitle });
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export default router;
