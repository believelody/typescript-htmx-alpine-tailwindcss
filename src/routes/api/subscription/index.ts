import express, { NextFunction, Response } from "express";
import { Request } from "../../../interfaces/http.interface";

const router = express.Router();

router.post("/1", async (req: Request, res: Response, next: NextFunction) => {
	try {
		await new Promise((r) => setTimeout(r, 2000));
		// throw new Error('');
		const user = req.ctx?.user;
		if (user?.subscribed) {
			res
				.status(400)
				.send({
					subscription:
						"Your email already exists. Try something else or contact us for more help.",
				});
		} else if (user) {
			user.subscribed = true;
			if (req.session) {
				req.session.user = user;
			}
		}
		return res.render("partials/success/subscription", { ...req.ctx, user });
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.post("/2", async (req: Request, res: Response, next: NextFunction) => {
	try {
		await new Promise((r) => setTimeout(r, 2000));
		const user = req.ctx?.user;
		if (user?.subscribed) {
			res
				.status(400)
				.json({
					subscription:
						"Your email already exists. Try something else or contact us for more help.",
				});
		} else if (user) {
			if (req.session) {
				req.session.user = { ...user, subscribed: true };
			}
		}
		return res.json({ success: true });
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export default router;
