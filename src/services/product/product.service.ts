import { ProductFilterKeys } from "@enums/product-filter.enum";
import {
	Product,
	ProductResponse,
	ProductThumbnail,
} from "@interfaces/product.interface";
import { fetch } from "@services/fetch";

const findAll = async (
	limit: number,
	skip: number
): Promise<ProductResponse> => {
	return await fetch.get(
		`/products?limit=${limit}&skip=${skip}&select=title,price,rating,category,brand,thumbnail`
	);
};

const findOneById = async (id: number): Promise<Product> => {
	return await fetch.get(`/products/${id}`);
};

const findThumbnail = async (id: number): Promise<ProductThumbnail> => {
	return await fetch.get(`/products/${id}?select=thumbnail,title`);
};

const findAllCategories = async (): Promise<string[]> => {
	return await fetch.get("/products/categories");
};

const findAllBrands = async (): Promise<string[]> => {
	const res = (await fetch.get(
		"/products?limit=100&select=brand"
	)) as ProductResponse;
	const brands = res.products.reduce(
		(acc, cur) => (!acc.has(cur.brand) ? acc.add(cur.brand) : acc),
		new Set<string>()
	);
	return Array.from(brands);
};

const filterByKeys = async (filtersMap: Map<ProductFilterKeys, string>): Promise<Product[]> => {
	const { products } = await productService.findAll(0, 0);
	if (filtersMap.size === 0) {
		return products;
	}
	let filteredProducts = products;
	filtersMap.forEach((filterValue, filterKey) => {
		filteredProducts = filteredProducts.filter(
			(product) => product[filterKey] === filterValue
		);
	});
	return filteredProducts;
};

export const productService = {
	findAll,
	findOneById,
	findThumbnail,
	findAllCategories,
	findAllBrands,
	filterByKeys,
};
