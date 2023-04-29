export default (modalId) => ({
  modalElement: document.getElementById(modalId),
  close() {
    this.modalElement.classList.add('closing');
    this.modalElement.onanimationend = () => this.modalElement.remove();
  },
  dialogue: {
    ['@click.outside']() {
      this.close();
    },
    ['@keyup.escape.window']() {
      this.close();
    },
  },
  closer: {
    type: 'button',
    ['@click']() {
      this.close();
    },
  },
});