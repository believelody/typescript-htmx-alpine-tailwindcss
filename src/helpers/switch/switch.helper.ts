export default function (value, options) {
    this.switchValue = { value, found: false };
    return options.fn(this);
}