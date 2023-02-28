export default {
  close(id) {
    const sidebar = document.getElementById(id);
    console.log({ sidebar });
    sidebar.classList.add('closing');
    sidebar.onanimationend = () => sidebar.remove();
  }
};