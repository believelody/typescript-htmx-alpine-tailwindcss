import { homeTitle } from "@controllers/home/home.controller";
import { myProfileTitle } from "@controllers/users/me/me.users.controller";
import { UserResponse } from "@interfaces/user.interface";
import { authService } from "@services/auth/auth.service";
import { fetch } from "@services/fetch";
import { sessionUtil } from "@utils/session/session.util";
import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

export const loginTitle = "Login";

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.ctx.fromHTMX) {
			return res.redirect("/");
		}
		return res.render("partials/modal/login", {
			...req.ctx,
		});
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.get(
	"/login/invalid-credentials",
	(req: Request, res: Response, next: NextFunction) => {
		try {
			return res.render("partials/error/invalid-credentials");
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.post(
	"/login",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			// await new Promise(resolve => setTimeout(resolve, 3000));
			let token = "";
			const { email, password } = req.body;
			const loginRes = await authService.login({ username: email, password });
			if (loginRes.token) {
				token = loginRes.token;
			}
			const user: Omit<UserResponse, "token"> = {
				...req.ctx?.user,
				...loginRes,
				subscribed: false,
				likedPosts: [],
			};
			if (req.session) {
				req.session.token = token;
				req.session.remember = true;
				req.session.user = user;
				req.session.cookie.maxAge = sessionUtil.sessionMaxAge30Days;
			}
			fetch.setHeader("Authorization", `Bearer ${token}`);
			if (req.body.remember) {
				res.cookie("session_token", token, {
					maxAge: sessionUtil.sessionMaxAge30Days,
				});
				res.cookie("session_user", user, {
					maxAge: sessionUtil.sessionMaxAge30Days,
				});
				res.cookie("session_remember", req.body.remember, {
					maxAge: sessionUtil.sessionMaxAge30Days,
				});
			}
			// res.setHeader('HX-Trigger', 'check-auth');
			const returnURL = new URL(req.headers["hx-current-url"] as string);
			return res.redirect(`${returnURL.pathname}${returnURL.search}`);
			// return res.render('pages/user', { ...req.ctx, user, isAuthenticated: true, me: true, title: myProfileTitle });
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.get("/check", (req: Request, res: Response, next) => {
	try {
		return res.render(`partials/auth/${req.query.component}`, {
			...req.ctx,
			currentURLPathname: req.session?.currentURLPathname,
		});
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.post("/logout", (req: Request, res: Response, next) => {
	try {
		req.session?.destroy((err) => {
			if (err) {
				throw err;
			}
		});
		res.clearCookie("session_user");
		res.clearCookie("session_token");
		res.clearCookie("session_remember");
		res.setHeader("HX-Push", "/");
		// res.setHeader('HX-Trigger', 'check-auth');
		// return res.render('pages/home', { ...req.ctx, isAuthenticated: false, title: homeTitle });
		return res.redirect("/");
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export const authController = router;
