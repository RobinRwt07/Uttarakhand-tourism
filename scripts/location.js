import { fetchDataPlaces } from "./functions.js";

let queryParam = window.decodeURIComponent(location.search);
if (queryParam.length === 0) {
  location.replace("./Error.html");
}
const place = queryParam.split("=")[1].toLowerCase();
if (!localStorage.getItem("UttarakhandTouristPlaces")) {
  fetchDataPlaces();
}
const places = JSON.parse(localStorage.getItem("UttarakhandTouristPlaces"));
const data = places.find(item => place === item.placeName.toLowerCase());
if (!data) {
  location.replace("./Error.html");
}

const locationInfo = document.querySelector("#location-details");

locationInfo.innerHTML = `
<div class="image">
        <img src="./Assests/login.jpg" alt="image" fetchpriority="high">
</div>
<div class="banner-info">
<div>
    <h1>${data.placeName}</h1>
    <h2 id="location-name">${data.districtName}</h2>
</div>
</div>
`;

const locationInfoCard = document.querySelector("#location-info-card");

locationInfoCard.innerHTML = `
<div class="location-info">
<h2>What to Know</h2>
<p>${data.description}</p>
</div>
<div class="time-to-visit ">
<h2>Best time to Visit</h2>
<p>${data.bestTimeToVisit}</p>
</div>`;

const howToReach = document.querySelector("#how-to-reach");
howToReach.innerHTML = `<div class="card">
            <h3>By Road</h3>
            <p>${data.howToReach.byRoad}</p>
          </div>
          <div class="card">
            <h3>By Air</h3>
            <p>${data.howToReach.byAir}</p>
          </div>
          <div class="card">
            <h3>By Train</h3>
            <p>${data.howToReach.byTrain}</p>
          </div>`;