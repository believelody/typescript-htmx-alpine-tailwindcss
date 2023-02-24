import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.get('/update-action', (req: Request, res: Response, next: NextFunction) => {
  try {
    req.ctx = { ...req.ctx, meta: req.session?.meta };
    return res.render("partials/product/action", req.ctx);
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
});

export const productsApiController = router;