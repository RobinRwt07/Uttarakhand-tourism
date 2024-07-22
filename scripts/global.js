const openBtn = document.querySelector("#menu-open-btn");
const closeBtn = document.querySelector("#menu-close-btn");
const header = document.querySelector("#header");

const loginbtn = document.querySelector("#login-logout");

if (localStorage.getItem("isUserSignIn") === "false") {
  loginbtn.innerHTML = `<a href="./signin.html" class="btn-style" role="button">Sign-Up</a>`;
}
else {
  loginbtn.innerHTML = `<button type="button" class="btn-style logoutBtn" id="logoutBtn">LogOut</button>`;
}


openBtn.addEventListener("click", () => {
  header.style.left = "0";
})

closeBtn.addEventListener("click", () => {
  header.style.left = "-300px";
});

// logout when button clicked
const logOut = document.querySelector("#logoutBtn");
logOut.addEventListener("click", () => {
  let ans = confirm("Are You Sure");
  if (ans) {
    let userCoookie = document.cookie;
    userCoookie += ";max-age=0";
    document.cookie = userCoookie;
    localStorage.setItem("isUserSignIn", false);
    location.href = "./signin.html";
  }
});

// load district info
const distrtictList = document.getElementById("district-list");
const fragment = new DocumentFragment();

if (localStorage.getItem("UttarakhandTourismData")) {
  const data = JSON.parse(localStorage.getItem("UttarakhandTourismData"));
  if (data) {
    for (const item of data) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.setAttribute("href", `./district.html?district=${item.districtName}`);
      a.textContent = item.districtName;
      li.appendChild(a);
      fragment.appendChild(li);
    }
    distrtictList.appendChild(fragment);
  }
}