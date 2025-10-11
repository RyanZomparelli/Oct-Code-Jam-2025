import "./index.css";
import { events } from "./src/utils/eventdata";
// import getEvents from "./src/utils/api";

//Card variables
const cardTemplate = document.querySelector(".event-card-template");
const cardsContainer = document.querySelector(".event-cards-list");

//Modal variables
const modals = document.querySelectorAll(".modal");
const cardModal = document.querySelector("#card-modal");
const modalDeleteBtn = cardModal.querySelector(".modal__close-button");
const modalImage = cardModal.querySelector(".modal-card__image");
const modalTitle = cardModal.querySelector(".modal-card__info-title");
const modalTime = cardModal.querySelector(".modal-card__info-time");
const modalDescription = cardModal.querySelector(
  ".modal-card__info-description"
);

//Card Functions
function getEvents(data) {
  data.forEach((event) => {
    const eventElement = cardTemplate.content
      .querySelector(".event-card")
      .cloneNode(true);
    const cardImage = eventElement.querySelector(".event-card__image");
    const cardTitle = eventElement.querySelector(".event-card__info-title");
    const cardTime = eventElement.querySelector(".event-card__info-time");
    const cardDescription = eventElement.querySelector(
      ".event-card__info-description"
    );
    cardImage.src = event.image;
    cardImage.alt = event.title;
    cardTitle.textContent = event.title;
    cardTime.textContent = event.time;
    cardDescription.textContent = event.description;

    eventElement.addEventListener("click", () => {
      modalImage.src = event.image;
      modalImage.alt = event.title;
      modalTitle.textContent = event.title;
      modalTime.textContent = event.time;
      modalDescription.textContent = event.description;
      openModal(cardModal);
    });

    modalDeleteBtn.addEventListener("click", () => {
      closeModal(cardModal);
    });

    cardsContainer.appendChild(eventElement);
  });
}

getEvents(events);

//Modal open/close functions

modals.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (
      evt.target.classList.contains("modal__close-button") ||
      evt.target.classList.contains("modal")
    ) {
      closeModal(modal);
    }
  });
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", closeModalEscapeKey);
}
