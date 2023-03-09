import { Product, ProductResponse } from "@interfaces/product.interface";
import { httpMiddleware } from "@middlewares/http/http.middleware";
import { productService } from "@services/product/product.service";
import { queryUtil } from "@utils/query/query.util";
import { urlUtil } from "@utils/url/url.util";
import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

export const productsTitle = "Products";

router.get(
	"/",
	httpMiddleware.limitQueryValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const limit = Number(req.query.limit || queryUtil.limitQueryArray[0]);
			const count = Number(req.query.count || limit);
			const { products, total } = (await productService.findAll(
				count,
				0
			));
			return res.render("pages/products", {
				...req.ctx,
				products,
				meta: { total, limit, count },
				title: productsTitle,
			});
		} catch (error) {
			console.log(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.get(
	"/:id",
	httpMiddleware.numericParamsValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			const product = (await productService.findOneById(id));
			const prevProductId = id - 1;
			const nextProductId = id + 1;

			return res.render("pages/products/id", {
				...req.ctx,
				product: {
					...product,
					url: {
						back: urlUtil.retrieveAppropriateBackUrl(
							req.headers["hx-current-url"] as string,
							"/products"
						),
						prev: prevProductId && `/products/${prevProductId}`,
						next: nextProductId && `/products/${nextProductId}`,
					},
				},
				title: product.title,
			});
		} catch (error) {
			console.log(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

export const productsController = router;
