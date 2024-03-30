function enableValidation() {
    modalInputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        showErrorMessage(evt.target);
        toggleSaveButton(input.closest("form"), evt.target);
        displayInvalidInput(evt.target);
      });
    });
  }
  
  function showErrorMessage(inputElement) {
    const errorMessage = inputElement.validationMessage;
    const errorElement = document.querySelector(`.${inputElement.id}-err-msg`);
    errorElement.textContent = errorMessage;
    errorElement.classList.remove("modal__error-message_hidden");
  }
  
  function hasInvalidInputs(formElement) {
    const formInputs = Array.from(formElement.querySelectorAll(".modal__input"));
    return formInputs.some((input) => {
      return !input.validity.valid;
    });
  }
  
  function toggleSaveButton(formElement) {
    const formSubmitButton = formElement.querySelector(".modal__submit-button");
    if (!hasInvalidInputs(formElement)) {
      formSubmitButton.removeAttribute("disabled");
      formSubmitButton.classList.remove("modal__submit-button_inactive");
    } else {
      formSubmitButton.setAttribute("disabled", true);
      formSubmitButton.classList.add("modal__submit-button_inactive");
    }
  }
  
  function displayInvalidInput(inputElement) {
    if (!inputElement.validity.valid) {
      inputElement.classList.add("modal__input_invalid");
    } else {
      inputElement.classList.remove("modal__input_invalid");
    }
  }
  