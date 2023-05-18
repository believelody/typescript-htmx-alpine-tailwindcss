import { httpMiddleware } from "@middlewares/http/http.middleware";
import { productService } from "@services/product/product.service";
import { productUtil } from "@utils/product/product.util";
import { queryUtil } from "@utils/query/query.util";
import { stringUtil } from "@utils/string/string.util";
import { urlUtil } from "@utils/url/url.util";
import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

export const categoriesTitle = "Categories";

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const categories = await productService.findAllCategories();
		return res.render("pages/categories", {
			...req.ctx,
			categories,
			title: categoriesTitle,
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
			const { products, total } = await productService.findByCategory(
				req.params.name
			);
			const backURL = urlUtil.retrieveAppropriateBackUrl(
				req.headers["hx-current-url"] as string,
				"/categories"
			);
			return res.render("pages/categories/name", {
				...req.ctx,
				products: productUtil.addURLToProductItem(
					products,
					`/categories/${req.params.name}`
				),
				meta: { total, limit, count },
				title: `${stringUtil.capitalize(req.params.name)} category`,
				category: stringUtil.capitalize(req.params.name),
				breadcrumbs: [
					{
						url: backURL,
						label: "Categories",
					},
					{
						label: stringUtil.capitalize(req.params.name),
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
				`/categories/${name}`
			);
			return res.render("pages/products/id", {
				...req.ctx,
				product: {
					...product,
					url: {
						back: backURL,
						prev:
							prevProductId > 0
								? `/categories/${name}/products/${prevProductId}`
								: "",
						next: nextProductId
							? `/categories/${name}/products/${nextProductId}`
							: "",
					},
				},
				title: product.title,
				breadcrumbs: [
					{
						url: "/categories",
						label: "Categories",
					},
					{
						url: backURL,
						label: `${stringUtil.capitalize(name)}'s products`,
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

export const categoriesController = router;
