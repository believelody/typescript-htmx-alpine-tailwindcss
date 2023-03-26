import modal from './modal.js';
import notification from './notification.js';
import sidebar from './sidebar.js';
import Alpine from './alpine/index.js';

window.modal = modal;
window.notification = notification;
window.sidebar = sidebar;
window.Alpine = Alpine;

window.Alpine.start();