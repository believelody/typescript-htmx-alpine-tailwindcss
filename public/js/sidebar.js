export default {
  close(id) {
    const sidebar = document.getElementById(id);
    sidebar.classList.add('closing');
    sidebar.onanimationend = () => sidebar.remove()
  }
};