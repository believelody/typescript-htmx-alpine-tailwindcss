import express, { NextFunction, Response } from "express";
import { Request } from "../../../interfaces/http.interface";

const router = express.Router();

router.post("/1", async (req: Request, res: Response, next: NextFunction) => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));
		res.setHeader("HX-Trigger", "signal");
		return res.render("partials/form/contact", {
			...req.ctx,
			notify: {
				type: "success",
				title: "Contact",
				message:
					"Nous avons bien reçu votre demande. Nous reviendrons vers vous dans les plus brefs délai.",
			},
		});
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.post("/2", async (req: Request, res: Response, next: NextFunction) => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));
		return res.json({
			notify: {
				type: "success",
				title: "Contact",
				message:
					"Nous avons bien reçu votre demande. Nous reviendrons vers vous dans les plus brefs délai.",
			},
		});
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export default router;
