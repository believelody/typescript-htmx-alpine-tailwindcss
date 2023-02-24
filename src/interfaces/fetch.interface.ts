import { HeadersInit } from "node-fetch";

export interface FetchRequestOptions {
  headers?: HeadersInit;
  body?: object;
}

export interface FetchError {
	message: string;
	code?: string;
	name?: string;
}