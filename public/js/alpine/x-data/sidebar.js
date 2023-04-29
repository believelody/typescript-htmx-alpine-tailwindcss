export default (sidebarId) => ({
  sidebarElement: document.getElementById(sidebarId),
  close() {
    this.sidebarElement.classList.add('closing');
    this.sidebarElement.onanimationend = () => this.sidebarElement.remove();
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