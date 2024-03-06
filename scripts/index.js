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

const closeButton = document.querySelector(".modal__close-button");
const editButton = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".modal");
const modalNameInput = modal.querySelector(".modal__input_type_name");
const modalDescriptionInput = modal.querySelector(
  ".modal__input_type_description"
);
const modalSaveButton = document.querySelector(".modal__save-button");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const modalForm = document.getElementById("edit-form");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".gallery__card");
// END OF DECLARATIONS

function closeForm() {
  modal.classList.remove("modal_opened");
}

closeButton.addEventListener("click", closeForm);

editButton.addEventListener("click", function () {
  modal.classList.add("modal_opened");
  modalNameInput.value = profileName.textContent;
  modalDescriptionInput.value = profileTitle.textContent;
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalNameInput.value;
  profileTitle.textContent = modalDescriptionInput.value;
  closeForm();
}

modalForm.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  console.log("cardElement", cardElement);
  let cardTitle = cardElement.querySelector(".gallery__location");
  let cardImage = cardElement.querySelector(".gallery__image");
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;
  return cardElement;
}

for (let initialCard of initialCards) {
  getCardElement(initialCard);
  document.querySelector(".gallery").prepend(getCardElement(initialCard));
}
