import express, { NextFunction, Response, Request } from "express";
// import { Request } from "../../../interfaces/http.interface";
import middlewares from "../../../middlewares";
import service from "../../../services";

const router = express.Router();

router.post(
	"/post/:id",
	middlewares.http.numericParamsValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			const isPostLiked = req.session?.user?.likedPosts?.includes(id);
			const reactions = isPostLiked
				? Number(req.body.reaction) - 1
				: Number(req.body.reaction) + 1;
			const post = await service.user.me.reactToPost(id, reactions);
			if (req.session?.user) {
				req.session.user.likedPosts = req.session.user.likedPosts?.length
					? isPostLiked
						? req.session.user.likedPosts?.filter((l) => l !== Number(id))
						: [Number(id), ...req.session.user.likedPosts]
					: [];
				if (req.cookies.session_remember) {
					res.cookie("session_user", req.session.user);
				}
			}
			return res.redirect(
				new URL(req.headers["hx-current-url"] as string).pathname
			);
		} catch (error) {
			console.log(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

export default router;
