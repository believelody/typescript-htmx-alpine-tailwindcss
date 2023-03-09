import { Product, ProductResponse, ProductThumbnail } from "@interfaces/product.interface";
import { fetch } from "@services/fetch";

const findAll = async (limit: number, skip: number): Promise<ProductResponse> => {
  return await fetch.get(`/products?limit=${limit}&skip=${skip}&select=title,price,rating,category,brand,thumbnail`);
}

const findOneById = async (id: number): Promise<Product> => {
  return await fetch.get(`/products/${id}`);
}

const findThumbnail = async (id: number): Promise<ProductThumbnail> => {
	return await fetch.get(`/products/${id}?select=thumbnail,title`);
};

export const productService = { findAll, findOneById, findThumbnail };