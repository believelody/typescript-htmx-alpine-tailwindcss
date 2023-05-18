import { Product } from "@interfaces/product.interface";

const addURLToProductItem = (products: Product[], baseURL: string) =>
	products.map((product) => ({
		...product,
		url: `${baseURL}/${product.id}`,
	}));

export const productUtil = { addURLToProductItem };
