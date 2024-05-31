export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const profileModalForm = document.forms["profile-form"];
export const editAviForm = document.forms["edit-avi-form"];
export const newCardModalForm = document.forms["new-card-form"];

export const addCardButton = document.querySelector(".profile__add-button");
export const editAviButton = document.querySelector(
  ".profile__avatar-container"
);
const newCardModal = document.querySelector(".modal_type_new-card");
export const newCardTitle = newCardModal.querySelector(
  ".modal__input_type_card-title"
);
export const newCardLink = newCardModal.querySelector(
  ".modal__input_type_card-link"
);
export const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_invalid",
  errorClass: "modal__error-message_visible",
};

export const profNameInput = document.querySelector(".modal__input_type_name");
export const profDescrInput = document.querySelector(
  ".modal__input_type_description"
);
export const profName = document.querySelector(".profile__name");
export const profDescr = document.querySelector(".profile__title");
