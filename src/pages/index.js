import "./index.css";
import Card from "../components/Card.js";
import {
  editProfileButton,
  addCardButton,
  gallery,
  newCardFormValidator,
  profileFormValidator,
  enlrgImgPopup,
  section,
  newCardFormPopup,
  profUserInfo,
  profFormPopup,
} from "../utils/constants.js";

// INITIAL CARDS
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
export function handleNewCardFormSubmit(evt, newCardData) {
  gallery.prepend(createCard(newCardData));

  newCardFormPopup.close();

  evt.preventDefault();
  evt.target.reset();
  newCardFormValidator.resetValidation();
}

// SUBMIT PROFILE MODAL
export function handleProfileSubmit(evt, newProfData) {
  profUserInfo.setUserInfo(newProfData);
  profFormPopup.close();
  evt.preventDefault();
}

// OPEN MODALS
addCardButton.addEventListener("click", () => {
  newCardFormPopup.open();
});

editProfileButton.addEventListener("click", function inputProfileInfo() {
  profFormPopup.open();
  profUserInfo.getUserInfo();
  profileFormValidator.resetValidation();
});

// VALIDATION
newCardFormValidator.enableValidation();
profileFormValidator.enableValidation();