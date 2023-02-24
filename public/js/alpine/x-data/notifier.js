export default (initialState) => ({
  notifications: initialState.notifications || [],
  timer: {},
  timeout: initialState.timeout || 3000,
  position: initialState.position || "top-left",
  slideDirection: initialState.slideDirection || "left",
  send(notification) {
    this.notifications = [{ id: crypto.randomUUID(), ...notification }, ...this.notifications];
  },
  addFromBottom() {
    this.notifications = [...this.notifications, { id: crypto.randomUUID(), type: 'success', title: 'Contact', message: 'Nous avons bien reçu votre demande. Nous reviendrons vers vous dans les plus brefs délai.', timeout: 5000 }];
  },
  addFromTop() {
    this.notifications = [{ id: crypto.randomUUID(), type: 'success', title: 'Contact', message: 'Nous avons bien reçu votre demande. Nous reviendrons vers vous dans les plus brefs délai.', timeout: 5000 }, ...this.notifications];
  },
  remove(notificationId) {
    this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
    clearTimeout(this.timer[notificationId]);
  },
});