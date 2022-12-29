import("../style/style.scss");
import items from './items.js';
import { getItem } from './item.js'

const toAdd = document.querySelector('.items');
for (const item of items) {
    toAdd.insertAdjacentHTML('beforeEnd', getItem(item)
    )
}