import { validateEmail, validatePassword, validateName } from "./functions.js";

const signIn = document.querySelector("#signin");
const signUp = document.querySelector("#signup");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const emailErr = document.querySelector("#emailErr");
const passwordErr = document.querySelector("#passwordErr");
const nameErr = document.querySelector("#nameErr");

signIn.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  const formData = new FormData(signIn);;
  const isNotValid = validateEmail(formData.get("useremail"));
  emailError.textContent = "";
  passwordError.textContent = "";

  if (isNotValid) {
    valid = false;
    emailError.textContent = isNotValid;
  }
  const notValid = validatePassword(formData.get("userpassword"));
  if (notValid) {
    valid = false;
    passwordError.textContent = notValid;
  }

  // verify user data
  if (valid) {
    let user = {
      email: formData.get("useremail"),
      password: formData.get("userpassword")
    }
    if (!localStorage.getItem("registeredUsers")) {
      localStorage.setItem("registeredUsers", "[]");
    }
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"));
    const isUserRegistered = registeredUsers.find((item) => item.email === user.email);
    if (!isUserRegistered) {
      alert("Please registered first");
      return;
    }
    if (user.email == isUserRegistered.email && user.password == isUserRegistered.password) {
      localStorage.setItem("isUserSignIn", true);
      localStorage.setItem("loggedInUser", user.email);
      let cookiesString = `username=${user.email}`;
      document.cookie = cookiesString;
      location.href = "./index.html";
    }
    else {
      alert("Invalid Credentials");
    }
  }
});

signUp.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  const formData = new FormData(signUp);
  console.log(formData.get("new-useremail"));

  const isNotValid = validateEmail(formData.get("new-useremail"));

  emailErr.textContent = "";
  passwordErr.textContent = "";
  nameErr.textContent = "";

  if (isNotValid) {
    valid = false;
    emailErr.textContent = isNotValid;
  }

  const isPasswordNotValid = validatePassword(formData.get("new-userpassword"));

  if (isPasswordNotValid) {
    valid = false;
    passwordErr.textContent = isPasswordNotValid;
  }

  const isNameNotValid = validateName(formData.get("new-username"));
  if (isNameNotValid) {
    valid = false;
    nameErr.textContent = isNameNotValid;
  }

  // if user credential are valid then store it into local storage
  if (valid) {
    let user = {
      name: formData.get("new-username"),
      email: formData.get("new-useremail"),
      password: formData.get("new-userpassword")
    }

    if (!localStorage.getItem("registeredUsers")) {
      localStorage.setItem("registeredUsers", "[]");
    }

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"))
    const isUserRegistered = registeredUsers.find((item) => item.email === user.email);
    if (isUserRegistered) {
      alert("User Already Registred");
    }
    else {
      let users = JSON.parse(localStorage.getItem("registeredUsers"));
      users.push(user);
      localStorage.setItem("registeredUsers", JSON.stringify(users));
      alert("Registred Successfully");
      location.reload();
    }
  }
});

