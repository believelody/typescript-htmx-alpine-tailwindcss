import { httpMiddleware } from '@middlewares/http/http.middleware';
import { userService } from '@services/user/user.service';
import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.get('/:id/author-name', httpMiddleware.numericParamsValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const author = await userService.findAuthor(Number(id));
    return res.render("partials/element/author", { ...req.ctx, author });
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
});

export const userApiController = router;