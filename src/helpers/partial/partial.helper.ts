import hbs from "express-hbs";

export default function (partialName, options) {
    if (!partialName) {
        console.error('No partial name given.');
        return '';
    }
    const partial = hbs.handlebars.partials[partialName];
    if (!partial) {
        console.error('Couldnt find the compiled partial: ' + partialName);
        return '';
    }
    return new hbs.SafeString(partial(options.hash));
}