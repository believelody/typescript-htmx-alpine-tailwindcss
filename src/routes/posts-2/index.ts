import express, { Request, NextFunction, Response } from "express";
import middlewares from "../../middlewares";
import service from "../../services";
import utils from "../../utils";

const router = express.Router();

export const postsTitle = "Posts with input pagination";

router.get(
	"/",
	middlewares.http.limitQueryValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const limit = Number(req.query.limit || utils.http.limitQueryArray[0]);
			const page = Number(req.query.page) || 1;
			const { posts, total } = await service.post.fetchAll(
				limit,
				limit * (page - 1),
				"/posts-2"
			);
			return res.render("pages/posts-2", {
				...req.ctx,
				posts,
				meta: { pages: Math.round(total / limit), page, limit, total },
				title: postsTitle,
			});
		} catch (error) {
			console.log(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.get(
	"/:id",
	middlewares.http.numericParamsValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const { post, prevPost, nextPost, author } = await service.post.fetchById(
				Number(id)
			);
			const user = req.session?.user;
			const liked = user?.likedPosts?.includes(Number(id));
			return res.render("pages/posts-2/id", {
				...req.ctx,
				post: {
					...post,
					liked,
					reactions: liked ? ++post.reactions : post.reactions,
					url: {
						back: utils.url.retrieveAppropriateBackUrl(
							req.headers["hx-current-url"] as string,
							"/posts-2"
						),
						prev: prevPost.id && `/posts-2/${prevPost.id}`,
						next: nextPost.id && `/posts-2/${nextPost.id}`,
					},
				},
				author,
				title: post.title,
			});
		} catch (error) {
			console.log(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

export default router;
