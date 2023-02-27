const modal = {
  close(id) {
    console.log(id);
    const modal = document.getElementById(id);
    modal.classList.add('closing');
    modal.onanimationend = el => modal.remove()
  }
};