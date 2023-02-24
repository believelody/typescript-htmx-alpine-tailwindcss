import { Meta } from "./meta.interface";
import { Product } from "./product.interface";

export interface CartItem extends Pick<Product, "price" | "discountPercentage" | "id"> {
  total: number;
  discountedPrice: number;
  quantity: number;
}

export interface CartMeta {
	total: number;
	discountedTotal: number;
	userId: number;
	totalProducts: number;
	totalQuantity: number;
}

export interface Cart extends CartMeta {
	id: number;
	products: CartItem[];
}

export interface CartResponse extends Meta {
  carts: Cart[]
}

export interface CartItemRequestBody extends Pick<CartItem, "quantity" | "id"> {}

export interface NewCartRequestBody {
  userId: number;
  products: CartItemRequestBody[];
}

export interface UpdateCartRequestBody {
	merge: true;
	products: CartItemRequestBody[];
}