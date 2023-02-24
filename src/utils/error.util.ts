import { NextFunction } from "express";
import { FetchError } from "../interfaces/fetch.interface";
import { Request } from "../interfaces/http.interface";

const code500 = "Error: something went wrong.";

const handleFetchError = <T>(data: FetchError & T): FetchError & T => {
  if (data.message) {
		console.log("Error message : ", data.message);
		throw data.message;
	}
  if (data.name) {
    console.log("Error code : ", data.code);
    throw data.name;
  }
  return data;
}

const handleHttpError = async (
	req: Request,
	next: NextFunction,
	cb: () => Promise<void>
) => {
	try {
		await cb();
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
};

export default { code500, handleFetchError, handleHttpError };