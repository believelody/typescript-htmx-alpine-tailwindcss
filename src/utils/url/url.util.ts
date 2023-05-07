import { envConfig } from "@configs/env/env.config";

const retrieveAppropriateBackUrl = (
	backURL: string,
	backupURL: string
): string => {
	if (!backURL) {
		return backupURL;
	}
	const backURLObject = new URL(backURL);

	return backURLObject.search
		? `${backURLObject.pathname}${backURLObject.search}`
		: backupURL;
};

const baseUrl = `http://localhost:${envConfig.port}`;

const updateURLWithParams = (
	currentUrl: string,
	host: string,
	params: object
) => {
	const url = new URL(currentUrl, host);
	if (url.search) {
		url.search = "";
	}
  for (const key in params) {
	  if (params[key]) {
			url.searchParams.append(key, String(params[key]));
		}
  }
  return url;
};

export const urlUtil = { retrieveAppropriateBackUrl, baseUrl, updateURLWithParams };
