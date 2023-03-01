import { Cart, NewCartRequestBody } from "@interfaces/cart.interface";
import { fetch } from "@services/fetch";

const create = async (data: NewCartRequestBody): Promise<Cart> => {
	const newCart = (await fetch.post(`/cart/add`, {
		body: data,
	})) as Cart;
	return newCart;
};

export const cartService = { create };