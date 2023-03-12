export default {
  close(id, back = undefined) {
    const sidebar = document.getElementById(id);
    sidebar.classList.add('closing');
    if (back) {
      window.history.back();
    }
    sidebar.onanimationend = () => sidebar.remove();
  },
  open({ string }) {
    document.body.insertAdjacentHTML('afterbegin', string);
  }
};