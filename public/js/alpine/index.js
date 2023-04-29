import { default as Alpine } from 'https://cdn.skypack.dev/pin/alpinejs@v3.11.1-t7rpm0UqUghivxsRyaE6/mode=imports,min/optimized/alpinejs.js';
import sidebar from './x-data/sidebar.js';
import notifier from './x-data/notifier.js';
import modal from './x-data/modal.js';

Alpine.data('sidebar', sidebar);
Alpine.data('modal', modal);
Alpine.data('notifier', notifier);

export default Alpine;