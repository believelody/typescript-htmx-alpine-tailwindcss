import modal from './modal.js';
import sidebar from './sidebar.js';
import Alpine from './alpine/index.js';

window.modal = modal;
window.sidebar = sidebar;
window.Alpine = Alpine;

window.Alpine.start();