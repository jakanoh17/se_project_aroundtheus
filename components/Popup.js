//don't instantiate yet!!!!!!
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
    this._enlrgImgCap = this.popup.querySelector(".modal__caption");
  }

  open(evt) {
    super.open();
    console.log(evt.target);
    this.popup.src = evt.target.src;
    this.popup.alt = evt.target.alt;
    this._enlrgImgCap.textContent = evt.target.alt;
  }
}
