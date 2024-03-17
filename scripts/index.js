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
const profModalNameInput = profileModal.querySelector(
  ".modal__input_type_name"
);
const profModalDescriptionInput = profileModal.querySelector(
  ".modal__input_type_description"
);
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profModalForm = document.getElementById("edit-form");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".gallery__card");
const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector(".modal_new-card");
// END OF DECLARATIONS

function closeForm() {
  profileModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profModalNameInput.value;
  profileTitle.textContent = profModalDescriptionInput.value;
  closeForm();
}

initialCards.forEach((arrCard) => {
  let cardElement = cardTemplate.cloneNode(true);
  let cardTitle = cardElement.querySelector(".gallery__location");
  let cardImage = cardElement.querySelector(".gallery__image");
  cardImage.setAttribute("src", arrCard.link);
  cardImage.setAttribute("alt", arrCard.name);
  cardTitle.textContent = arrCard.name;
  document.querySelector(".gallery").prepend(cardElement);
});

// BUTTON EVENTS
profModalForm.addEventListener("submit", handleProfileFormSubmit);

editProfileButton.addEventListener("click", function openProfileModal() {
  profileModal.classList.add("modal_opened");
});

editProfileButton.addEventListener("click", function inputProfileInfo() {
  profModalNameInput.value = profileName.textContent;
  profModalDescriptionInput.value = profileTitle.textContent;
});

addCardButton.addEventListener("click", () =>
  newCardModal.classList.add("modal_opened")
);

closeProfileButton.addEventListener("click", closeForm);

closeNewCardButton.addEventListener("click", () =>
  newCardModal.classList.remove("modal_opened")
);
