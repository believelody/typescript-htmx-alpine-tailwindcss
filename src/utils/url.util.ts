import envUtil from './env.util'

const retrieveAppropriateBackUrl = (backURL: string, backupURL: string): string => {
  if (!backURL) {
    return backupURL;
  }
  const backURLObject = new URL(backURL);
  return backURLObject.pathname.startsWith(`${backupURL}?`) ? `${backURLObject.pathname}${backURLObject.search}` : backupURL;
}

const baseUrl = `http://localhost:${envUtil.port}`;

export default { retrieveAppropriateBackUrl, baseUrl };