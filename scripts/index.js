const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const closeModalButtons = document.querySelectorAll(".modal__close-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector(".modal_type_profile");
const profileModalNameInput = profileModal.querySelector(
  ".modal__input_type_name"
);
const profileModalDescriptionInput = profileModal.querySelector(
  ".modal__input_type_description"
);
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profileModalForm = document.forms["edit-form"];
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".gallery__card");
const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector(".modal_type_new-card");
const newCardModalForm = document.forms["new-card-form"];
const newCardTitle = newCardModal.querySelector(
  ".modal__input_type_card-title"
);
const newCardLink = newCardModal.querySelector(".modal__input_type_card-link");
const gallery = document.querySelector(".gallery");
const enlargedCardModal = document.querySelector(".modal_type_enlarged-card");
const enlargedImage = enlargedCardModal.querySelector(".modal__enlarged-image");
const enlargedCardCaption = enlargedCardModal.querySelector(".modal__caption");

// END OF DECLARATIONS

// INITIAL CARDS
function populateInitialCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card);
    gallery.prepend(cardElement);
  });
}
populateInitialCards();

// NEW CARDS
newCardModalForm.addEventListener("submit", handleNewCardFormSubmit);

function handleNewCardFormSubmit(evt) {
  const newCardElement = {
    name: `${newCardTitle.value}`,
    link: `${newCardLink.value}`,
  };
  const newCard = createCard(newCardElement);
  populateNewCard(newCard);
  closePopup(newCardModal);

  evt.preventDefault();
  evt.target.reset();
}

function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".gallery__location");
  const cardImage = cardElement.querySelector(".gallery__image");
  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;
  enableLikeButton(cardElement);
  enableDeleteButton(cardElement);
  enableCardEnlargement(cardElement);

  return cardElement;
}

function populateNewCard(newCard) {
  gallery.prepend(newCard);
}

addCardButton.addEventListener("click", () => openPopup(newCardModal));

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileModalNameInput.value;
  profileTitle.textContent = profileModalDescriptionInput.value;
  closePopup(profileModal);
}

profileModalForm.addEventListener("submit", handleProfileFormSubmit);

// MISC BUTTON EVENTS
editProfileButton.addEventListener("click", function inputProfileInfo() {
  openPopup(profileModal);
  profileModalNameInput.value = profileName.textContent;
  profileModalDescriptionInput.value = profileTitle.textContent;
});

closeModalButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

// LIKE BUTTONS
function enableLikeButton(card) {
  const newLikeButton = card.querySelector(".gallery__like-button");

  newLikeButton.addEventListener("click", () => {
    newLikeButton.classList.toggle("gallery__like-button_selected");
  });
}

// DELETE CARD
function enableDeleteButton(card) {
  const newTrashButton = card.querySelector(".gallery__trash-icon");

  newTrashButton.addEventListener("click", () =>
    newTrashButton.closest(".gallery__card").remove()
  );
}

// ENLARGE CARD IMAGE
function enableCardEnlargement(card) {
  const galleryCardImage = card.querySelector(".gallery__image");

  function handleCardEnlargement(evt) {
    openPopup(enlargedCardModal);
    enlargedImage.src = evt.target.src;
    enlargedImage.alt = evt.target.alt;
    enlargedCardCaption.textContent = evt.target.alt;
  }

  galleryCardImage.addEventListener("click", handleCardEnlargement);
}
