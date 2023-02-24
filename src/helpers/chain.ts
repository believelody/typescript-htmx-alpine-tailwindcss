export default function () {
  const chains = [...Object.values(arguments).slice(0, -1)];
  if (chains.some(chain => chain && typeof chain !== "string")) {
    throw new Error('Arguments must be typed in string');
  }
  return chains.reduce((acc, cur) => acc += cur, "");
}