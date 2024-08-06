const loginbtn = document.querySelector("#login-logout");
const profileBtn = document.querySelector(".profile-image");
const links = document.querySelector(".links");

if (localStorage.getItem("isUserSignIn") === "false") {
  loginbtn.innerHTML = `<a href="./signin.html" class="btn-style" role="button">Sign-Up</a>`;
}
else {
  loginbtn.innerHTML = `<button type="button" class="btn-style logoutBtn" id="logoutBtn" onclick='handleLogOut()' >Logout</button>`;
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