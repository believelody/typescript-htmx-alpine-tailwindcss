import { Cart, NewCartRequestBody } from "@interfaces/cart.interface";
import { fetch } from "@services/fetch";

const create = async (data: NewCartRequestBody): Promise<Cart> => {
	return await fetch.post(`/cart/add`, {
		body: data,
	});
};

const findCartById =async (id:number): Promise<Cart> => {
	return await fetch.get(`/carts/${id}`);
}

export const cartService = { create, findCartById };