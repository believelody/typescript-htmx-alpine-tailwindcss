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

const filters = {
	category(products: Product[], categoryValue: string): Product[] {
		return products.filter((product) => product.category === categoryValue)
	},
	brand(products: Product[], brandValue: string): Product[] {
		return products.filter((product) => product.brand === brandValue)
	},
	prices(products: Product[], prices: string): Product[] {
		const [priceMin, priceMax] = prices.split(",");
		return products.filter((product) => product.price >= Number(priceMin) && product.price <= Number(priceMax))
	},
};

const filterByKeys = async (
	filtersMap: Map<ProductFilterKeys, string>
): Promise<Product[]> => {
	const { products } = await productService.findAll(0, 0);
	if (filtersMap.size === 0) {
		return products;
	}
	let filteredProducts = products;
	filtersMap.forEach((filterValue, filterKey) => {
		filteredProducts = filters[filterKey](filteredProducts, filterValue);
	});
	return filteredProducts;
};

const findByCategory = async (name: string): Promise<ProductResponse> => {
	return await fetch.get(`/products/category/${name}`);
};

export const productService = {
	findAll,
	findOneById,
	findThumbnail,
	findAllCategories,
	findAllBrands,
	filterByKeys,
	findByCategory,
};
