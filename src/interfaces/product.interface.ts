import { Meta } from "./meta.interface";

export interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
}

export interface ProductResponse extends Meta {
	products: Product[];
}