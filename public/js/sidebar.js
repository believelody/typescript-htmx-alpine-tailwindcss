export default {
  close(id, back = false) {
    const sidebar = document.getElementById(id);
    sidebar.classList.add('closing');
    if (back) {
      window.history.back();
    }
    sidebar.onanimationend = () => sidebar.remove();
  }
};