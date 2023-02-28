import { fetch } from '@services/fetch';
import express, { NextFunction, Request, Response } from 'express';
import { Cart } from '@interfaces/cart.interface';
import { httpMiddleware } from '@middlewares/http/http.middleware';

const router = express.Router();

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

router.post("/add-item", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, quantity } = req.body;
    
    const cartItem = await fetch.post(`/cart/add`, {
      body: { userId: 1, products: [{ quantity, id }] }
    }) as Cart;
    
    return res.render("partials/modal/add-to-cart-success", {
			...req.ctx,
			cartItem,
		});
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
});

export const cartApiController = router;