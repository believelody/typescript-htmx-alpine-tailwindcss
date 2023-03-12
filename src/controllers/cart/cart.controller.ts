import express, { NextFunction, Request, Response } from 'express';
import { httpMiddleware } from '@middlewares/http/http.middleware';
import { cartService } from '@services/cart/cart.service';

const router = express.Router();

router.get("/",async (req: Request, res: Response, next: NextFunction) => {
	try {
		// req.session.cart = null;
		return res.render("partials/sidebar/cart", {
			...req.ctx,
			cart: req.session.cart,
		});
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.get("/update-btn",async (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.render("partials/button/cart", {
			...req.ctx,
			cart: req.session.cart,
		});
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.get("/:id", httpMiddleware.numericParamsValidator, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
    const cart = await cartService.findCartById(id);
    req.session.cart = cart;    
    return res.render("partials/sidebar/cart", {
			...req.ctx,
			cart: req.session.cart,
		});
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.post("/add-item", httpMiddleware.sleep, async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const cart = await cartService.create({ userId: 1, products: [req.body] });
		req.session.cart = cart;
		
    res.setHeader('HX-Trigger', 'update-cart-btn');
    return res.render("partials/modal/add-to-cart-success", {
			...req.ctx,
			cart,
		});
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
});

export const cartController = router;