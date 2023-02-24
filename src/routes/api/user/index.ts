import express, { NextFunction, Response } from 'express';
import { Request } from '../../../interfaces/http.interface';
import middlewares from '../../../middlewares';
import service from '../../../services';

const router = express.Router();

router.get('/:id/author-name', middlewares.http.numericParamsValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const author = await service.user.fetchAuthor(Number(id));
    return res.render("partials/element/author", { ...req.ctx, author });
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
});

export default router;