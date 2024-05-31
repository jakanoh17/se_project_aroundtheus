export default class FormValidator {
  constructor(settings, form) {
    this.settings = settings;
    this.form = form;
    this._submitButton = form.querySelector(this.settings.submitButtonSelector);
    this._inputList = this.form.querySelectorAll(this.settings.inputSelector);
  }

  _findInvalidInputs() {
    const formInputs = Array.from(
      this.form.querySelectorAll(this.settings.inputSelector)
    );
    return formInputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleSubmitButton(param) {
    if (param === "disable" || this._findInvalidInputs()) {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this.settings.inactiveButtonClass);
    } else {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove(this.settings.inactiveButtonClass);
    }
  }

  _toggleInputError(inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorMessage(inputElement);
    } else {
      this._hideErrorMessage(inputElement);
    }
  }

  _showErrorMessage(inputElement) {
    const errorMessage = inputElement.validationMessage;
    const errorElement = this.form.querySelector(`.${inputElement.id}-err-msg`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.settings.errorClass);
    inputElement.classList.add(this.settings.inputErrorClass);
  }

  _hideErrorMessage(inputElement) {
    const errorElement = this.form.querySelector(`.${inputElement.id}-err-msg`);
    errorElement.classList.remove(this.settings.errorClass);
    inputElement.classList.remove(this.settings.inputErrorClass);
  }

  enableValidation() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._toggleInputError(evt.target);
        this._toggleSubmitButton();
      });
    });
  }

  // resetValidation() {
  //   this._inputList.forEach((inputElement) => {
  //     this._hideErrorMessage(inputElement);
  //   });
  // }

  disableSubmitBtn() {
    this._toggleSubmitButton("disable");
  }
}
