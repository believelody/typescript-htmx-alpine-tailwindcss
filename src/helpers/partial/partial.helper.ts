import expHbs from "express-hbs";

export default function (partialName, options) {
    if (!partialName) {
        console.error('No partial name given.');
        return '';
    }
    const partial = expHbs.handlebars.partials[partialName];
    if (!partial) {
        console.error('Couldnt find the compiled partial: ' + partialName);
        return '';
    }
    return new expHbs.SafeString(partial(options.hash));
}