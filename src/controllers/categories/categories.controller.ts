import { productService } from "@services/product/product.service";
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
				categories
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

export const categoriesController = router;