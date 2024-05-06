export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._closeButton = this.popup.querySelector(".modal__close-button");
    this._boundCloseHandler = this.close.bind(this);
    this._boundOutsideClickHandler = this._handleOutsideClick.bind(this);
    this._boundEscHandler = this._handleEscClose.bind(this);
  }

  open() {
    this.popup.classList.add("modal_opened");
    this.popup.addEventListener("click", this._boundOutsideClickHandler);
    document.addEventListener("keydown", this._boundEscHandler);
    this._closeButton.addEventListener("click", this._boundCloseHandler);
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
}
