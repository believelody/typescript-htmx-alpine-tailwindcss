export default function(param: string, urlParams: URLSearchParams, options) {
  return urlParams.get(param);
}