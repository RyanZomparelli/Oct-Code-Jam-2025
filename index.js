import "./src/blocks/index.css";
import { events } from "./src/utils/eventdata";
// import getEvents from "./src/utils/api";

//Card variables
const cardTemplate = document.querySelector(".event-card-template");
const cardsContainer = document.querySelector(".event-cards-list");

//Modal variables
const modals = document.querySelectorAll(".modal");
const cardModal = document.querySelector("#card-modal");
const modalCloseBtn = cardModal.querySelector(".modal__close-button");
const modalImage = cardModal.querySelector(".modal-card__image");
const modalTitle = cardModal.querySelector(".modal-card__info-title");
const modalTime = cardModal.querySelector(".modal-card__info-time");
const modalDescription = cardModal.querySelector(
  ".modal-card__info-description"
);
const confirmationModal = document.querySelector("#confirmation-modal");

//Filtering Functions
const filter = document.querySelector(".event-filter");

function handleMatch(e) {
  const inputValue = filter.value.toLowerCase();

  const matches = events.filter((event) =>
    event.title.toLowerCase().includes(inputValue)
  );
  renderMatches(matches);
}

function renderMatches(matches) {
  cardsContainer.innerHTML = "";
  getEvents(matches);
}

filter.addEventListener("input", handleMatch);

//Card Functions
//Sort events by date
const sortedEvents = [...events].sort((a, b) => {
  const aDate = new Date(a.time);
  const bDate = new Date(b.time);
  return aDate - bDate;
});

//Render cards
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
      // Pass event data to openModal
      openModal(cardModal, event);
    });

    modalCloseBtn.addEventListener("click", () => {
      closeModal(cardModal);
    });

    cardsContainer.appendChild(eventElement);
  });
}

getEvents(sortedEvents);

//Modal open/close functions

//Handle keydown event Escape close
function handleKeyDown(e) {
  modals.forEach((modal) => {
    if (e.key === "Escape") {
      closeModal(modal);
    }
  });
}

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

// Serves as a snapshot of the open modal at the time when the event data gets
// passed to the openModal function.
let currentEvent;

function openModal(modal, eventdata) {
  modal.classList.add("modal_is-opened");
  currentEvent = eventdata;
  document.addEventListener("keydown", handleKeyDown);

  if (modal.id === "confirmation-modal") {
    setTimeout(() => {
      closeModal(modal);
    }, 1000);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleKeyDown);
  saveEventBtn.removeEventListener("click", handleSave);
}

// My Events

const saveEventBtn = document.querySelector(".modal-card__save-btn");

function handleSave() {
  saveEvent(currentEvent);
}

saveEventBtn.addEventListener("click", () => {
  handleSave(currentEvent);
  openModal(confirmationModal);
  closeModal(cardModal);
});

function saveEvent(event) {
  // Prevent duplicates
  // Get the currently saved items from local storage.
  // If there are no items getItem return null so the empty array ensures we always have
  // an empty array to work with and we can use array methods like .some().
  const saved = JSON.parse(localStorage.getItem("savedEvents")) || [];

  // See if the title from our event matches any title already in local storage.
  const exists = saved.some((events) => events.title === event.title);

  // If the event doesn't exist in local storage save it.
  if (!exists) {
    // Add the event to the saved array from above.
    saved.push(event);
    // Using the setItem method on the global localStorage object.
    // It only takes strings and saves a json object like this:
    // '{'savedEvents': 'event'}'
    localStorage.setItem("savedEvents", JSON.stringify(saved));
  }
}
