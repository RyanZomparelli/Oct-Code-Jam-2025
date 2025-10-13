const template = document.querySelector(".event-card-template");
const savedContainer = document.querySelector(".event-cards-list");
const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];

if (savedEvents.length === 0) {
  const message = document.createElement("p");
  message.textContent = "No saved events yet!";
  savedContainer.appendChild(message);
}

const sortedEvents = [...savedEvents].sort((a, b) => {
  const aDate = new Date(a.time);
  const bDate = new Date(b.time);
  return aDate - bDate;
});

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
    savedContainer.appendChild(eventElement);
  });
}

getEvents(sortedEvents);
