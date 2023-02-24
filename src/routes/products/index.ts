import express, { Request, NextFunction, Response } from "express";
import { ProductResponse } from '../../interfaces/product.interface';
import middlewares from '../../middlewares';
import service from '../../services';
import utils from '../../utils';

const router = express.Router();

export const productsTitle = 'Products';

router.get('/', middlewares.http.limitQueryValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Number(req.query.limit || utils.http.limitQueryArray[0]);
    const count = Number(req.query.count || limit);
    if (req.query.count && req.ctx?.fromHTMX) {
      const htmxRes = await service.product.fetchAll(limit, count - limit) as ProductResponse;
      if (req.session) {
        req.session.meta = { total: htmxRes.total, limit, count };
      }
      res.setHeader('HX-Trigger', 'update-context');
      return res.render('partials/product/list', { ...req.ctx, meta: { total: htmxRes.total, limit, count }, products: htmxRes.products });
    }
    const { products, total } = await service.product.fetchAll(count, 0) as ProductResponse;
    return res.render('pages/product', { ...req.ctx, products, meta: { total, limit, count }, title: productsTitle });
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
});

export default router;