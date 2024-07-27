const isAdminSignIn = localStorage.getItem("isAdminSignIn");
if (isAdminSignIn == null || isAdminSignIn === "false") {
  location.replace("../Error.html");
}

const queryParam = location.search.length === 0 ? "home" : location.search.slice(1);

const arr = ['home', 'places', 'hotels', 'blogs', 'events'];

if (!arr.includes(queryParam)) {
  location.replace("../Error.html");
}
const dashboradSection = document.querySelectorAll('[data-type]');
for (const item of dashboradSection) {
  if (item.attributes["data-type"].value === queryParam) {
    item.style.display = "block";
    document.querySelector(`[data-link="${item.attributes["data-type"].value}"]`).classList.add("active");
  }
}

const placeSection = document.querySelector("#placeSection");

const places = JSON.parse(localStorage.getItem("UttarakhandTouristPlaces"));
if (places.length === 0) {
  placeSection.innerHTML = `<h2 class="sub-heading"> No Places available</h2>`;
}
else {
  for (const item of places) {
    placeSection.innerHTML += `
        <tr>
          <td>${item.placeName}</td>
          <td>${item.districtName}</td>
          <td>${item.category}</td>
          <td>${item.popular}</td>
          <td style="text-align:center">
            <button class="m-0">Delete </button>
          </td>
        </tr>`
  }
}

function addPlaces() {
  document.querySelector("#allPlacesInfo").style.display = "none";
  document.querySelector("#addPlaceForm").style.display = "block";
}