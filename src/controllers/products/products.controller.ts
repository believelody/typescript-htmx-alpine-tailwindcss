import { Product, ProductResponse } from "@interfaces/product.interface";
import { httpMiddleware } from "@middlewares/http/http.middleware";
import { productService } from "@services/product/product.service";
import { queryUtil } from "@utils/query/query.util";
import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

export const productsTitle = 'Products';

router.get('/', httpMiddleware.limitQueryValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Number(req.query.limit || queryUtil.limitQueryArray[0]);
    const count = Number(req.query.count || limit);
    if (req.query.count && req.ctx?.fromHTMX) {
      const htmxRes = await productService.findAll(limit, count - limit) as ProductResponse;
      if (req.session) {
        req.session.meta = { total: htmxRes.total, limit, count };
      }
      res.setHeader('HX-Trigger', 'update-context');
      return res.render('partials/product/list', { ...req.ctx, meta: { total: htmxRes.total, limit, count }, products: htmxRes.products });
    }
    const { products, total } = await productService.findAll(count, 0) as ProductResponse;
    return res.render('pages/products', { ...req.ctx, products, meta: { total, limit, count }, title: productsTitle });
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
});

router.get('/:id', httpMiddleware.numericParamsValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await productService.findOneById(Number(id)) as Product;
    return res.render('pages/products/id', { ...req.ctx, product, title: product.title });
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
})

export const productsController = router;