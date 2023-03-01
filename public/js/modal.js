export default {
  close(id, back = false) {
    const modal = document.getElementById(id);
    modal.classList.add('closing');
    if (back) {
      window.history.back();
    }
    modal.onanimationend = () => modal.remove()
  }
};