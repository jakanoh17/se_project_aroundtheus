import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit.bind(this);
  }

  _getInputValues() {
    const inputList = [...this.popup.querySelectorAll("input")];
    const inputValues = {};

    for (const input of inputList) {
      inputValues[input.name] = input.value;
    }

    return inputValues;
  }

  open() {
    super.open();
    this.popup.querySelector("form").addEventListener("submit", (evt) => {
      this._handleSubmit(this._getInputValues());
      evt.preventDefault();
    });
  }
}
