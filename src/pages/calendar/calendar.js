import "../../blocks/index.css";
import { events } from "../../utils/eventdata.js";

const daysContainer = document.getElementById("calendar-days");
const monthYear = document.getElementById("month-year");
const dayTemplate = document.getElementById("day-template");
const eventTemplate = document.getElementById("event-banner");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

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
        eventTitle.textContent = eventName;
        dayDiv.appendChild(eventBanner);
      }
    }

    // Highlight today
    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    if (isToday) dayDiv.classList.add("calendar__today");

    // add a click event to each day
    dayDiv.addEventListener("click", () => {
      console.log(`You clicked on ${dayNum} ${month} ${year}`);
    });

    daysContainer.appendChild(dayNode);
  }

  // adds empty days after the the last
  for (let i = 0; i < 6 - lastDay.getDay(); i++) {
    const empty = dayTemplate.content.cloneNode(true);
    dayTemplate.classList.add("calendar__empty-day");
    daysContainer.appendChild(empty);
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
