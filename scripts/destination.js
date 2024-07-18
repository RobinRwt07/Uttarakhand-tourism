import { fetchDataPlaces } from "./functions.js";
if (!localStorage.getItem("UttarakhandTouristPlaces")) {
  fetchDataPlaces();
}

const destinationContainer = document.querySelector("#destinationContainer");
const spiritualContainer = document.querySelector("#spiritualContainer");

const places = JSON.parse(localStorage.getItem('UttarakhandTouristPlaces'));

const popularPlaces = places.filter((item) => item.popular == true).slice(0, 10);

destinationContainer.innerHTML = "";
for (const item of popularPlaces) {
  destinationContainer.innerHTML += `
  <div class="figure">
  <img src="./Assests/pexels-sanmane-1365425.jpg" alt="${item.placeName}">
  <div class="location-info">
  <span>${item.placeName}</span>
  <a href="./location.html?place=${item.placeName}">Read More</a>
  </div>
  </div>`;
}

const spiritualPlaces = places.filter((item) => item.category === "temple").slice(0, 10);
console.log(spiritualPlaces);
spiritualContainer.innerHTML = "";
for (const item of spiritualPlaces) {
  spiritualContainer.innerHTML += `
    <div class="figure">
      <img src="./Assests/Kedarnath.jpeg" alt="${item.placeName}">
      <div class="location-info">
        <span>${item.placeName}</span>
        <a href="./location.html?place=${item.placeName}">Read More</a>
      </div>
    </div>`;
}