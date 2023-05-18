import { httpMiddleware } from "@middlewares/http/http.middleware";
import { productService } from "@services/product/product.service";
import { productUtil } from "@utils/product/product.util";
import { queryUtil } from "@utils/query/query.util";
import { urlUtil } from "@utils/url/url.util";
import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

export const brandsTitle = "Brands";

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const brands = await productService.findAllBrands();
		return res.render("pages/brands", {
			...req.ctx,
			brands,
			title: brandsTitle,
		});
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.get(
	"/:name",
	httpMiddleware.limitQueryValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const limit = Number(req.query.limit || queryUtil.limitQueryArray[0]);
			const count = Number(req.query.count || limit);
			const { products, total } = await productService.findByBrand(
				req.params.name
			);
			const backURL = urlUtil.retrieveAppropriateBackUrl(
				req.headers["hx-current-url"] as string,
				"/brands"
			);
			return res.render("pages/brands/name", {
				...req.ctx,
				products: productUtil.addURLToProductItem(
					products,
					`/brands/${req.params.name}`
				),
				meta: { total, limit, count },
				title: req.params.name,
				category: req.params.name,
				breadcrumbs: [
					{
						url: backURL,
						label: "Brands",
					},
					{
						label: req.params.name,
					},
				],
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

export const brandsController = router;
