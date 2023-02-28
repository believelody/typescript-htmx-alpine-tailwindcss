export default function(nameFn: string, { hash }) {
  const fn = eval(nameFn);
  return () => fn(...Object.values(hash));
}