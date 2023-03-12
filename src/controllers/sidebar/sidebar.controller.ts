import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get("/menu", (req: Request, res: Response, next: NextFunction) => {
  try {
		return res.render("partials/sidebar/menu", { ...req.ctx });
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export const sidebarController = router;