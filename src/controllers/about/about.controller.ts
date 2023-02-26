import { aboutService } from "@services/about/about.service";
import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const cards = await aboutService.findAll();
		return res.render("pages/about", { ...req.ctx, cards, title: "About Us" });
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export const aboutController = router;
