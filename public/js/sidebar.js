export default {
  close(id, back = undefined) {
    console.log({ id });
    const sidebar = document.getElementById(id);
    console.log(sidebar);
    sidebar.classList.add('closing');
    if (back) {
      window.history.back();
    }
    sidebar.onanimationend = () => sidebar.remove();
  },
  open({ string }) {
    document.body.insertAdjacentHTML('beforeend', string);
  }
};