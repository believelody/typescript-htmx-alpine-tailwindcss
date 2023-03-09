import { FetchError } from "@interfaces/fetch.interface";

const code500 = "Error: something went wrong.";

const handleFetchError = <T>(data: FetchError & T): FetchError & T => {
  if (data.message) {
		console.log("Error message : ", data.message);
		throw new Error(data.message);
	}
  if (data.name) {
    console.log("Error code : ", data.code);
    throw new Error(data.name);
  }
  return data;
}

export const errorUtil = { code500, handleFetchError };