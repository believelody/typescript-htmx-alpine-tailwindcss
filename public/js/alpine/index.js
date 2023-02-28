import { default as Alpine } from 'https://cdn.skypack.dev/pin/alpinejs@v3.11.1-t7rpm0UqUghivxsRyaE6/mode=imports,min/optimized/alpinejs.js';
import drawer from './x-data/drawer.js';
import notifier from './x-data/notifier.js';

Alpine.data('drawer', drawer);
Alpine.data('notifier', notifier);

export default Alpine;