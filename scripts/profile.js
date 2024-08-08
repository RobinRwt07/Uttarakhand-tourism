function getRegisteredUser() {
  if (localStorage.getItem("isUserSignIn") === "false" || localStorage.getItem("isUserSignIn") === null) {
    return false;
  } else {
    const currentUser = JSON.parse(
      localStorage.getItem("registeredUsers")
    ).find((user) => user.email === localStorage.getItem("loggedInUser"));
    return currentUser;
  }
}

const currentUser = getRegisteredUser();

if (!currentUser) {
  location.replace("./signin.html");
}

// get the value of clicked section
const allSections = document.querySelectorAll("[data-type]");
const allLinks = document.querySelectorAll("[data-link]");
const slidebarLinks = document.querySelector(".slidebar-link");
const alluploadedBlogs = document.querySelector(".alluploadedBlogs");
const allUploadedReviews = document.querySelector(".allUploadedReviews");
const alluploadedImages = document.querySelector(".alluploadedImages");
const allBookings = document.querySelector(".allBookings");

const currentSection = "info";
showActiveSection(currentSection);

slidebarLinks.addEventListener("click", (e) => {
  try {
    if (e.target.tagName === "DIV" && e.target.hasAttribute("data-link")) {
      const section = e.target.getAttribute("data-link");
      showActiveSection(section);
    }
  }
  catch (e) {
    console.log(e);
  }
});

function showActiveSection(section) {
  try {
    for (const item of allSections) {
      if (item.getAttribute("data-type") === section) {
        item.style.display = "block";
        showActiveLink(section);
        if (section === "info") {
          displayInfo();
        }
        else if (section === "blogs") {
          displayAllBlogs();
        } else if (section == "review") {
          displayAllReviews();
        } else if (section == "gallery") {
          displayAllImages();
        } else if (section == "reset_passsword") {
          resetPassword();
        }
        else if (section == "booking") {
          displayAllBooking();
        }
      } else {
        item.style.display = "none";
      }
    }
  }
  catch (e) {
    console.log(e);
  }
}

function showActiveLink(link) {
  for (const item of allLinks) {
    if (item.getAttribute("data-link") == link) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }
}

function displayInfo() {
  const info = document.querySelector(".user-info");
  info.innerHTML = `
    <div>
      <img src="${currentUser?.profilePicture ? currentUser.profilePicture : "./Assests/user_profile.jpg"}" alt="user profile">
    </div>
    <h2>${currentUser?.name}</h2>
    <h5>${currentUser.email}</h5>
    <button type="button" id="imageUpdateBtn">Update Image</button>`;

  document.querySelector("#totalBlogs").textContent = countTotalUploadedBlogs(currentUser.email);
  document.querySelector("#totalPictures").textContent = countTotalUploadedPictures(currentUser.email);
  document.querySelector("#totalReviews").textContent = countTotalUploadedReviews(currentUser.email);
}

const allblogs = JSON.parse(localStorage.getItem("blogsData")) || [];

function displayAllBlogs() {
  const blogs = allblogs.filter((item) => item.userEmail === currentUser.email);
  if (blogs.length === 0) {
    alluploadedBlogs.innerHTML = `<h4 class="tx-center">No Blogs </h4>`;
  } else {
    for (const item of blogs) {
      alluploadedBlogs.innerHTML += `
        <div class="card">
              <h4 title="${item.heading}" >${item.heading}</h4>
              <p title="${item.message}" >${item.message.slice(0, 300)}..</p>
              <h5>Upload Date :${item.uploadDate}</h5>
              <div>
                <p> <strong>Likes : ${item.likes}</strong> </p>
                <p><strong>Dislikes: ${item.dislikes} </strong></p>
              </div>
              <button type="button" class="delete-btn" onclick='deleteBlog(${item.blogId
        })'>Delete</button>
        </div>`;
    }
  }
}

function deleteBlog(blogId) {
  if (confirm("Are You Sure?")) {
    let index = allblogs.findIndex((item) => item.blogId == blogId);
    if (index != -1) {
      allblogs.splice(index, 1);
      localStorage.setItem("blogsData", JSON.stringify(allblogs));
      location.reload();
    }
  }
}

const allReviews = JSON.parse(localStorage.getItem("usersReview")) || [];

