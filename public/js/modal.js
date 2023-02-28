export default {
  close(id) {
    const modal = document.getElementById(id);
    modal.classList.add('closing');
    modal.onanimationend = () => modal.remove()
  }
};