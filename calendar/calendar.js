const daysContainer = document.getElementById("calendar-days");
const monthYear = document.getElementById("month-year");
const dayTemplate = document.getElementById("day-template");

let date = new Date();

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();

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
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dayNode = dayTemplate.content.cloneNode(true);
    const dayDiv = dayNode.querySelector(".calendar__day");

    dayDiv.textContent = day; // Set the number

    // Highlight today
    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    if (isToday) dayDiv.classList.add("calendar__today");

    // add a click event to each day
    dayDiv.addEventListener("click", () => {
      console.log(`You clicked on ${day} ${monthName} ${year}`);
    });

    daysContainer.appendChild(dayNode);
  }
}

renderCalendar();
