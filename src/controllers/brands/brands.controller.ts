import { productService } from "@services/product/product.service";
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

export const brandsController = router;
