import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../utils/Section.js";
import PopupWithImage from "../components/Popup.js";

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

const closeModalButtons = document.querySelectorAll(".modal__close-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector(".modal_type_profile");
const profileModalNameInput = profileModal.querySelector(
  ".modal__input_type_name"
);
const profileModalDescriptionInput = profileModal.querySelector(
  ".modal__input_type_description"
);
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profileModalForm = document.forms["edit-form"];
const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector(".modal_type_new-card");
const newCardModalForm = document.forms["new-card-form"];
const newCardTitle = newCardModal.querySelector(
  ".modal__input_type_card-title"
);
const newCardLink = newCardModal.querySelector(".modal__input_type_card-link");
const gallery = document.querySelector(".gallery");
// const enlargedCardModal = document.querySelector(".modal_type_enlarged-card");
// const enlargedImage = enlargedCardModal.querySelector(".modal__enlarged-image");
// const enlargedCardCaption = enlargedCardModal.querySelector(".modal__caption");
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_invalid",
  errorClass: "modal__error-message_visible",
};
const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardModalForm
);

const profileFormValidator = new FormValidator(
  validationConfig,
  profileModalForm
);
// END OF DECLARATIONS

// INITIAL CARDS
function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleCardEnlargement);
  return cardElement.render();
}

const section = new Section(
  { items: initialCards, renderer: createCard },
  ".gallery"
);
section.renderItems();

// ENLARGE CARD IMAGE
function handleCardEnlargement(evt) {
  const enlrgImgPopup = new PopupWithImage(".modal_type_enlarged-card");
  enlrgImgPopup.open(evt);
  enlrgImgPopup.setEventListeners(evt);
}

// NEW CARDS
function handleNewCardFormSubmit(evt) {
  const newCardData = {
    name: `${newCardTitle.value}`,
    link: `${newCardLink.value}`,
  };
  gallery.prepend(createCard(newCardData));

  closePopup(newCardModal);

  evt.preventDefault();
  evt.target.reset();
  newCardFormValidator.resetValidation();
}

newCardModalForm.addEventListener("submit", handleNewCardFormSubmit);

// const popupex = new Popup(".modal_type_new-card");
// OPENING MODALS
addCardButton.addEventListener("click", () => {
  // openPopup(newCardModal);
  // popupex.open();
  // popupex.setEventListeners();
});

editProfileButton.addEventListener("click", function inputProfileInfo() {
  openPopup(profileModal);
  profileModalNameInput.value = profileName.textContent;
  profileModalDescriptionInput.value = profileTitle.textContent;
  profileFormValidator.resetValidation();
});

// function openPopup(popup) {
//   popup.classList.add("modal_opened");
//   popup.addEventListener("click", closeWithOutsideClick);
//   document.addEventListener("keydown", closeWithEsc);
// }
// SUBMIT PROFILE MODAL
function handleProfileFormSubmit(evt) {
  profileName.textContent = profileModalNameInput.value;
  profileTitle.textContent = profileModalDescriptionInput.value;
  closePopup(profileModal);
  evt.preventDefault();
}

profileModalForm.addEventListener("submit", handleProfileFormSubmit);

// CLOSING MODAL
// closeModalButtons.forEach((button) => {
//   const popup = button.closest(".modal");
//   button.addEventListener("click", () => closePopup(popup));
// });

// function closeWithOutsideClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.currentTarget);
//   }
// }

// function closeWithEsc(evt) {
//   if (evt.key === "Escape") {
//     closePopup(evt.currentTarget.querySelector(".modal_opened"));
//   }
// }

// function closePopup(popup) {
//   popup.classList.remove("modal_opened");
//   popup.removeEventListener("click", closeWithOutsideClick);
//   document.removeEventListener("keydown", closeWithEsc);
// }

// VALIDATION
newCardFormValidator.enableValidation();
profileFormValidator.enableValidation();

// // COULD BE IMPROVED

// // You can universally create instances of validators for all forms in the project storing them inside one object formValidators.  And then you can take any validator using attribute name of the form where you need to disable/enable the submit button or remove errors.

// // define an object for storing validators
// const formValidators = {}

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector))
//   formList.forEach((formElement) => {
//     const validator = new FormValidator(config, formElement)
//     // here you get the name of the form
//     const formName = formElement.getAttribute('name')

// // ***POINT OF CONFUSION***
//    // here you store the validator using the `name` of the form
//     formValidators[formName] = validator;
//    validator.enableValidation();
//   });
// };

// enableValidation(config);
// // And now you can use them for disabling buttons or clearing errors:

// formValidators[ profileForm.getAttribute('name') ].resetValidation()

// // or you can use a string – the name of the form (you know it from `index.html`)
// formValidators['profile-form'].resetValidation()
//
