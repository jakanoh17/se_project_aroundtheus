import Popup from "./Popup";
export default class PopupWithImage extends Popup {
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
