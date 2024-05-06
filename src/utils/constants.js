import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  createCard,
  handleNewCardFormSubmit,
  handleProfileSubmit,
} from "../pages/index.js";

const initialCards = [
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
const profileModalForm = document.forms["edit-form"];
export const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector(".modal_type_new-card");
const newCardModalForm = document.forms["new-card-form"];
export const newCardTitle = newCardModal.querySelector(
  ".modal__input_type_card-title"
);
export const newCardLink = newCardModal.querySelector(
  ".modal__input_type_card-link"
);
export const gallery = document.querySelector(".gallery");
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_invalid",
  errorClass: "modal__error-message_visible",
};
export const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardModalForm
);

export const profileFormValidator = new FormValidator(
  validationConfig,
  profileModalForm
);
export const enlrgImgPopup = new PopupWithImage(".modal_type_enlarged-card");
export const section = new Section(
  { items: initialCards, renderer: createCard },
  ".gallery"
);
export const newCardFormPopup = new PopupWithForm(
  ".modal_type_new-card",
  handleNewCardFormSubmit
);
export const profFormPopup = new PopupWithForm(
  ".modal_type_profile",
  handleProfileSubmit
);

export const profUserInfo = new UserInfo({
  userNameSelec: ".modal__input_type_name",
  descrSelec: ".modal__input_type_description",
});
