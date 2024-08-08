
export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.length === 0) {
    return "Please Enter Your Email";
  }
  else if (!regex.test(email)) {
    return "Please Provide Valid Email Address";
  }
  else {
    return false
  }
}

export const validatePassword = (password) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (password.length === 0) {
    return "Please Enter Your Password";
  }
  else if (password.length < 8) {
    return "Password should be at least 8 Character long";
  }
  else if (!regex.test(password)) {
    return "Password Should contain at least one special symbol,digit and capital letter";
  }
  else {
    return false;
  }
}

export const validateName = (name) => {
  const regex = /(^[a-zA-Z\s]{0,20}$)/;
  if (name.length === 0) {
    return "Name field Should not be empty";
  }
  else if (!regex.test(name)) {
    return "Name should only contain letter.";
  }
  else {
    return false;
  }
}

// check if data present in local storage or not

export async function fetchData() {
  try {
    const response = await fetch("./Json/data.json");
    const data = await response.json();
    if (data) {
      window.localStorage.setItem("UttarakhandTourismData", JSON.stringify(data))
    }
  }
  catch (err) {
    alert(err.message);
  }
}

export async function fetchDataPlaces() {
  try {
    const response = await fetch("./Json/places.json");
    const data = await response.json();
    if (data) {
      window.localStorage.setItem("UttarakhandTouristPlaces", JSON.stringify(data))
    }
  }
  catch (err) {
    alert(err.message);
  }
}

export function verifySignIn() {
  if (localStorage.getItem("isUserSignIn") === "false") {
    localStorage.setItem("isUserSignIn", false);
  }
}

export function getRegisteredUser() {
  if (localStorage.getItem("isUserSignIn") === "false" || localStorage.getItem("isUserSignIn") === null) {
    return false;
  }
  else {
    const currentUser = JSON.parse(localStorage.getItem("registeredUsers")).find(user => user.email === localStorage.getItem("loggedInUser"));
    return currentUser;
  }
}


export function showError(errorMsg) {
  const errorEle = document.querySelector("#showError");
  const ele = document.createElement("span");
  ele.textContent = errorMsg;
  errorEle.append(ele);
  setTimeout(() => {
    errorEle.removeChild(ele);
  }, 2000);
}