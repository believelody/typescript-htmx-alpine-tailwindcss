import { fetch } from '@services/fetch';
import express, { NextFunction, Request, Response } from 'express';
import { Cart, NewCartRequestBody } from '@interfaces/cart.interface';
import { httpMiddleware } from '@middlewares/http/http.middleware';
import { cartService } from '@services/cart/cart.service';

const router = express.Router();

router.get("/",async (req: Request, res: Response, next: NextFunction) => {
	try {
		// req.session.cart = null;
		return res.render("partials/sidebar/cart-2", {
			...req.ctx,
			cart: req.session.cart,
		});
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.get("/update-cart-btn",async (req: Request, res: Response, next: NextFunction) => {
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
    const cart = await fetch.get(`/carts/${id}`) as Cart;
    req.session.cart = cart;    
    return res.render("partials/sidebar/cart-2", {
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
		console.log({ cart });
		
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

export const cartApiController = router;