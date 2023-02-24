export default (initialOpenState = false) => ({
  open: initialOpenState,
  lock: false,
  toggle() {
    this.open = !this.open;
    if (!open) {
      this.$dispatch('modal-closer');
    }
  },
  trigger: {
    ['x-ref']: 'trigger',
    ['@click']() {
      this.open = true;
    },
  },
  dialogue: {
    ['x-show']() {
      return this.open;
    },
    ['@click.outside']() {
      if (!this.lock) {
        this.open = false;
        this.$dispatch('modal-closer');
      }
    },
    ['@keyup.escape.window']() {
      if (!this.lock) {
        this.open = false;
        this.$dispatch('modal-closer');
      }
    },
  },
  closer: {
    type: 'button',
    ['@click']() {
      this.open = false;
      this.$dispatch('modal-closer');
    },
  },
});