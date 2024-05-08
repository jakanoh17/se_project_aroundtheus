export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    if (Array.isArray(this._items)) {
      this._items.forEach((item) => {
        this._element = this._renderer(item);
        this.addItem(this._element);
      });
    } else {
      this._element = this._renderer(this._items);
      this.addItem(this._element);
    }
  }
}
