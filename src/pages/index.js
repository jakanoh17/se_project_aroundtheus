import "./index.css";
import Card from "../components/Card.js";
import {
  editProfileButton,
  addCardButton,
  newCardModalForm,
  validationConfig,
  profileModalForm,
  editAviButton,
  editAviForm,
  profNameInput,
  profDescrInput,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

const enlrgImgPopup = new PopupWithImage(".modal_type_enlarged-card");
const newCardFormPopup = new PopupWithForm(
  ".modal_type_new-card",
  handleNewCardFormSubmit
);
const profFormPopup = new PopupWithForm(
  ".modal_type_profile",
  handleProfileSubmit
);
const delCardFormPopup = new PopupWithForm(
  ".modal_type_delete-card",
  handleDelCardSubmit
);
const editAviFormPopup = new PopupWithForm(
  ".modal_type_edit-avi",
  handleEditAviSubmit
);
const profUserInfo = new UserInfo({
  userNameSelec: ".profile__name",
  descrSelec: ".profile__title",
  aviSelec: ".profile__avatar",
});
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1e41f1e9-9859-4a6e-b008-27b738619ee0",
    "Content-Type": "application/json",
  },
});
const cardSection = new Section({ renderer: createCard }, ".gallery");
//INITIALLY SET USER INFO
api
  .getInitialUserInfo()
  .then((data) => {
    profUserInfo.setUserInfo(data);
  })
  .catch((err) => console.error(err));

// POPULATE INITIAL CARDS
export function createCard(data) {
  const cardElement = new Card(
    data,
    "#card-template",
    handleCardEnlargement,
    handleTrashClick,
    sendLikeReq
  );
  return cardElement.render();
}

api
  .getInitialCards()
  .then((data) => {
    data.reverse();

    cardSection.renderItems(data);
  })
  .catch((err) => console.error(err));

// ENLARGE CARD IMAGE
function handleCardEnlargement(evt) {
  enlrgImgPopup.open(evt);
}

// SUBMIT NEW CARD MODAL
function handleNewCardFormSubmit({ name, link }) {
  newCardFormPopup.renderLoading(true, "Creating...");
  api
    .postCards(name, link)
    .then((data) => {
      cardSection.renderItems([data]);
      newCardModalForm.reset();
      newCardFormPopup.close();
      formValidators[newCardModalForm.id].disableSubmitBtn();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      newCardFormPopup.renderLoading(false);
    });
}

// SUBMIT PROFILE MODAL
function handleProfileSubmit({ name, description: about }) {
  profFormPopup.renderLoading(true);

  api
    .editUserInfo(name, about)
    .then((data) => {
      profUserInfo.setUserInfo(data);
      profFormPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profFormPopup.renderLoading(false);
    });
}

// DELETE CARD MODAL
function handleTrashClick(evt) {
  delCardFormPopup.open();
  delCardFormPopup.popup.querySelector("input").value =
    evt.target.closest(".gallery__card").id;
}

function handleDelCardSubmit({ cardId }) {
  api
    .deleteCardInfo(cardId)
    .then(() => {
      document.getElementById(cardId).remove();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      delCardFormPopup.close();
    });
}

//LIKE CARD
function sendLikeReq(cardId, method) {
  return api.toggleLikeCard(cardId, method);
}

// EDIT AVATAR FORM
function handleEditAviSubmit(avatarObj) {
  editAviFormPopup.renderLoading(true);
  api
    .editAvatar(avatarObj)
    .then((data) => {
      profUserInfo.setUserInfo(data);
      editAviForm.reset();
      formValidators[editAviForm.id].disableSubmitBtn();
      editAviFormPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAviFormPopup.renderLoading(false);
    });
}

// OPEN MODALS
addCardButton.addEventListener("click", () => {
  newCardFormPopup.open();
});

editProfileButton.addEventListener("click", function inputProfileInfo() {
  profFormPopup.open();
  const { name, description } = profUserInfo.getUserInfo();
  profNameInput.value = name;
  profDescrInput.value = description;
  formValidators[profileModalForm.id].disableSubmitBtn();
});

editAviButton.addEventListener("click", () => {
  editAviFormPopup.open();
});

// FORM VALIDATION
const formValidators = {};
function enableValidators() {
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach((form) => {
    const validator = new FormValidator(validationConfig, form);
    formValidators[form.id] = validator;
    validator.enableValidation();
  });
}

enableValidators();
