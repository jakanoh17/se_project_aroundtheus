export default class Section {
  constructor({ items, renderer }, Selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(Selector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._element = this._renderer(item);
      this.addItem(this._element);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
