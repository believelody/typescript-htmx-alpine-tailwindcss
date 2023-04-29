export default (notificationId, notificationType) => ({
  notificationElement: document.getElementById(notificationId),
  close() {
    this.notificationElement.classList.add('closing');
    this.notificationElement.onanimationend = () => {
      const notificationParentElement = this.notificationElement.parentElement;
      this.notificationElement.remove();
      if (notificationParentElement.childElementCount === 0) {
        notificationParentElement.remove();
      }
    };
  },
  async setTimer(timeout = 7500) {
    let timer;
    await new Promise(resolve => {
      timer = setTimeout(() => {
        resolve(this.close());
      }, timeout);
    });
  },
  setBorderFromType() {
    switch (notificationType) {
      case "success":
        return "border border-success-500 bg-success-50 border-l-[12px]";
      case "error":
        return "border border-danger-500 bg-danger-50 border-l-[12px]";
      case "info":
        return "border border-info-500 bg-info-50 border-l-[12px]";
      case "warning":
        return "border border-warning-500 bg-warning-50 border-l-[12px]";
      default:
        return "border border-l-[12px]";
    }
  },
  closer: {
    type: 'button',
    ['@click']() {
      this.close();
    },
  },
});