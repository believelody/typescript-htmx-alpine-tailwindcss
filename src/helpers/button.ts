import expressHbs from 'express-hbs';

export default function({ fn, hash }) {
  delete hash.spread.body;
  if (!hash.spread.class) {
    const className = ["relative px-4 py-2 rounded btn"];
    if (hash.spread.color) {
      if (hash.spread.outlined) {
        className.push(`btn-${hash.spread.color}-outlined`);
        delete hash.spread.outlined;
      } else {
        className.push(`btn-${hash.spread.color}`);
      }
      delete hash.spread.color;
    } else {
      if (hash.spread.outlined) {
        className.push("btn-outlined");
        delete hash.spread.outlined;
      }
    };
    if (hash.spread.block) {
      className.push("w-full");
    }
    hash.spread.class = className.join(" ");
  }
  const spreadAttrs = expressHbs.handlebars.helpers.spread.call(this, hash.spread);
  return "<button " + spreadAttrs + ">" + fn(hash.spread) + "</button>";
}