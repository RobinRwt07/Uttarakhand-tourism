import { validateEmail, validateName, getRegisteredUser } from "./functions.js";
const contact = document.querySelector("#contact-form");
const nameErr = document.querySelector("#nameError");
const emailErr = document.querySelector("#emailError");
const msgErr = document.querySelector("#msgError");

const currentUser = getRegisteredUser();

function validateMessage(msg) {
  if (msg.length === 0) {
    return "Please enter your message."
  }
  else {
    return false;
  }
}

document.querySelector("#user-name").value = currentUser?.name || "";
document.querySelector("#user-email").value = currentUser?.email || "";

contact.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentUser) {
    alert("please login first");
    return;
  }
  const contactForm = new FormData(contact);
  let valid = true;

  const name = contactForm.get("username");
  const email = contactForm.get("useremail");
  const msg = contactForm.get("message");

  nameErr.textContent = "";
  emailErr.textContent = "";
  msgErr.textContent = "";

  const isNameValid = validateName(name);
  if (isNameValid) {
    valid = false;
    nameErr.textContent = isNameValid;
  }

  const isEmailValid = validateEmail(email);
  if (isEmailValid) {
    valid = false;
    emailErr.textContent = isEmailValid;
  }

  const isMsgValid = validateMessage(msg);
  if (isMsgValid) {
    valid = false;
    msgErr.textContent = isMsgValid;
  }
  if (valid) {
    const data = Array.from(contactForm.entries());
    let dataObj = Object.fromEntries(data);
    dataObj.queryId = "QRY" + (Math.floor(Math.random() * 900000) + 10000);
    if (!localStorage.getItem('usersQuery')) {
      localStorage.setItem("usersQuery", "[]");
    }
    let queries = JSON.parse(localStorage.getItem("usersQuery"));
    queries.push(dataObj);
    localStorage.setItem("usersQuery", JSON.stringify(queries));
    alert("Message successfully sent");
    location.reload();
  }
})