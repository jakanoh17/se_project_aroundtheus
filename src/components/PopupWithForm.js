import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitForm = (evt) => {
      this._handleSubmit(this._getInputValues());
      evt.preventDefault();
    };
  }

  _getInputValues() {
    const inputList = [...this.popup.querySelectorAll("input")];
    const inputValues = {};

    for (const input of inputList) {
      inputValues[input.name] = input.value;
    }

    return inputValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this.popup
      .querySelector("form")
      .addEventListener("submit", this._submitForm);
  }

  close() {
    super.close();
    this.popup
      .querySelector("form")
      .removeEventListener("submit", this._submitForm);
  }
}
