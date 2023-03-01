import { Cart } from "@interfaces/cart.interface";
import { httpMiddleware } from "@middlewares/http/http.middleware";
import { fetch } from "@services/fetch";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get(
	"/:id",
	httpMiddleware.numericParamsValidator,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			const cart = (await fetch.get(`/carts/${id}`)) as Cart;
			req.session.cart = cart;
			return res.render("partials/sidebar/cart-2", {
				...req.ctx,
				cart: req.session.cart,
			});
		} catch (error) {
			console.log(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

export const cartController = router;