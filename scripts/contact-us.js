import { validateEmail, validateName } from "./functions.js";
const contact = document.querySelector("#contact-form");

const nameErr = document.querySelector("#nameError");
const emailErr = document.querySelector("#emailError");
const phoneErr = document.querySelector("#phoneError");
const msgErr = document.querySelector("#msgError");

function validateMessage(msg) {
  if (msg.length === 0) {
    return "Please enter your message."
  }
  else {
    return false;
  }
}

contact.addEventListener("submit", (e) => {
  e.preventDefault();
  const contactForm = new FormData(contact);
  let valid = true;

  const name = contactForm.get("username");
  const email = contactForm.get("useremail");
  const phone = contactForm.get("userphone");
  const msg = contactForm.get("message");

  nameErr.textContent = "";
  emailErr.textContent = "";
  phoneErr.textContent = "";
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