export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const profileModalForm = document.forms["edit-form"];
export const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector(".modal_type_new-card");
export const newCardModalForm = document.forms["new-card-form"];
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
