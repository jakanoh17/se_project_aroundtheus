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
  apiHeaders,
  editAviButton,
  editAviForm,
  profName,
  profDescr,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

//CLASS INSTANCES
const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardModalForm
);

const profileFormValidator = new FormValidator(
  validationConfig,
  profileModalForm
);

const editAviFormValidator = new FormValidator(validationConfig, editAviForm);
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
  headers: apiHeaders,
});
const delCardApi = new Api({
  method: "DELETE",
  headers: apiHeaders,
});

//INITIALLY SET USER INFO
api
  .getUserInfo()
  .then((data) => {
    const { name, about, avatar } = data;
    profUserInfo.setUserInfo({ name, about, avatar });
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
  .getCards()
  .then((data) => {
    data.reverse();
    const initialSection = new Section(
      { items: data, renderer: createCard },
      ".gallery"
    );

    initialSection.renderItems();
  })
  .catch((err) => console.error(err));

// ENLARGE CARD IMAGE
function handleCardEnlargement(evt) {
  enlrgImgPopup.open(evt);
}

// SUBMIT NEW CARD MODAL
function handleNewCardFormSubmit({ name, link }) {
  const newCardApi = new Api({
    method: "POST",
    headers: apiHeaders,
    body: JSON.stringify({
      name,
      link,
    }),
  });

  newCardFormPopup.popup.querySelector(".modal__submit-button").textContent =
    "Creating...";

  newCardApi
    .getCards()
    .then((data) => {
      const newCardSection = new Section(
        { items: [data], renderer: createCard },
        ".gallery"
      );
      newCardSection.renderItems();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      newCardFormPopup.popup.querySelector(
        ".modal__submit-button"
      ).textContent = "Create";
      newCardFormPopup.close();
      newCardModalForm.reset();
      newCardFormValidator.resetValidation();
    });
}

// SUBMIT PROFILE MODAL
function handleProfileSubmit({ name, description: about }) {
  const editProfileApi = new Api({
    method: "PATCH",
    headers: apiHeaders,
    body: JSON.stringify({
      name,
      about,
    }),
  });
  profFormPopup.popup.querySelector(".modal__submit-button").textContent =
    "Saving...";
  editProfileApi
    .getUserInfo()
    .then(() => {
      profName.textContent = profNameInput.value;
      profDescr.textContent = profDescrInput.value;
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    })
    .finally(() => {
      profFormPopup.popup.querySelector(".modal__submit-button").textContent =
        "Save";
      profFormPopup.close();
    });
}

// DELETE CARD MODAL
function handleTrashClick(evt) {
  delCardFormPopup.open();
  delCardFormPopup.popup.querySelector("input").value =
    evt.target.closest(".gallery__card").id;
}

function handleDelCardSubmit({ cardId }) {
  delCardApi
    .deleteCardInfo(cardId)
    .then(() => {
      document.getElementById(cardId).remove();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(delCardFormPopup.close());
}

//LIKE CARD
function sendLikeReq(evt, method) {
  const likeCardApi = new Api({
    method: method,
    headers: apiHeaders,
  });
  likeCardApi.toggleLikeCard(evt.target.closest(".gallery__card").id);
}

// EDIT AVATAR FORM
function handleEditAviSubmit(avatarObj) {
  const editAviApi = new Api({
    method: "PATCH",
    headers: apiHeaders,
    body: JSON.stringify(avatarObj),
  });

  editAviFormPopup.popup.querySelector(".modal__submit-button").textContent =
    "Saving...";

  editAviApi
    .editAvatar()
    .then((data) => {
      profUserInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAviFormPopup.popup.querySelector(
        ".modal__submit-button"
      ).textContent = "Save";

      editAviForm.reset();
      editAviFormPopup.close();
    });
}

// OPEN MODALS
addCardButton.addEventListener("click", () => {
  newCardFormPopup.open();
});

editProfileButton.addEventListener("click", function inputProfileInfo() {
  profFormPopup.open();
  profNameInput.value = profName.textContent;
  profDescrInput.value = profDescr.textContent;
  profileFormValidator.resetValidation();
});

editAviButton.addEventListener("click", () => {
  editAviFormPopup.open();
  editAviFormValidator.resetValidation();
});

// FORM VALIDATION
newCardFormValidator.enableValidation();
profileFormValidator.enableValidation();
editAviFormValidator.enableValidation();
