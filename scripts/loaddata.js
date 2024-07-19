import { fetchData, fetchDataPlaces, verifySignIn } from "./functions.js";

verifySignIn();

if (!localStorage.getItem("UttarakhandTourismData")) {
  fetchData();
}
if (!localStorage.getItem("UttarakhandTouristPlaces")) {
  fetchDataPlaces();
}

const searchField = document.querySelector("#searchField");
const searchedItemContainer = document.querySelector("#searchedItemContainer");

const allPlaces = JSON.parse(localStorage.getItem("UttarakhandTouristPlaces"));

searchField.addEventListener("input", () => {
  filterSearchPlaces(searchField.value);
});

function filterPlace(searchValue) {
  let filteredItem = [];
  searchValue = searchValue.toLowerCase();
  searchedItemContainer.innerHTML = "";

  if (searchValue.length === 0) {
    filteredItem = [];
    searchedItemContainer.innerHTML = '';
    return;
  }
  else {
    filteredItem = allPlaces.filter(item => item.placeName.toLowerCase().includes(searchValue));
  }
  if (filteredItem.length === 0) {
    searchedItemContainer.innerHTML = `<li><a>No Match Found</a></li>`;
    return
  }
  for (const item of filteredItem) {
    searchedItemContainer.innerHTML += `<li><a href="./location.html?place=${item.placeName}">${item.placeName}, ${item.districtName}</a></li>`
  }
}

function debounce(fun, delay = 500) {
  let timer;
  return (searchVal) => {
    clearTimeout(timer);
    timer = setTimeout(() => { fun.call({}, searchVal) }, delay);
  }
}

const filterSearchPlaces = debounce(filterPlace, 700);