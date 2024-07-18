import { fetchData, fetchDataPlaces } from "./functions.js";
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
  if (searchValue.length === 0) {
    filteredItem = [];
  }
  else {
    filteredItem = allPlaces.filter(item => item.placeName.toLowerCase().includes(searchValue));
  }
  searchedItemContainer.innerHTML = "";
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