import { authMiddleware } from "@middlewares/auth/auth.middleware";
import { httpMiddleware } from "@middlewares/http/http.middleware";
import { productService } from "@services/product/product.service";
import { queryUtil } from "@utils/query/query.util";
import { stringUtil } from "@utils/string/string.util";
import { urlUtil } from "@utils/url/url.util";
import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

export const productsTitle = "Products";

router.get(
	"/",
	authMiddleware.setCheckAuthAsHxTrigger,
	httpMiddleware.limitQueryValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const limit = Number(req.query.limit || queryUtil.limitQueryArray[0]);
			const count = Number(req.query.count || limit);
			const { products, total } = await productService.findAll(count, 0);
			return res.render("pages/products", {
				...req.ctx,
				products,
				meta: { total, limit, count },
				title: productsTitle,
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.get(
	"/more",
	httpMiddleware.limitQueryValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const limit = Number(req.query.limit || queryUtil.limitQueryArray[0]);
			const count = Number(req.query.count || limit);
			if (req.query.count && req.ctx?.fromHTMX) {
				const htmxRes = await productService.findAll(limit, count - limit);
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
				res.setHeader("HX-Replace-Url", `/products${url.search}`);
				return res.render("partials/product/list", {
					...req.ctx,
					meta: { total: htmxRes.total, limit, count },
					products: htmxRes.products,
				});
			}
			throw new Error(
				"count query is undefined or request doesn't come from htmx"
			);
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.get(
	"/update-action",
	(req: Request, res: Response, next: NextFunction) => {
		try {
			req.ctx = { ...req.ctx, meta: req.session?.meta };
			return res.render("partials/product/action", req.ctx);
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.get(
	"/categories",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const categories = await productService.findAllCategories();
			return res.render("partials/product/category-filter", {
				...req.ctx,
				categories: categories.map((categorie) => ({
					value: categorie,
					label: stringUtil.capitalize(categorie),
				})),
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.get(
	"/brands",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const brands = await productService.findAllBrands();
			return res.render("partials/product/brand-filter", {
				...req.ctx,
				brands: brands.map((brand) => ({
					value: brand,
					label: brand,
				})),
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.get(
	"/filters",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			return res.render("partials/sidebar/product-filters", {
				...req.ctx,
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
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
			const product = await productService.findOneById(id);
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
			console.error(`In ${req.originalUrl} route : ${error}`);
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
			const product = await productService.findThumbnail(id);
			return res.render("partials/image/contain", {
				...req.ctx,
				src: product.thumbnail,
				alt: product.title,
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

export const productsController = router;
