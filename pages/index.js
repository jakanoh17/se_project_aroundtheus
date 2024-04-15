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

function handleProfileFormSubmit(evt) {
  profileName.textContent = profileModalNameInput.value;
  profileTitle.textContent = profileModalDescriptionInput.value;
  closePopup(profileModal);
  evt.preventDefault();
}

addCardButton.addEventListener("click", () => {
  openPopup(newCardModal);
});
profileModalForm.addEventListener("submit", handleProfileFormSubmit);

// MISC BUTTON EVENTS
editProfileButton.addEventListener("click", function inputProfileInfo() {
  openPopup(profileModal);
  profileModalNameInput.value = profileName.textContent;
  profileModalDescriptionInput.value = profileTitle.textContent;
});

// ENLARGE CARD IMAGE
function handleCardEnlargement(evt) {
  openPopup(enlargedCardModal);
  enlargedImage.src = evt.target.src;
  enlargedImage.alt = evt.target.alt;
  enlargedCardCaption.textContent = evt.target.alt;
}

// CLOSING MODAL
closeModalButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

function closeWithOutsideClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function closeWithEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(evt.currentTarget.querySelector(".modal_opened"));
  }
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeWithEsc);
  popup.removeEventListener("click", closeWithOutsideClick);
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  popup.addEventListener("click", closeWithOutsideClick);
  document.addEventListener("keydown", closeWithEsc);
}
