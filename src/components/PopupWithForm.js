import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._submitForm = (evt) => {
      evt.preventDefault();
      handleSubmit(this._getInputValues());
    };
    this._submitBtn = this.popup.querySelector(".modal__submit-button");
    this._submitBtnText = this._submitBtn.textContent;
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

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
}
