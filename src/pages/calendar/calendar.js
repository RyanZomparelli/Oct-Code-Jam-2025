import "../../blocks/index.css";
import { events } from "../../utils/eventdata.js";

const daysContainer = document.getElementById("calendar-days");
const monthYear = document.getElementById("month-year");
const dayTemplate = document.getElementById("day-template");
const eventTemplate = document.getElementById("event-banner");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const weekdays = document.querySelector(".calendar__weekdays");

const modals = document.querySelectorAll(".modal");
const confirmationModal = document.getElementById("confirmation-modal");
const cardModal = document.querySelector("#card-modal");

let date = new Date();

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  const monthName = date.toLocaleString("default", { month: "long" });
  monthYear.textContent = `${monthName} ${year}`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Clear previous days
  daysContainer.innerHTML = "";

  // Add blank slots for days before the first
  for (let i = 0; i < firstDay.getDay(); i++) {
    const empty = dayTemplate.content.cloneNode(true);
    dayTemplate.classList.add("calendar__empty-day");
    daysContainer.appendChild(empty);
  }

  // Add real days
  for (let dayNum = 1; dayNum <= lastDay.getDate(); dayNum++) {
    const dayNode = dayTemplate.content.cloneNode(true);
    const dayDiv = dayNode.querySelector(".calendar__day");
    const numberSpanEl = dayDiv.querySelector(".calendar__day-number");
    numberSpanEl.textContent = dayNum; // Set the number

    // checking if event is on day and generating
    for (let event = 0; event < events.length; event++) {
      let eventTime = events[event].time;
      let eventName = events[event].title;
      let eventDate = new Date(eventTime);
      let eventMonth = eventDate.getMonth();
      let eventYear = eventDate.getFullYear();
      if (
        eventDate.getDate() === dayNum &&
        eventMonth === month &&
        eventYear === year
      ) {
        const eventBanner = eventTemplate.content.cloneNode(true);
        const eventTitle = eventBanner.querySelector(".calendar__event-name");
        const eventCardModal = document.getElementById("card-modal");
        const modalCloseBtn = eventCardModal.querySelector(
          ".modal__close-button"
        );
        const eventModalTitle = eventCardModal.querySelector(
          ".modal-card__info-title"
        );
        const eventModalDescription = eventCardModal.querySelector(
          ".modal-card__info-description"
        );
        const eventModalImage =
          eventCardModal.querySelector(".modal-card__image");
        const eventModalTime = eventCardModal.querySelector(
          ".modal-card__info-time"
        );

        eventTitle.textContent = eventName;

        eventTitle.addEventListener("click", () => {
          eventModalImage.src = events[event].image;
          eventModalImage.alt = events[event].title;
          eventModalTitle.textContent = events[event].title;
          eventModalTime.textContent = events[event].time;
          eventModalDescription.textContent = events[event].description;

          openModal(eventCardModal, events[event]);
        });

        modalCloseBtn.addEventListener("click", () => {
          closeModal(eventCardModal);
        });

        dayDiv.appendChild(eventBanner);
      }
    }

    // Highlight today
    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    if (isToday) dayDiv.classList.add("calendar__today");

    // // add a click event to each event
    // dayDiv.addEventListener("click", () => {
    //   console.log(`You clicked on ${dayNum} ${month} ${year}`);
    // });

    daysContainer.appendChild(dayNode);
  }

  // adds empty days after the the last
  for (let i = 0; i < 6 - lastDay.getDay(); i++) {
    const empty = dayTemplate.content.cloneNode(true);
    dayTemplate.classList.add("calendar__empty-day");
    daysContainer.appendChild(empty);
  }
}

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

function openModal(modal, eventdata) {
  modal.classList.add("modal_is-opened");
  currentEvent = eventdata;
  document.addEventListener("keydown", handleKeyDown);
  console.log(modal.id);

  if (modal.id === "confirmation-modal") {
    setTimeout(() => {
      closeModal(modal);
    }, 500);
  }
}

const saveEventBtn = document.querySelector(".modal-card__save-btn");

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleKeyDown);
  saveEventBtn.removeEventListener("click", saveEvent);
}

// My Events

saveEventBtn.addEventListener("click", () => {
  saveEvent(currentEvent);
  closeModal(cardModal);
  openModal(confirmationModal);
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

prevBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
