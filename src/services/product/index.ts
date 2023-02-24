import api from "../api";

const fetchAll = async (limit: number, skip: number) => {
  return await api.get(`/products?limit=${limit}&skip=${skip}&select=title,price,rating,category,brand,thumbnail`);
}

export default { fetchAll };