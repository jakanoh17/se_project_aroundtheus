const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_invalid",
  errorClass: "modal__error-message_visible",
};

class FormValidator {
  constructor(settings, form) {
    this.settings = settings;
    this.form = form;
    this._submitButton = form.querySelector(this.settings.submitButtonSelector);
  }

  _findInvalidInputs() {
    const formInputs = Array.from(
      this.form.querySelectorAll(this.settings.inputSelector)
    );
    return formInputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleSubmitButton() {
    if (!this._findInvalidInputs()) {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove(this.settings.inactiveButtonClass);
    } else {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this.settings.inactiveButtonClass);
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
    const modalInputs = this.form.querySelectorAll(this.settings.inputSelector);
    modalInputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._toggleInputError(evt.target);
        this._toggleSubmitButton();
      });
    });
  }
}

const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardModalForm
);
newCardFormValidator.enableValidation();
// newCardModalForm.addEventListener("submit", () => {
//   newCardFormValidator._toggleSubmitButton();
// });

const profileFormValidator = new FormValidator(
  validationConfig,
  profileModalForm
);
profileFormValidator.enableValidation();

export { newCardFormValidator, validationConfig };
