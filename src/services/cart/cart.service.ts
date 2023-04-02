import { Cart, CartItemRequestBody } from "@interfaces/cart.interface";
import { fetch } from "@services/fetch";

const create = async (data: CartItemRequestBody): Promise<Cart> => {
	// return await fetch.post(`/cart/add`, {
	// 	body: data,
	// });
	return {
		products: [
			{
				...data,
				total: Number((data.price * data.quantity).toFixed(2)),
			},
		],
		total: Number((data.price * data.quantity).toFixed(2)),
		totalProducts: 1,
		totalQuantity: data.quantity,
	};
};

const findCartById = async (id: number): Promise<Cart> => {
	return await fetch.get(`/carts/${id}`);
};

const update = async (cart: Cart, data: CartItemRequestBody): Promise<Cart> => {
	cart.products.push({
		...data,
		total: Number((data.price * data.quantity).toFixed(2)),
	});
	cart.total += cart.products.reduce(
		(acc, cur) => acc + Number((cur.price * cur.quantity).toFixed(2)),
		0
	);
	cart.totalProducts = cart.products.length;
	cart.totalQuantity += data.quantity;
	return Promise.resolve(cart);
};

const updateItemQuantity = async (
	cart: Cart,
	itemIndex: number,
	quantity: number
): Promise<Cart> => {
	cart.products[itemIndex].quantity += quantity;
	cart.products[itemIndex].total = Number(
		(
			cart.products[itemIndex].price * cart.products[itemIndex].quantity
		).toFixed(2)
	);
	cart.total = cart.products.reduce(
		(acc, cur) => acc + Number((cur.price * cur.quantity).toFixed(2)),
		0
	);
	cart.totalQuantity += quantity;
	return Promise.resolve(cart);
};

const getItemIndex = (cart: Cart, id: number) =>
	cart.products.findIndex((product) => product.id === id);

const getItem = (cart: Cart, id: number) =>
	cart.products.findIndex((product) => product.id === id);

const deleteItem = async (
	cart: Cart,
	itemIndex: number
): Promise<Cart> => {
	const item = cart.products[itemIndex];
	cart.products = cart.products.filter(product => product.id !== item.id);
	cart.total = cart.products.length;
	cart.totalQuantity -= item.quantity;
	return Promise.resolve(cart.total > 0 ? cart : null);
};

export const cartService = {
	create,
	findCartById,
	update,
	updateItemQuantity,
	getItemIndex,
	deleteItem,
	getItem
};
