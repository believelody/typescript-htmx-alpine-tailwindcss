export default function(baseUrl, { hash }) {
  const url = new URL(baseUrl);
  Object.entries(hash).forEach(([key, value]) => {
    if (url.searchParams.has(key)) {
      url.searchParams.delete(key);
    }
    url.searchParams.append(key, value as string);
  });
  return url;
}