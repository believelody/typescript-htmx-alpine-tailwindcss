export default {
  close(id) {
    const notificationItem = document.getElementById(id);
    notificationItem.classList.add('closing');
    notificationItem.onanimationend = () => notificationItem.remove();
  },
  async setTimer(id, timeout = 7500) {
    let timer;
    await new Promise(resolve => {
      timer = setTimeout(() => {
        resolve(this.close(id));
      }, timeout);
    });
  },
  setBorderFromType(id, notificationType) {
    const borderNotificationItemDiv = document.querySelector(`#${id}>div`);
    if (!borderNotificationItemDiv.parentElement.classList.contains('closing')) {
      switch (notificationType) {
        case "success":
          borderNotificationItemDiv.classList.add("border", "border-success-500", "bg-success-50", "border-l-[12px]");
          break;
        case "error":
          borderNotificationItemDiv.classList.add("border", "border-danger-500", "bg-danger-50", "border-l-[12px]");
          break;
        case "info":
          borderNotificationItemDiv.classList.add("border", "border-info-500", "bg-info-50", "border-l-[12px]");
          break;
        case "warning":
          borderNotificationItemDiv.classList.add("border", "border-warning-500", "bg-warning-50", "border-l-[12px]");
          break;
        default:
          borderNotificationItemDiv.classList.add("border", "border-l-[12px]");
          break;
      }
    }
  }
};