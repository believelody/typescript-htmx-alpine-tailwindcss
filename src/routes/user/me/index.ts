import express, { NextFunction, Response } from 'express';
import { Request } from '../../../interfaces/http.interface';
import middlewares from '../../../middlewares';
import service from '../../../services';
import utils from '../../../utils';

const router = express.Router();

export const myProfileTitle = 'My Profile';
export const myProfilePostsTitle = 'My Posts';
export const myProfileTodosTitle = 'My Todos';

router.get('/', (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.render("pages/user", { ...req.ctx, title: myProfileTitle });
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.get('/posts', middlewares.http.limitQueryValidator, async (req: Request, res: Response, next: NextFunction) => {
	try {
			const limit = Number(req.query.limit || utils.http.limitQueryArray[0]);
			const page = Number(req.query.page) || 1;
			const user = req.ctx?.user;
			if (!user) {
				throw "Error route /me/posts: user is null";
			}
			const { posts, total } = await service.user.me.fetchPosts(
				user.id,
				limit,
				limit * (page - 1)
			);
			res.render("pages/posts-2", {
				...req.ctx,
				posts,
				meta: { pages: Math.round(total / Number(limit)), page, limit, total },
				title: myProfilePostsTitle,
			});
		} catch (error) {
			console.log(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
});

router.get('/posts/:id', middlewares.http.numericParamsValidator, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const user = req.ctx?.user;
		if (!user) {
			throw "Error route /me/post:id: user is null";
		}
		const { author, nextPost, post, prevPost } = await service.user.me.fetchPostById(user.id, Number(id));
		return res.render('pages/posts-2/id', {
			...req.ctx,
			post: {
				...post,
				url:
				{
					back: utils.url.retrieveAppropriateBackUrl(req.headers['hx-current-url'] as string, `/users/${id}/posts`),
					prev: prevPost && `/users/me/posts/${prevPost.id}`,
					next: nextPost && `/users/me/posts/${nextPost.id}`
				}
			},
			author,
			title: post.title
});
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export default router;