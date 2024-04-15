import { newCardFormValidator } from "./FormValidator";

// if I can figure out the import then delete vconfig variable
// const validationConfig = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__submit-button",
//   inactiveButtonClass: "modal__submit-button_inactive",
//   inputErrorClass: "modal__input_invalid",
//   errorClass: "modal__error-message_visible",
// };
//

class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.data = data;
    this.cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._element = document
      .querySelector(this.cardSelector)
      .content.querySelector(".gallery__card")
      .cloneNode(true);
    this._location = this._element.querySelector(".gallery__location");
    this._image = this._element.querySelector(".gallery__image");
    this._likeButton = this._element.querySelector(".gallery__like-button");
    this._trashButton = this._element.querySelector(".gallery__trash-icon");
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });
    this._image.addEventListener("click", this._handleImageClick);
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle("gallery__like-button_selected");
  }

  _handleDeleteButtonClick() {
    this._trashButton.closest(".gallery__card").remove();
  }

  render() {
    this._location.textContent = this.data.name;
    this._image.setAttribute("alt", this.data.name);
    this._image.setAttribute("src", this.data.link);

    this._setEventListeners();

    gallery.prepend(this._element);
  }
}

// INITIAL CARDS
initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handleCardEnlargement);
  card.render();
});

// NEW CARDS

function handleNewCardFormSubmit(evt) {
  const newCardElement = {
    name: `${newCardTitle.value}`,
    link: `${newCardLink.value}`,
  };
  const card = new Card(
    newCardElement,
    "#card-template",
    handleCardEnlargement
  );
  card.render();

  closePopup(newCardModal);

  evt.preventDefault();
  evt.target.reset();
  newCardFormValidator._toggleSubmitButton();
  //   delete below if you figure out the import
  //   evt.target
  //     .querySelector(validationConfig.submitButtonSelector)
  //     .setAttribute("disabled", true);
  //   evt.target
  //     .querySelector(validationConfig.submitButtonSelector)
  //     .classList.add(validationConfig.inactiveButtonClass);
  //
}

newCardModalForm.addEventListener("submit", handleNewCardFormSubmit);
