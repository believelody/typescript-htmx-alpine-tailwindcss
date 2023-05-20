import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

export const faqTitle = "Frequently Asked Questions";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.render("pages/faq", { ...req.ctx, title: faqTitle });
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.get("/:name", (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.render(`partials/sidebar/faq-content`, { ...req.ctx, name: req.params.name });
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export const faqController = router;
