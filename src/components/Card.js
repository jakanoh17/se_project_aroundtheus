export default class Card {
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

    return this._element;
  }
}
