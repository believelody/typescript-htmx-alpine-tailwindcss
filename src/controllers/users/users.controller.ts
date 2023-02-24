import { PostResponse, PostsBuilderResponse } from '@interfaces/post.interface';
import { authMiddleware } from '@middlewares/auth/auth.middleware';
import { httpMiddleware } from '@middlewares/http/http.middleware';
import { userService } from '@services/user/user.service';
import { queryUtil } from '@utils/query/query.util';
import { urlUtil } from '@utils/url/url.util';
import express, { NextFunction, Response, Request } from 'express';
import { meUsersController } from './me/me.users.controller';

const router = express.Router();

router.use('/me', authMiddleware.checkUnauthenticatedUserAndRedirect, authMiddleware.populateMeInContext, meUsersController);

router.get('/:id', httpMiddleware.numericParamsValidator, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const user = await userService.fetchById(Number(id));
		return res.render("pages/user", { ...req.ctx, user, title: user.username });
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.get('/:id/posts', httpMiddleware.numericParamsValidator, httpMiddleware.limitQueryValidator, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		const limit = Number(req.query.limit || queryUtil.limitQueryArray[0]);
		const page = Number(req.query.page) || 1;
		const { posts, total } = await userService.fetchPosts(id, limit, limit * (page - 1)) as PostsBuilderResponse;
		const author = await userService.fetchAuthor(id);
		return res.render("pages/posts-1", {
			...req.ctx,
			posts,
			meta: { pages: Math.round(total / Number(limit)), page, limit, total },
			title: `${author.username}'s posts`,
		});
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.get('/:id/posts/:postId', httpMiddleware.numericParamsValidator, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id, postId } = req.params;
		const { author, nextPost, post, prevPost } =
			(await userService.fetchPostById(
				Number(id),
				Number(postId)
			)) as PostResponse;
		return res.render("pages/posts-1/id", {
			...req.ctx,
			post: {
				...post,
				url: {
					back: urlUtil.retrieveAppropriateBackUrl(
						req.headers["hx-current-url"] as string,
						`/users/${id}/posts`
					),
					prev: prevPost && `/users/${id}/posts/${prevPost.id}`,
					next: nextPost && `/users/${id}/posts/${nextPost.id}`,
				},
			},
			author,
			title: post.title,
		});
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export const usersController = router;