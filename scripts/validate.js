const modalInputs = document.querySelectorAll(".modal__input");
// const validationConfig = {
//   formSelector: ".popup__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__submit-button",
//   inactiveButtonClass: "modal__submit-button_inactive",
//   inputErrorClass: "modal__input_invalid",
//   errorClass: "modal__error-message_hidden",
// };
// END OF DECLARATIONS

function enableValidation(validationConfig) {
  modalInputs.forEach((input) => {
    toggleSaveButton(input.closest("form"), validationConfig);
    input.addEventListener("input", (evt) => {
      toggleSaveButton(input.closest("form"), validationConfig);
      toggleInputError(evt.target, validationConfig);
    });
  });
}

function showErrorMessage(inputElement, validationConfig) {
  const errorMessage = inputElement.validationMessage;
  const errorElement = document.querySelector(`.${inputElement.id}-err-msg`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.remove(validationConfig.errorClass);
}

function hideErrorMessage(inputElement, validationConfig) {
  const errorElement = document.querySelector(`.${inputElement.id}-err-msg`);
  errorElement.classList.add(validationConfig.errorClass);
  inputElement.classList.remove(validationConfig.inputErrorClass);
}

function hasInvalidInputs(formElement, validationConfig) {
  const formInputs = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  return formInputs.some((input) => {
    return !input.validity.valid;
  });
}

function toggleSaveButton(formElement, validationConfig) {
  const formSubmitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  if (!hasInvalidInputs(formElement, validationConfig)) {
    formSubmitButton.removeAttribute("disabled");
    formSubmitButton.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    formSubmitButton.setAttribute("disabled", true);
    formSubmitButton.classList.add(validationConfig.inactiveButtonClass);
  }
}

function toggleInputError(inputElement, validationConfig) {
  if (!inputElement.validity.valid) {
    showErrorMessage(inputElement, validationConfig);
  } else {
    hideErrorMessage(inputElement, validationConfig);
  }
}
