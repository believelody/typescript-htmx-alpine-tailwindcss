import { httpMiddleware } from '@middlewares/http/http.middleware';
import { postService } from '@services/post/post.service';
import { userService } from '@services/user/user.service';
import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.get('/post/:id', httpMiddleware.numericParamsValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const { comments, total, limit } = await postService.findPostComments(Number(req.params.id));
    return res.render("partials/comment/list", { ...req.ctx, postId: req.params.id, comments, meta: { total, limit } });
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
});

router.post('/post', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = JSON.parse(req.body.post);
    const { userId, comment } = req.body;
    // await new Promise(resolve => setTimeout(resolve, 3000));
    await userService.me.commentPost({
      userId,
      postId: post.id,
      body: comment
    });
    res.setHeader('HX-Trigger', 'add-comment');
    return res.render("partials/form/comment", { ...req.ctx, post });
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
});

export const commentApiController = router;