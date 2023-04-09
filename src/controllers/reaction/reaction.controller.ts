import { httpMiddleware } from "@middlewares/http/http.middleware";
import { userService } from "@services/user/user.service";
import express, { NextFunction, Response, Request } from "express";

const router = express.Router();

router.post(
	"/post/:id",
	httpMiddleware.numericParamsValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			const isPostLiked = req.session?.user?.likedPosts?.includes(id);
			const reactions = isPostLiked
				? Number(req.body.reaction) - 1
				: Number(req.body.reaction) + 1;
			await userService.me.reactToPost(id, reactions);
			if (req.session?.user) {
				req.session.user.likedPosts = !req.session.user.likedPosts?.length
					? [id]
					: isPostLiked
						? req.session.user.likedPosts?.filter((l) => l !== id)
						: [id, ...req.session.user.likedPosts];
				if (req.cookies.session_remember) {
					res.cookie("session_user", req.session.user);
				}
			}
			return res.redirect(
				new URL(req.headers["hx-current-url"] as string).pathname
			);
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.post(
	"/product/:id",
	httpMiddleware.numericParamsValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			const isProductLiked = req.session?.user?.likedProducts?.includes(id);
			const reactions = isProductLiked
				? Number(req.body.reaction) - 1
				: Number(req.body.reaction) + 1;
			await userService.me.reactToPost(id, reactions);
			if (req.session?.user) {
				req.session.user.likedProducts = !req.session.user.likedProducts?.length
					? [id]
					: isProductLiked
					? req.session.user.likedProducts?.filter((l) => l !== id)
					: [id, ...req.session.user.likedProducts];
				console.log(req.session.user.likedProducts);
				if (req.cookies.session_remember) {
					res.cookie("session_user", req.session.user);
				}
			}
			return res.redirect(
				new URL(req.headers["hx-current-url"] as string).pathname
			);
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

export const reactionController = router;
