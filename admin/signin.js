import { validateEmail, validatePassword } from "../scripts/functions.js";

let adminCredential = {
  email: "robin123@gmail.com",
  password: "Robin@1234admin"
}

const signIn = document.querySelector("#signin");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");

signIn.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  const formData = new FormData(signIn);;
  const isNotValid = validateEmail(formData.get("adminemail"));
  emailError.textContent = "";
  passwordError.textContent = "";

  if (isNotValid) {
    valid = false;
    emailError.textContent = isNotValid;
  }
  const notValid = validatePassword(formData.get("adminpassword"));
  if (notValid) {
    valid = false;
    passwordError.textContent = notValid;
  }
  // verify admin data
  if (valid) {
    let admin = {
      email: formData.get("adminemail"),
      password: formData.get("adminpassword")
    }

    if (adminCredential.email == admin.email && adminCredential.password == admin.password) {
      localStorage.setItem("isAdminSignIn", true);
      location.href = "./dashboard.html";
    }
    else {
      alert("Invalid Credentials");
    }
  }
});
