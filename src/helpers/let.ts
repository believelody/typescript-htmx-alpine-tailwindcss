export default function ({ hash, fn }) {
    hash = { ...hash, ...hash.spread };
    delete hash.spread;
    return fn(hash);
}