const loginbtn = document.querySelector("#login-logout");
const profileBtn = document.querySelector(".profile-image");
const links = document.querySelector(".links");
const headerProfileImage = document.querySelector("#headerProfileImage");

if (localStorage.getItem("isUserSignIn") === "false" || localStorage.getItem("isUserSignIn") === null) {
  loginbtn.innerHTML = `<a href="./signin.html" class="btn-style" role="button">Sign-Up</a>`;
  headerProfileImage.innerHTML = `
  <img src="./Assests/user_profile.jpg" alt="profileImage">`
}
else {
  loginbtn.innerHTML = `<button type="button" class="btn-style logoutBtn" id="logoutBtn" onclick='handleLogOut()' >Logout</button>`;

  const user = JSON.parse(localStorage.getItem("registeredUsers")).find(item => item.email == localStorage.getItem("loggedInUser"));

  headerProfileImage.innerHTML = `
  <img src="${user?.profilePicture ? user.profilePicture : "./Assests/user_profile.jpg"}" alt="profileImage">`;
}

function handleLogOut() {
  let ans = confirm("Are You Sure");
  if (ans) {
    let userCoookie = document.cookie;
    userCoookie += ";max-age=0";
    document.cookie = userCoookie;
    localStorage.setItem("isUserSignIn", false);
    localStorage.removeItem("loggedInUser");
    location.href = "./signin.html";
  }
}

if (profileBtn) {
  displayDropDown();
}

function displayDropDown() {
  profileBtn.addEventListener("click", (e) => {
    links.classList.toggle("hide");
    links.style.display = "flex";
    if (links.classList.contains("hide")) {
      links.classList.add("hide");
      links.style.display = "none";
    }
  })
}