function displayAllReviews() {
  const reviews = allReviews.filter(
    (item) => item.useremail === currentUser.email
  );
  if (reviews.length === 0) {
    allUploadedReviews.innerHTML = `<h4 class="tx-center mt-1">No Reviews </h4>`;
  } else {
    for (const item of reviews) {
      allUploadedReviews.innerHTML += `
          <div class="card">
            <p title="${item.review}">${item.review}</p>
            <h5>Location: ${item.location}</h5>
            <h5>Rating: ${item.rating}.0</h5>
            <button type="button" class="delete-btn" onclick='deleteReview("${item.reviewId}")'>Delete</button>
          </div>`;
    }
  }
}
const bookings = JSON.parse(localStorage.getItem("hotelBookedData")) || [];
const allhotelsList = JSON.parse(localStorage.getItem("hotels")) || [];
function displayAllBooking() {
  const bookedHotel = bookings.filter(
    (item) => item.customerEmail === currentUser.email
  );
  if (bookedHotel.length === 0) {
    allBookings.innerHTML = `<h4 class="tx-center mt-1">No Bookings</h4>`;
  }
  else {
    for (const item of bookedHotel) {
      const hotel = allhotelsList.find(ele => ele.hotelId === item.hotelId);
      allBookings.innerHTML += `
           <div class="card">
              <h4 title="${hotel.hotelName}">${hotel.hotelName}</h4>
              <p title="${hotel.hotelAddress}">${hotel.hotelAddress}</p>
              <p>Checkin Date : ${item.checkIn}</p>
              <p>Checkout Date : ${item.checkOut} </p>
              <h5>Payment Status: ${item.paymentStatus}</h5>
            </div>`;
    }
  }
}


function deleteReview(id) {
  if (confirm("are you sure?")) {
    const index = allReviews.findIndex((item) => item.reviewId == id);
    if (index != -1) {
      allReviews.splice(index, 1);
      localStorage.setItem("usersReview", JSON.stringify(allReviews));
      location.reload();
    }
  }
}

const allImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
function displayAllImages() {
  const images = allImages.filter(
    (item) => item.uploaderEmail == currentUser.email
  );
  if (images.length === 0) {
    alluploadedImages.innerHTML = `<h4 class="tx-center mt-1">No Images </h4>`;
  } else {
    for (const item of images) {
      alluploadedImages.innerHTML += `
        <div class="image-card">
          <img src="${item.imageField}" alt="image">
          <div>
            <button type="button" class="delete-btn" onclick='deleteImage("${item.imageId}")'><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>`;
    }
  }
}

function deleteImage(id) {
  if (confirm("Are You Sure?")) {
    let index = allImages.findIndex((item) => item.imageId == id);
    if (index != -1) {
      allImages.splice(index, 1);
      localStorage.setItem("galleryImages", JSON.stringify(allImages));
      location.reload();
    }
  }
}

function resetPassword() {
  const updatePassword = document.querySelector("#updatePassword");
  updatePassword.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(updatePassword);
    const oldPass = formData.get("oldPass");
    if (oldPass != currentUser.password) {
      showError("old password not matched.");
      return;
    }
    const newPass = formData.get("newPass");
    const cpass = formData.get("cpass");
    const result = validatePassword(newPass);
    if (result) {
      showError(result);
      return;
    }
    if (cpass !== newPass) {
      showError("new password not matched");
      return;
    }
    currentUser.password = newPass;
    const users = JSON.parse(localStorage.getItem("registeredUsers"));
    const index = users.findIndex(item => item.email == currentUser.email);
    users.splice(index, 1, currentUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    alert("Password Successfully Updated");
    location.reload();
  });
}

function showError(errorMsg) {
  const errorEle = document.querySelector("#showError");
  const ele = document.createElement("span");
  ele.textContent = errorMsg;
  errorEle.append(ele);
  setTimeout(() => {
    errorEle.removeChild(ele);
  }, 2000);
}


const validatePassword = (password) => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (password.length < 8) {
    return "Password should be at least 8 Character long";
  } else if (!regex.test(password)) {
    return "Password Should contain at least one special symbol,digit and capital letter";
  } else {
    return false;
  }
};

function countTotalUploadedBlogs(user) {
  const total = JSON.parse(localStorage.getItem("blogsData")).filter(item => item.userEmail === user);
  return total.length;
}

function countTotalUploadedPictures(user) {
  const total = JSON.parse(localStorage.getItem("galleryImages")) || [].filter(item => item.uploaderEmail === user);
  return total.length;
}

function countTotalUploadedReviews(user) {
  const total = JSON.parse(localStorage.getItem("usersReview")) || [].filter(item => item.useremail === user);
  return total.length;
}