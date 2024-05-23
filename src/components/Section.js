//adds card element to DOM; passes Card module through in the
//"renderer" so only need to call up Section module for both card elem. and DOM creation

export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._element = this._renderer(item);
      this._addItem(this._element);
    });
  }

  _addItem() {
    this._container.prepend(this._element);
  }
}
