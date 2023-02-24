import express, { NextFunction, Response } from 'express';
import { Request } from '../../../interfaces/http.interface';
import middlewares from '../../../middlewares';
import service from '../../../services';

const router = express.Router();

router.get('/post/:id', middlewares.http.numericParamsValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const { comments, total, limit } = await service.post.fetchPostComments(Number(req.params.id));
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
    await service.user.me.commentPost({
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

export default router;