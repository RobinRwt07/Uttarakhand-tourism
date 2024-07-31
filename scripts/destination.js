import { fetchDataPlaces } from "./functions.js";
if (!localStorage.getItem("UttarakhandTouristPlaces")) {
  fetchDataPlaces();
}

const destinationContainer = document.querySelector("#destinationContainer");

const spiritualContainer = document.querySelector("#spiritualContainer");

const places = JSON.parse(localStorage.getItem('UttarakhandTouristPlaces'));

const showPreviousSlide = document.querySelector("#showPreviousSlide");
const showNextSlide = document.querySelector("#showNextSlide");

let currentSlide = 0;
function displayPolularPlaces(n = 0) {
  currentSlide += n;
  const limit = 9;
  const offSet = currentSlide * limit;
  const lastIndex = offSet + limit;

  offSet <= 0 ? showPreviousSlide.classList.add("disabled") : showPreviousSlide.classList.remove("disabled");
  offSet >= (places.length - 1) ? showNextSlide.classList.add("disabled") : showNextSlide.classList.remove("disabled");

  const popularPlaces = places.slice(offSet, lastIndex);
  destinationContainer.innerHTML = "";
  for (const item of popularPlaces) {
    destinationContainer.innerHTML += `
    <div class="figure">
    <img src="./Assests/places/${item.image}" alt="${item.placeName}">
    <div class="location-info">
    <span>${item.placeName}</span>
    <a href="./location.html?place=${item.placeName}">Read More</a>
    </div>
    </div>`;
  }
}

displayPolularPlaces();

showNextSlide.addEventListener("click", () => {
  displayPolularPlaces(1);
});
showPreviousSlide.addEventListener("click", () => {
  displayPolularPlaces(-1);
});


// gettting all spiritual places
const spiritualPlaces = places.filter((item) => item.category === "temple").slice(0, 10);
spiritualContainer.innerHTML = "";
for (const item of spiritualPlaces) {
  spiritualContainer.innerHTML += `
    <div class="figure">
      <img src="./Assests/places/${item.image}" alt="${item.placeName}">
      <div class="location-info">
        <span>${item.placeName}</span>
        <a href="./location.html?place=${item.placeName}">Read More</a>
      </div>
    </div>`;
}

// script for trek section
const treksContainer = document.querySelector("#treksContainer");
window.addEventListener("load", () => {
  fetchTreks();
});

function fetchTreks() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", './Json/treks.json', true);
  xhr.responseType = 'json';
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status == 200) {
      const treks = xhr.response;
      treksContainer.innerHTML = "";
      if (treks.length === 0) {
        return;
      }
      for (const item of treks) {
        treksContainer.innerHTML += `
        <a href="#" class="trek-card">
          <div class="top">
          <img src="./Assests/treks/${item.image}" alt="${item.trekName}" loading="lazy">
          </div>
          <div class="bottom">
          <span>${item.trekDuration}</span>
          <p>${item.trekName}</p>
          <div class="first">
          <span>Dificulty Level</span>
          <span>${item.difficultyLevel}</span>
          </div>
          <div class="second">
          <span>
          <i class="fa-solid fa-road"></i>
          ${item.altitude}mts
          </span>
          <span>
          <i class="fa-solid fa-signal fa-sm"></i>
          ${item.distance}Km
          </span>
          </div>
          </div>
        </a>`;
      }
    }
  }
  xhr.onerror = function () {
    alert("Failed To Fetch Data");
  }
  xhr.send();
}


const eventContainer = document.querySelector("#event-container");
const events = JSON.parse(localStorage.getItem("events") || "[]");
if (events.length == 0) {
  eventContainer.innerHTML = `<h2 class="sub-heading">No Events</h2>`;
}
else {
  for (const item of events) {
    eventContainer.innerHTML += `
      <div class="event-item">
        <div class="event-image">
          <img src="${item.image}" alt="event image">
        </div>
        <div class="event-info">
          <h3>${item.eventName}</h3>
          <p>${item.eventDetails.slice(0, 300)}...</p>
          <strong> <span>${item.startDate} - ${item.endDate}</span></strong>
        </div>
      </div>`;
  }
}

// script for slider
const previousSlide = document.getElementById("previousSlide");
const nextSlide = document.getElementById("nextSlide");

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("event-item");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "flex";
}


previousSlide.addEventListener("click", () => {
  plusSlides(-1);
});

nextSlide.addEventListener("click", () => {
  plusSlides(1);
})
