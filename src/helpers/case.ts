export default function (value, options) {
    if (value === this.switchValue.value) {
        this.switchValue.found = true;
        return options.fn(this);
    }
};