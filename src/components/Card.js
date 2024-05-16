//creates card element w event listeners
export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleTrashClick,
    handleLikeClick
  ) {
    this.data = data;
    this.cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;

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
    this._trashButton.addEventListener("click", this._handleTrashClick);
    this._image.addEventListener("click", this._handleImageClick);
    this._likeButton.addEventListener("click", (evt) => {
      this._selectLikeButton(evt);
    });
  }

  _selectLikeButton(evt) {
    this._likeButton.classList.toggle("gallery__like-button_selected");
    if (this._likeButton.classList.contains("gallery__like-button_selected")) {
      this._handleLikeClick(evt, "PUT");
    } else {
      this._handleLikeClick(evt, "DELETE");
    }
  }

  render() {
    this._location.textContent = this.data.name;
    this._image.setAttribute("alt", this.data.name);
    this._image.setAttribute("src", this.data.link);
    this._element.id = this.data._id;
    this._setEventListeners();

    if (this.data.isLiked) {
      this._likeButton.classList.add("gallery__like-button_selected");
    }

    return this._element;
  }
}
