import { fetch } from "@services/fetch";

const fetchAll = async (limit: number, skip: number) => {
  return await fetch.get(`/products?limit=${limit}&skip=${skip}&select=title,price,rating,category,brand,thumbnail`);
}

export const productService = { fetchAll };