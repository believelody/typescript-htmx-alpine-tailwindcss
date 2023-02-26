import { httpMiddleware } from "@middlewares/http/http.middleware";
import { postService } from "@services/post/post.service";
import { queryUtil } from "@utils/query/query.util";
import { urlUtil } from "@utils/url/url.util";
import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

export const postsTitle = "Posts with select pagination";

router.get(
	"/",
	httpMiddleware.limitQueryValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const limit = Number(req.query.limit || queryUtil.limitQueryArray[0]);
			const page = Number(req.query.page) || 1;
			const { posts, total } = await postService.findAll(
				limit,
				limit * (page - 1),
				"/posts-1"
			);
			return res.render("pages/posts-1", {
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
	httpMiddleware.numericParamsValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const { post, prevPost, nextPost, author } = await postService.findOneById(
				Number(id)
			);
			const user = req.session?.user;
			const liked = user?.likedPosts?.includes(Number(id));
			return res.render("pages/posts-1/id", {
				...req.ctx,
				post: {
					...post,
					liked,
					reactions: liked ? ++post.reactions : post.reactions,
					url: {
						back: urlUtil.retrieveAppropriateBackUrl(
							req.headers["hx-current-url"] as string,
							"/posts-1"
						),
						prev: prevPost.id && `/posts-1/${prevPost.id}`,
						next: nextPost.id && `/posts-1/${nextPost.id}`,
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

export const posts1Controller = router;
