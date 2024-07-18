const openBtn = document.querySelector("#menu-open-btn");
const closeBtn = document.querySelector("#menu-close-btn");
const header = document.querySelector("#header");

openBtn.addEventListener("click", () => {
  header.style.left = "0";
})

closeBtn.addEventListener("click", () => {
  header.style.left = "-300px";
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

