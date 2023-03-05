import { envConfig } from "@configs/env/env.config";

const retrieveAppropriateBackUrl = (backURL: string, backupURL: string): string => {
  if (!backURL) {
    return backupURL;
  }
  const backURLObject = new URL(backURL);
  
  return backURLObject.search ? `${backURLObject.pathname}${backURLObject.search}` : backupURL;
}

const baseUrl = `http://localhost:${envConfig.port}`;

export const urlUtil = { retrieveAppropriateBackUrl, baseUrl };