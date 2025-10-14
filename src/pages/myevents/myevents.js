import "../../blocks/index.css";

const template = document.querySelector(".event-card-template");
const savedContainer = document.querySelector(".event-cards-list");
const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];

//Modal variables
const modals = document.querySelectorAll(".modal");
const myEventsModal = document.querySelector("#myevents-modal");
const modalImage = myEventsModal.querySelector(".modal-card__image");
const modalTitle = myEventsModal.querySelector(".modal-card__info-title");
const modalTime = myEventsModal.querySelector(".modal-card__info-time");
const modalDescription = myEventsModal.querySelector(
  ".modal-card__info-description"
);
const modalDeleteBtn = myEventsModal.querySelector(".modal-card__delete-btn");
const deleteModal = document.querySelector("#delete-modal");
const deleteModalBtn = deleteModal.querySelector(
  ".delete-modal__button-confirm"
);
const cancelModalBtn = deleteModal.querySelector(
  ".delete-modal__button-cancel"
);

const savedEventsTitle = document.querySelector(".event-cards__saved-title");
const noSavedEvents = document.querySelector(".event-card__not-saved");

const sortedEvents = [...savedEvents].sort((a, b) => {
  const aDate = new Date(a.time);
  const bDate = new Date(b.time);
  return aDate - bDate;
});

function renderText(updated) {
  // const refreshEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
  if (updated.length === 0) {
    noSavedEvents.classList.add("event-card__not-saved_active");
    savedEventsTitle.classList.remove("event-cards__saved-title_active");
  } else {
    noSavedEvents.classList.remove("event-card__not-saved_active");
    savedEventsTitle.classList.add("event-cards__saved-title_active");
  }
}
renderText(savedEvents);

function getEvents(data) {
  data.forEach((event) => {
    const eventElement = template.content
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
      openModal(myEventsModal, event);
    });

    savedContainer.appendChild(eventElement);
  });
}

getEvents(sortedEvents);

//Modal functions
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

let currentEvent;

function openModal(modal, event) {
  currentEvent = event;
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleKeyDown);
}

modalDeleteBtn.addEventListener("click", () => {
  openModal(deleteModal, currentEvent);
  closeModal(myEventsModal);
});

deleteModalBtn.addEventListener("click", () => {
  deleteEvent(currentEvent.id);
  closeModal(deleteModal);
  refreshEvents();
});

cancelModalBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleKeyDown);
}

//Modal delete functions
function deleteEvent(id) {
  const saved = JSON.parse(localStorage.getItem("savedEvents")) || [];
  const updatedEvents = saved.filter((event) => event.id !== id);
  localStorage.setItem("savedEvents", JSON.stringify(updatedEvents));
}

function refreshEvents() {
  savedContainer.innerHTML = "";
  const updated = JSON.parse(localStorage.getItem("savedEvents")) || [];
  const sortedUpdated = [...updated].sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );
  getEvents(sortedUpdated);
  renderText(updated);
}
