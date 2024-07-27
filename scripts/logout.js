const loginbtn = document.querySelector("#login-logout");

if (localStorage.getItem("isUserSignIn") === "false") {
  loginbtn.innerHTML = `<a href="./signin.html" class="btn-style" role="button">Sign-Up</a>`;
}
else {
  loginbtn.innerHTML = `<button type="button" class="btn-style logoutBtn" id="logoutBtn">LogOut</button>`;
}
// script for logout functionality
try {
  const logOut = document.querySelector("#logoutBtn");
  logOut.addEventListener("click", () => {
    let ans = confirm("Are You Sure");
    if (ans) {
      let userCoookie = document.cookie;
      userCoookie += ";max-age=0";
      document.cookie = userCoookie;
      localStorage.setItem("isUserSignIn", false);
      localStorage.removeItem("loggedInUser");
      location.href = "./signin.html";
    }
  });
}
catch {
  console.log("Error occured");
}