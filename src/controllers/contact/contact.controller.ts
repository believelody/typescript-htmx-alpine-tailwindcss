import { NotificationType } from "@enums/notification-type.enum";
import { authMiddleware } from "@middlewares/auth/auth.middleware";
import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

export const contactTitle = "Contact Us";

router.get("/", authMiddleware.setCheckAuthAsHxTrigger, (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.render("pages/contact", { ...req.ctx, title: contactTitle });
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.post("/1", async (req: Request, res: Response, next: NextFunction) => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));
		return res.render("partials/notification/contact", {
			notification: {
				type: NotificationType.SUCCESS,
				title: "Contact",
				message:
					"Nous avons bien reçu votre demande. Nous reviendrons vers vous dans les plus brefs délais.",
			},
		});
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.post("/2", async (req: Request, res: Response, next: NextFunction) => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));
		return res.json({
			notify: {
				type: NotificationType.SUCCESS,
				title: "Contact",
				message:
					"Nous avons bien reçu votre demande. Nous reviendrons vers vous dans les plus brefs délai.",
			},
		});
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export const contactController = router;
