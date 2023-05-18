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

router.get(
	"/:name/:productId",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const name = req.params.name;
			const productId = Number(req.params.productId);
			const product = await productService.findOneById(productId);
			const prevProductId = productId - 1;
			const nextProductId = productId + 1;
			const backURL = urlUtil.retrieveAppropriateBackUrl(
				req.headers["hx-current-url"] as string,
				`/brands/${name}`
			);
			return res.render("pages/products/id", {
				...req.ctx,
				product: {
					...product,
					url: {
						back: backURL,
						prev:
							prevProductId > 0
								? `/brands/${name}/${prevProductId}`
								: "",
						next: nextProductId
							? `/brands/${name}/${nextProductId}`
							: "",
					},
				},
				title: product.title,
				breadcrumbs: [
					{
						url: "/brands",
						label: "Brands",
					},
					{
						url: backURL,
						label: `${name}'s products`,
					},
					{
						label: product.title,
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
