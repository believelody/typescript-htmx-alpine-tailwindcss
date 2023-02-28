import { Product } from '@interfaces/product.interface';
import { httpMiddleware } from '@middlewares/http/http.middleware';
import { fetch } from '@services/fetch';
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

router.get(
	"/:id/image",
	httpMiddleware.numericParamsValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			const product = (await fetch.get(`/products/${id}?select=thumbnail,title`)) as Product;
			return res.render("partials/image/default", { ...req.ctx, src: product.thumbnail, alt: product.title });
		} catch (error) {
			console.log(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);
export const productsApiController = router;