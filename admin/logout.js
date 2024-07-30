try {
  const logOut = document.querySelector("#adminLogoutBtn");
  logOut.addEventListener("click", () => {
    let ans = confirm("Are You Sure");
    if (ans) {
      localStorage.setItem("isAdminSignIn", false);
      location.href = "./adminlogin.html";
    }
  });
}
catch {
  console.log("Error occured");
}