import { fetch } from "@services/fetch";

const findAll = async (limit: number, skip: number) => {
  return await fetch.get(`/products?limit=${limit}&skip=${skip}&select=title,price,rating,category,brand,thumbnail`);
}

const findOneById = async (id: number) => {
  return await fetch.get(`/products/${id}`);
}

export const productService = { findAll, findOneById };