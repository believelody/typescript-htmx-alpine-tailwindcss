import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post("/1", async (req: Request, res: Response, next: NextFunction) => {
	try {
		await new Promise((r) => setTimeout(r, 2000));
		// throw new Error('');
		const user = req.ctx?.user;
		if (user?.subscribed) {
			res
				.status(400)
				.render('partials/modal/subscription-error', {
					error:
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

export const subscriptionController = router;
