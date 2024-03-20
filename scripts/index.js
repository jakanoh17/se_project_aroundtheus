let initialCards = [
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

const closeProfileButton = document.querySelector(
  ".modal__close-button_edit-profile"
);
const closeNewCardButton = document.querySelector(
  ".modal__close-button_new-card"
);
const editProfileButton = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector(".modal_profile");
const profileModalNameInput = profileModal.querySelector(
  ".modal__input_type_name"
);
const profileModalDescriptionInput = profileModal.querySelector(
  ".modal__input_type_description"
);
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profileModalForm = document.getElementById("edit-form");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".gallery__card");
const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector(".modal_new-card");
const newCardModalForm = document.getElementById("new-card-form");
const newCardTitle = newCardModal.querySelector(
  ".modal__input_type_card-title"
);
const newCardLink = newCardModal.querySelector(".modal__input_type_card-link");
const closeImageButtons = document.querySelectorAll(
  ".enlarged-card__close-button"
);
// END OF DECLARATIONS

function closeProfileForm() {
  profileModal.classList.remove("modal_opened");
}

function closeNewCardForm() {
  newCardModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileModalNameInput.value;
  profileTitle.textContent = profileModalDescriptionInput.value;
  closeProfileForm();
}

function handleNewCardFormSubmit(evt) {
  let newCardElement = {
    name: `${newCardTitle.value}`,
    link: `${newCardLink.value}`,
  };
  initialCards.push(newCardElement);
  evt.preventDefault();
  closeNewCardForm();

  document.querySelector(".gallery").replaceChildren("");
  populateCards();
  enableLikeButton();
  enableDeleteButton();
  enableCardEnlargement();
}

profileModalForm.addEventListener("submit", handleProfileFormSubmit);

newCardModalForm.addEventListener("submit", handleNewCardFormSubmit);

function populateCards() {
  initialCards.forEach((arrCard) => {
    let cardElement = cardTemplate.cloneNode(true);
    let cardTitle = cardElement.querySelector(".gallery__location");
    let cardImage = cardElement.querySelector(".gallery__image");
    cardImage.setAttribute("src", arrCard.link);
    cardImage.setAttribute("alt", arrCard.name);
    cardTitle.textContent = arrCard.name;
    document.querySelector(".gallery").prepend(cardElement);
  });
}
populateCards();

// MISC BUTTON EVENTS
editProfileButton.addEventListener("click", function openProfileModal() {
  profileModal.classList.add("modal_opened");
});

editProfileButton.addEventListener("click", function inputProfileInfo() {
  profileModalNameInput.value = profileName.textContent;
  profileModalDescriptionInput.value = profileTitle.textContent;
});

addCardButton.addEventListener("click", () =>
  newCardModal.classList.add("modal_opened")
);

closeProfileButton.addEventListener("click", closeProfileForm);

closeNewCardButton.addEventListener("click", closeNewCardForm);

// LIKE BUTTON
function enableLikeButton() {
  const likeButtons = document.querySelectorAll(".gallery__like-button");

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", () =>
      likeButton.classList.add("gallery__like-button_selected")
    );
  });
}
enableLikeButton();

// DELETE CARD
function enableDeleteButton() {
  const trashButtons = document.querySelectorAll(".gallery__trash-icon");

  trashButtons.forEach((trashButton) =>
    trashButton.addEventListener("click", () =>
      trashButton.closest(".gallery__card").remove()
    )
  );
}
enableDeleteButton();

// ENLARGE CARD IMAGE -- LOOK AT THIS FUNCTION FIRST
function enableCardEnlargement() {
  const galleryImages = document.querySelectorAll(".gallery__image");
  const enlargedCardTemplate = document.getElementById("card-enlargement");

  function handleCardEnlargement(evt) {
    let enlargedCardElement = enlargedCardTemplate
      .cloneNode(true)
      .content.querySelector(".enlarged-card");
    enlargedCardElement.classList.remove("enlarged-card_hidden");
    enlargedCardElement.querySelector(".enlarged-card__image").src =
      evt.target.src;
    enlargedCardElement.querySelector(".enlarged-card__caption").textContent =
      evt.target.alt;
    document
      .querySelector(".enlarged-card-container")
      .append(enlargedCardElement);

    const closeButton = enlargedCardElement.querySelector(
      ".enlarged-card__close-button"
    );
    closeButton.addEventListener("click", () => {
      enlargedCardElement.classList.add("enlarged-card_hidden");
    });
  }

  galleryImages.forEach((image) =>
    image.addEventListener("click", handleCardEnlargement)
  );
}
enableCardEnlargement();
