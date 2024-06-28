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
    const formData = new FormData(signIn);
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

});

