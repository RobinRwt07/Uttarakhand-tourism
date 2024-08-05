import { fetchDataPlaces, getRegisteredUser } from "./functions.js";

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

// get registered User
const currentUser = getRegisteredUser();

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
</div>`;

const locationInfoCard = document.querySelector("#location-info-card");
locationInfoCard.innerHTML = `
<div class="location-info">
<h3>What to Know</h3>
<p>${data.description}</p>
</div>
<div class="time-to-visit ">
<h3>Best time to Visit</h3>
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

// hotel section

const hotelList = document.querySelector("#hotelList");
const allHotels = JSON.parse(localStorage.getItem("hotels") || "[]");
const filteredHotels = allHotels.filter(item => item.hotelLocation.toLowerCase() === data.placeName.toLowerCase());
if (filteredHotels.length === 0) {
  hotelList.innerHTML = `<h4 class="tx-center" style="flex:auto">Hotels are Not avilable at this Location</h4>`
}
else {
  for (const item of filteredHotels) {
    hotelList.innerHTML += `
      <div class="hotel-card">
        <div class="top">
          <img src="${item.hotelImage}" alt="hotel Image" loading="lazy">
        </div>
        <div class="bottom">
          <p>${item.hotelName}</p>
          <address>${item.hotelAddress}</address>
          <div>
            <span>Charges</span>
            <span>Rs ${item.charges}/ Day</span>
          </div>
          <a href="#">Book Now </a>
        </div>
      </div>`;
  }
}

const reviews = document.querySelector("#reviews");
const allReviews = JSON.parse(localStorage.getItem("usersReview")) || [];
const locationReview = allReviews.filter(item => item.location === data.placeName).slice(-6);
if (locationReview.length === 0) {
  reviews.innerHTML = `<h4 class="tx-center m-1" style="grid-column:span 2">reviews not available for this location</h4>`;
}
else {
  for (const item of locationReview) {
    reviews.innerHTML += `
      <div class="review">
          <div class="top">
            <div>
              <img src="./Assests/Yoga.jpg" alt="user image" width="40" height="40">
            </div>
            <div>
              <h4>${item.username}</h4>
              <div class="rating">
                <strong>Rating: ${item.rating}</strong>
                <i class="fa-solid fa-star fa-sm" style="color:orange"></i>
              </div>
            </div>
          </div>
          <div class="bottom">
            <p>${item.review}</p>
          </div>
      </div>`;
  }
}

const reviewFormBtn = document.querySelector("#reviewFormBtn");
const reviewBoxForm = document.querySelector("#reviewForm");

reviewFormBtn.addEventListener("click", () => {
  if (!currentUser) {
    alert("Please Login.");
    return;
  }
  reviewBoxForm.classList.toggle("hide");
  document.querySelector("#useremail").value = currentUser.email;
  document.querySelector("#username").value = currentUser.name;
});

// handle review form
const reviewForm = document.querySelector("#review-form");
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(reviewForm);
  formData.set("location", data.placeName);
  let reviewObj = Object.fromEntries(formData.entries());
  const reviewData = JSON.parse(localStorage.getItem("usersReview")) || [];
  reviewData.push(reviewObj);
  localStorage.setItem("usersReview", JSON.stringify(reviewData));
  alert("Review Submitted");
  location.reload();
});


const galleryContainer = document.querySelector("#galleryContainer");
const images = JSON.parse(localStorage.getItem("galleryImages")).filter(item => item.location === data.placeName).slice(-8);
if (images.length === 0) {
  galleryContainer.innerHTML = `<h4 class="tx-center m-1" style="grid-column:span 3">No Images 🥲</h4>`;
}
else {
  for (const item of images) {
    galleryContainer.innerHTML += `
       <div class="picture-card">
            <img src="${item.imageField}" alt="Picture">
        </div>`;
  }
}



// gallery section
const pictureUploadBtn = document.querySelector("#pictureUploadBtn");
const pictureUploadForm = document.querySelector("#pictureUploadForm");
document.querySelector("#uploaderName").value = currentUser.name;

pictureUploadBtn.addEventListener("click", () => {
  if (!currentUser) {
    alert("Please Login.");
    return;
  }
  pictureUploadForm.classList.toggle("hide");
});


document.querySelector("#imageField").addEventListener("input", (e) => {
  const image = e.target.value;
  showImagePreview(image);
})

// handle picture upload form
pictureUploadForm.firstElementChild.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(pictureUploadForm.firstElementChild);
  formData.set("location", data.placeName);
  formData.set("uploaderEmail", currentUser.email);
  let dataObj = Object.fromEntries(formData.entries());
  const galleryImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
  galleryImages.push(dataObj);
  localStorage.setItem("galleryImages", JSON.stringify(galleryImages));
  alert("Image Uploaded");
  location.reload();
});

function showImagePreview(image) {
  document.querySelector(".previewImage").src = image;
}