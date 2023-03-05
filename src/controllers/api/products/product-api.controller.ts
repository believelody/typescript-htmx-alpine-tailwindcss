import { Product, ProductResponse } from '@interfaces/product.interface';
import { httpMiddleware } from '@middlewares/http/http.middleware';
import { fetch } from '@services/fetch';
import { productService } from '@services/product/product.service';
import { queryUtil } from '@utils/query/query.util';
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
	"/more",
	httpMiddleware.limitQueryValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const limit = Number(req.query.limit || queryUtil.limitQueryArray[0]);
			const count = Number(req.query.count || limit);
			if (req.query.count && req.ctx?.fromHTMX) {
				const htmxRes = (await productService.findAll(
					limit,
					count - limit
				)) as ProductResponse;
				if (req.session) {
					req.session.meta = { total: htmxRes.total, limit, count };
				}
				const url = new URL(
					req.headers["hx-current-url"] as string,
					req.headers.host
				);
				if (url.search) {
					url.search = "";
				}
				url.searchParams.append("count", String(count));
				url.searchParams.append("limit", String(limit));
				res.setHeader("HX-Trigger", "product-update-action");
				res.setHeader("HX-Push", `/products${url.search}`);
				return res.render("partials/product/list", {
					...req.ctx,
					meta: { total: htmxRes.total, limit, count },
					products: htmxRes.products,
				});
			}
			throw "Error: count query is undefined or request doesn't come from htmx";
		} catch (error) {
			console.log(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

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