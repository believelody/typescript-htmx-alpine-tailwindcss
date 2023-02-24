import expressHbs from 'express-hbs';

export default function ({ fn, hash }) {
  if (hash.spread) {
    hash = { ...hash, ...hash.spread };
    delete hash.spread;
  }
  delete hash.title;
  delete hash.body;
  delete hash.class;
  const { size = 6, color = '', fill = "currentColor", stroke = "currentColor", strokeWidth = 2, viewBox } = hash;
  delete hash.size;
  delete hash.color;
  delete hash.fill;
  delete hash.stroke;
  delete hash["stroke-width"];
  delete hash.viewBox;
  const spreadAttrs = expressHbs.handlebars.helpers.spread.call(this, { ...hash });
  return `<svg ${spreadAttrs} class="${color}" width="${size * 4}" height="${size * 4}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${fn(hash)}</svg>`;
}