var uniqueId = require('uniqider');
export default class List {
    constructor() {
        this.items = [];
    }

    addItem = (item) => {
        let newItem = {
            id: uniqueId(),
            item: item
        };
        this.items.push(newItem);
        return newItem;
    }

    removeItem = (id) => {
        const index = this.items.findIndex(el => {
            el.id === id;
        })
        this.items.splice(index, 1);
    }
}