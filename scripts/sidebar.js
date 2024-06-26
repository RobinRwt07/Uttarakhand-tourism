const openBtn = document.querySelector("#menu-open-btn");
const closeBtn = document.querySelector("#menu-close-btn");
const header = document.querySelector("#header");

openBtn.addEventListener("click", () => {
    header.style.left = "0";
})

closeBtn.addEventListener("click", () => {
    header.style.left = "-300px";
})