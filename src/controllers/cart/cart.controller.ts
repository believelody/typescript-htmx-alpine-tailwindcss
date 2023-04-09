import express, { NextFunction, Request, Response } from "express";
import { httpMiddleware } from "@middlewares/http/http.middleware";
import { cartService } from "@services/cart/cart.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		// req.session.cart = null;
		return res.render("partials/sidebar/cart", {
			...req.ctx,
			cart: req.session.cart,
		});
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.get(
	"/update-btn",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			return res.render("partials/button/cart", {
				...req.ctx,
				cart: req.session.cart,
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

// router.get(
// 	"/:id",
// 	httpMiddleware.numericParamsValidator,
// 	async (req: Request, res: Response, next: NextFunction) => {
// 		try {
// 			const id = Number(req.params.id);
// 			const cart = await cartService.findCartById(id);
// 			req.session.cart = cart;
// 			return res.render("partials/sidebar/cart", {
// 				...req.ctx,
// 				cart: req.session.cart,
// 			});
// 		} catch (error) {
// 			console.error(`In ${req.originalUrl} route : ${error}`);
// 			next(error);
// 		}
// 	}
// );

router.post(
	"/add-item",
	httpMiddleware.sleep,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id, title, price } = JSON.parse(req.body.product);
			const quantity = Number(req.body.quantity);
			if (req.session.cart) {
				const itemIndex = cartService.getItemIndex(req.session.cart, id);
				if (itemIndex > -1) {
					req.session.cart = await cartService.updateItemQuantity(
						req.session.cart,
						itemIndex,
						quantity
					);
				} else {
					req.session.cart = await cartService.update(req.session.cart, {
						id,
						title,
						price,
						quantity,
					});
				}
			} else {
				req.session.cart = await cartService.create({
					id,
					title,
					price,
					quantity,
				});
			}
			res.setHeader("HX-Trigger", "update-cart-btn");
			return res.render("partials/modal/add-to-cart-success", {
				...req.ctx,
				cart: req.session.cart,
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.put(
	"/item/:id",
	httpMiddleware.sleep,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			const quantity = Number(req.body.quantity);
			const itemIndex = cartService.getItemIndex(req.session.cart, id);
			if (itemIndex === -1) {
				throw new Error("Item not found in cart");
			}
			req.session.cart = await cartService.updateItemQuantity(
				req.session.cart,
				itemIndex,
				quantity
			);
			res.setHeader("HX-Trigger", "update-cart-btn");
			return res.render("partials/cart/container", {
				...req.ctx,
				cart: req.session.cart,
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.get(
	"/item/:id",
	httpMiddleware.sleep,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			const item = req.session.cart.products.find(
				(product) => product.id === id
			);
			if (!item) {
				throw new Error("Item not found in cart");
			}
			return res.render("partials/modal/delete-item-in-cart", {
				...req.ctx,
				item,
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

router.delete(
	"/item/:id",
	httpMiddleware.sleep,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);
			const itemIndex = cartService.getItemIndex(req.session.cart, id);
			if (itemIndex === -1) {
				throw new Error("Item not found in cart");
			}
			req.session.cart = await cartService.deleteItem(
				req.session.cart,
				itemIndex
			);
			res.setHeader("HX-Trigger", "update-cart-btn");
			return res.render("partials/cart/container", {
				...req.ctx,
				cart: req.session.cart,
			});
		} catch (error) {
			console.error(`In ${req.originalUrl} route : ${error}`);
			next(error);
		}
	}
);

export const cartController = router;
