import { envConfig } from "@configs/env/env.config";
import { HttpMethod } from "@enums/http-method.enum";
import { FetchError, FetchRequestOptions } from "@interfaces/fetch.interface";
import { errorUtil } from "@utils/error/error.util";
import nodeFetch, { RequestInit } from "node-fetch";

const headers: HeadersInit = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

const fetchApi = async <T>(
	path: string,
	method: HttpMethod,
	options: FetchRequestOptions
): Promise<T> => {
	const fetchOptions: RequestInit = {
		method,
		headers: {
			...headers,
		},
	};
	if (options.headers) {
		fetchOptions.headers = { ...fetchOptions.headers, ...options.headers };
	}
	if (options.body) {
		fetchOptions.body = JSON.stringify(options.body);
	}
	const res = await nodeFetch(`${envConfig.dummyDataURL}${path}`, fetchOptions);
	const json: T & FetchError = (await res.json()) as FetchError & T;
  return errorUtil.handleFetchError(json);
}

export const fetch = {
  headers,
  setHeader: (key: string, value: string): void => {
    headers[key] = value;
  },
  get: async <T>(path: string, options: FetchRequestOptions = {}): Promise<T>  =>{
    return await fetchApi(path, HttpMethod.GET, options)
  },
  post: async <T>(path: string, options: FetchRequestOptions = {}): Promise<T>  =>{
    return await fetchApi(path, HttpMethod.POST, options)
  },
  put: async <T>(path: string, options: FetchRequestOptions = {}): Promise<T>  =>{
    return await fetchApi(path, HttpMethod.PUT, options)
  },
  patch: async <T>(path: string, options: FetchRequestOptions = {}): Promise<T>  =>{
    return await fetchApi(path, HttpMethod.PATCH, options)
  },
  delete: async <T>(path: string, options: FetchRequestOptions = {}): Promise<T>  =>{
    return await fetchApi(path, HttpMethod.DELETE, options)
  },
  auth: {
    get: async <T>(path: string, options: FetchRequestOptions = {}): Promise<T>  =>{
      return await fetchApi(`/auth${path}`, HttpMethod.GET, options) as T;
    },
    post: async <T>(path: string, options: FetchRequestOptions = {}): Promise<T>  =>{
      return await fetchApi(`/auth${path}`, HttpMethod.POST, options) as T;
    },
    put: async <T>(path: string, options: FetchRequestOptions = {}): Promise<T>  =>{
      return await fetchApi(`/auth${path}`, HttpMethod.PUT, options) as T;
    },
    patch: async <T>(path: string, options: FetchRequestOptions = {}): Promise<T>  =>{
      return await fetchApi(`/auth${path}`, HttpMethod.PATCH, options) as T;
    },
    delete: async <T>(path: string, options: FetchRequestOptions = {}): Promise<T>  =>{
      return await fetchApi(`/auth${path}`, HttpMethod.DELETE, options) as T;
    },
  }
};