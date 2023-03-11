import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.render("pages/500", { ...req.ctx, title: "500 Internal Error" });
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export const error505Controller = router;
