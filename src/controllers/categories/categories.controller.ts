import { httpMiddleware } from "@middlewares/http/http.middleware";
import { productService } from "@services/product/product.service";
import { queryUtil } from "@utils/query/query.util";
import { stringUtil } from "@utils/string/string.util";
import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

export const categoriesTitle = "Categories";

router.get(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
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
	}
);

router.get(
	"/:name",
	httpMiddleware.limitQueryValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const limit = Number(req.query.limit || queryUtil.limitQueryArray[0]);
			const count = Number(req.query.count || limit);
			const { products, total } = await productService.findByCategory(req.params.name);
			return res.render("pages/categories/id", {
				...req.ctx,
				products,
				meta: { total, limit, count },
				title: `${stringUtil.capitalize(req.params.name)} category`,
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

export const categoriesController = router;