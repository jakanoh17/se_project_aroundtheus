import { newCardTitle, newCardLink } from "../utils/constants.js";

class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._closeButton = this.popup.querySelector(".modal__close-button");
    this._boundCloseHandler = this.close.bind(this);
    this._boundOutsideClickHandler = this._handleOutsideClick.bind(this);
    this._boundEscHandler = this._handleEscClose.bind(this);
  }

  open() {
    this.popup.classList.add("modal_opened");
  }

  close() {
    this.popup.classList.remove("modal_opened");
    this.popup.removeEventListener("click", this._boundOutsideClickHandler);
    document.removeEventListener("keydown", this._boundEscHandler);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOutsideClick(evt) {
    if (evt.target === this.popup) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this._boundCloseHandler);
    this.popup.addEventListener("click", this._boundOutsideClickHandler);
    document.addEventListener("keydown", this._boundEscHandler);
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._enlrgImg = this.popup.querySelector(".modal__enlarged-image");
    this._enlrgImgCap = this.popup.querySelector(".modal__caption");
  }

  open(evt) {
    super.open();
    this._enlrgImg.src = evt.target.src;
    this._enlrgImg.alt = evt.target.alt;
    this._enlrgImgCap.textContent = evt.target.alt;
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit.bind(this);
  }

  _getInputValues() {
    this._newCard = {
      name: newCardTitle.value,
      link: newCardLink.value,
    };
    return this._newCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener("submit", (evt) => {
      this._handleSubmit(evt, this._getInputValues());
    });
  }
}

export class UserInfo extends Popup {
  constructor(popupSelector, { userNameSelec, descrSelec }) {
    super(popupSelector);
    this.userName = this.popup.querySelector(userNameSelec);
    this.descr = this.popup.querySelector(descrSelec);
  }

  // get current user info
  getUserInfo() {
    return (this._userInfo = {
      name: document.querySelector(".profile__name"),
      title: document.querySelector(".profile__title"),
    });
  }

  open() {
    super.open();
    this.getUserInfo();
    this.userName.value = this._userInfo.name.textContent;
    this.descr.value = this._userInfo.title.textContent;
  }

  setUserInfo() {
    this._userInfo.name.textContent = this.userName.value;
    this._userInfo.title.textContent = this.descr.value;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener("submit", (evt) => {
      this.setUserInfo();
      this.close();
      evt.preventDefault();
    });
  }
}
