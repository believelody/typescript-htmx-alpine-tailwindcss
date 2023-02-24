export default function ({ hash }) {
    if (hash.spread) {
        hash = { ...hash, ...hash.spread }
        delete hash.spread;
    }
    return hash;
};