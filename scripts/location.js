import { fetchDataPlaces, getRegisteredUser, showError, validateName } from "./functions.js";
import { showAlert } from "./alerts.js";

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
          <button type="button" data-hotelId="${item.hotelId}">Book Now </button>
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
    showAlert("error", "Please Login");
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
  formData.set("reviewId", "RVW" + (Math.floor(Math.random() * 900000) + 10000));
  let reviewObj = Object.fromEntries(formData.entries());
  const reviewData = JSON.parse(localStorage.getItem("usersReview")) || [];
  reviewData.push(reviewObj);
  localStorage.setItem("usersReview", JSON.stringify(reviewData));
  showAlert("success", "Review Submitted");
  location.reload();
});


const galleryContainer = document.querySelector("#galleryContainer") || [];
const images = JSON.parse(localStorage.getItem("galleryImages") || "[]").filter(item => item.location == data.placeName).slice(-8);
console.log(data.placeName);
console.log(images);

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
    showAlert("error", "Please Login");
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
  formData.set("imageId", "IMG" + (Math.floor(Math.random() * 900000) + 10000));
  let dataObj = Object.fromEntries(formData.entries());
  const galleryImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
  galleryImages.push(dataObj);
  localStorage.setItem("galleryImages", JSON.stringify(galleryImages));
  showAlert("success", "Image Uploaded");
  location.reload();
});

function showImagePreview(image) {
  document.querySelector(".previewImage").src = image;
}

// hotel booking

hotelList.addEventListener("click", (e) => {
  if (!currentUser) {
    showAlert("error", "Please Login");
    return;
  }
  if (e.target.tagName === "BUTTON") {
    const id = e.target.getAttribute("data-hotelId");
    bookHotel(id);
  }
});

const bookingForm = document.querySelector("#hotelBookingForm");
function bookHotel(id) {
  bookingForm.showModal();
  document.querySelector("#customerName").value = currentUser.name;
  document.querySelector("#bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#bookingForm"));
    formData.set("hotelId", id);
    formData.set("customerEmail", currentUser.email);

    const checkInDate = new Date(formData.get("checkIn"));
    const checkOutDate = new Date(formData.get("checkOut"));
    if (checkInDate > checkOutDate) {
      showError("please enter valid Date");
      return;
    }
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const obj = Object.fromEntries(formData.entries());
    const hotel = JSON.parse(localStorage.getItem("hotels")).find(item => item.hotelId === id);
    const amount = (hotel.charges * diffDays) * formData.get("noOfRoom");
    document.querySelector("#bookingForm").style.display = "none";
    document.querySelector("#checkoutForm").style.display = "flex";
    displayPayment(amount, obj);
  });

}

function displayPayment(amount, obj) {
  document.querySelector("#totalPayment").textContent = amount;
  const paymentForm = document.querySelector("#paymentForm");
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(paymentForm);
    const name = formData.get("cardHolderName");
    const cardNumber = formData.get("cardNumber");
    const res = validateName(name);
    if (res) {
      showError(res);
      return;
    }
    if (cardNumber.length !== 16) {
      showError("please provide valid card Number");
      return;
    }
    let paymentInfo = {
      paymentId: "PYMT" + (Math.floor(Math.random() * 900000) + 10000),
      paymentStatus: "Done",
    }
    const bookingData = { ...obj, ...paymentInfo }
    const bookedHotel = JSON.parse(localStorage.getItem("hotelBookedData")) || [];
    bookedHotel.push(bookingData);
    localStorage.setItem("hotelBookedData", JSON.stringify(bookedHotel));
    showAlert("success", "Booking Confirmed");
    bookingForm.close();
  });
}


const dialogClosebtn = document.querySelector("#dialogClosebtn");
dialogClosebtn.onclick = () => {
  bookingForm.close();
}