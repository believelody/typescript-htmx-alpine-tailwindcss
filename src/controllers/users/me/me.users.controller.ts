import { httpMiddleware } from "@middlewares/http/http.middleware";
import { userService } from "@services/user/user.service";
import { queryUtil } from "@utils/query/query.util";
import { urlUtil } from "@utils/url/url.util";
import express, { NextFunction, Response, Request } from "express";

const router = express.Router();

export const myProfileTitle = "My Profile";
export const myProfilePostsTitle = "My Posts";
export const myProfileTodosTitle = "My Todos";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.render("pages/user", { ...req.ctx, title: myProfileTitle });
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.get(
	"/posts",
	httpMiddleware.limitQueryValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const limit = Number(req.query.limit || queryUtil.limitQueryArray[0]);
			const page = Number(req.query.page) || 1;
			const user = req.ctx?.user;
			if (!user) {
				throw new Error("user is null");
			}
			const { posts, total } = await userService.me.findPosts(
				user.id,
				limit,
				limit * (page - 1)
			);
			res.render("pages/posts-2", {
				...req.ctx,
				posts,
				meta: { pages: Math.round(total / Number(limit)), page, limit, total },
				title: myProfilePostsTitle,
				breadcrumbs: [
					{
						url: `/users/me`,
						label: "My Profile",
					},
					{
						label: `My Posts`,
					},
				],
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.get(
	"/posts/:id",
	httpMiddleware.numericParamsValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const user = req.ctx?.user;
			if (!user) {
				throw new Error("user is null");
			}
			const { author, nextPost, post, prevPost } =
				await userService.me.findPostById(user.id, Number(id));
			const backURL = urlUtil.retrieveAppropriateBackUrl(
				req.headers["hx-current-url"] as string,
				`/users/${id}/posts`
			);
			return res.render("pages/posts-2/id", {
				...req.ctx,
				post: {
					...post,
					url: {
						back: backURL,
						prev: prevPost && `/users/me/posts/${prevPost.id}`,
						next: nextPost && `/users/me/posts/${nextPost.id}`,
					},
				},
				author,
				title: post.title,
				breadcrumbs: [
					{
						url: `/users/me`,
						label: "My Profile",
					},
					{
						url: backURL,
						label: `My Posts`,
					},
					{
						label: post.title,
					},
				],
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

export const meUsersController = router;
