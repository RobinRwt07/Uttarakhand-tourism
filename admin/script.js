fetchData();

async function fetchData() {
  try {
    const response = await fetch("../Json/data.json");
    const data = await response.json();
    displayAllDistrict(data);
    displayAllDistrict2(data);
  }
  catch (e) {
    console.log(e);
  }
}
const allDistricts = document.querySelector("#allDistricts");
const alllocations = JSON.parse(localStorage.getItem("UttarakhandTouristPlaces")) || [];
console.log(alllocations);


function displayAllDistrict(data) {
  const fragment = new DocumentFragment();
  for (const item of data) {
    const ele = document.createElement("option");
    ele.setAttribute("value", item.districtName);
    fragment.append(ele);
  }
  allDistricts.append(fragment);
}
function displayAllDistrict2(data) {

  const districts = document.querySelector("#districts");
  const fragment = new DocumentFragment();
  for (const item of data) {
    const ele = document.createElement("option");
    ele.setAttribute("value", item.districtName);
    fragment.append(ele);
  }
  districts.append(fragment);
}

const districtName = document.querySelector("#districtName");
const locationList = document.querySelector("#allLocations");
districtName.addEventListener("change", (e) => {
  locationList.innerHTML = "";
  const currentDistrict = e.target.value;
  const filteredLocations = alllocations.filter(item => item.districtName === currentDistrict);

  const fragment = new DocumentFragment();
  for (const item of filteredLocations) {
    const ele = document.createElement("option");
    ele.setAttribute("value", item.placeName);
    fragment.append(ele);
  }
  locationList.append(fragment);
});