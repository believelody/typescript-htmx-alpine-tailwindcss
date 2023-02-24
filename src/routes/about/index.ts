import express, { Request, NextFunction, Response } from "express";
import service from "../../services";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const cards = await service.about.fetchAll();
		return res.render("pages/about", { ...req.ctx, cards, title: "About Us" });
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export default router;
