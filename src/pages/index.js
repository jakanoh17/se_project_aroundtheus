import "./index.css";
import Card from "../components/Card.js";
import {
  editProfileButton,
  addCardButton,
  newCardModalForm,
  profNameInput,
  profDescrInput,
  validationConfig,
  profileModalForm,
  initialCards,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

//CLASS INSTANCES
const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardModalForm
);

const profileFormValidator = new FormValidator(
  validationConfig,
  profileModalForm
);
const enlrgImgPopup = new PopupWithImage(".modal_type_enlarged-card");
const section = new Section(
  { items: initialCards, renderer: createCard },
  ".gallery"
);
const newCardFormPopup = new PopupWithForm(
  ".modal_type_new-card",
  handleNewCardFormSubmit
);
const profFormPopup = new PopupWithForm(
  ".modal_type_profile",
  handleProfileSubmit
);
const profUserInfo = new UserInfo({
  userNameSelec: ".profile__name",
  descrSelec: ".profile__title",
});

// POPULATE INITIAL CARDS
export function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleCardEnlargement);
  return cardElement.render();
}

section.renderItems();

// ENLARGE CARD IMAGE
function handleCardEnlargement(evt) {
  enlrgImgPopup.open(evt);
}

// SUBMIT NEW CARD MODAL
export function handleNewCardFormSubmit(newCardData) {
  const newCardObj = new Section(
    { items: newCardData, renderer: createCard },
    ".gallery"
  );
  newCardObj.renderItems();

  newCardFormPopup.close();
  newCardModalForm.reset();

  newCardFormValidator.resetValidation();
}

// SUBMIT PROFILE MODAL
export function handleProfileSubmit(newProfData) {
  profUserInfo.setUserInfo(newProfData);
  profFormPopup.close();
}

// OPEN MODALS
addCardButton.addEventListener("click", () => {
  newCardFormPopup.open();
});

editProfileButton.addEventListener("click", function inputProfileInfo() {
  profFormPopup.open();
  const currUserInfo = profUserInfo.getUserInfo();
  profNameInput.value = currUserInfo.name;
  profDescrInput.value = currUserInfo.description;
  profileFormValidator.resetValidation();
});

// VALIDATION
newCardFormValidator.enableValidation();
profileFormValidator.enableValidation();
