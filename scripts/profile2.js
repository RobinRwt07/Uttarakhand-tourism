const box = document.querySelector("#imageSelectorBox");
const imageUpdateBtn = document.querySelector("#imageUpdateBtn");
const closeModalBtn = document.querySelector("#closeModalBtn");
const updateImageBtn = document.querySelector("#updateImageBtn");

imageUpdateBtn.addEventListener("click", () => {
  box.showModal();
});

closeModalBtn.addEventListener("click", () => {
  box.close();
});


const fileSelectBtn = document.querySelector("#fileSelectBtn");

let isFilePresent = false;
fileSelectBtn?.addEventListener("change", (e) => {
  let file = e.target.files[0];
  if (file.size > 102400) {
    alert("Image size should be less then 100Kb");
    fileSelectBtn.value = null;
    return;
  }
  else {
    isFilePresent = true;
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      document.querySelector(".image-preview").src = e.target.result;
    });
    reader.readAsDataURL(file);
  }
})

updateImageBtn?.addEventListener("click", () => {
  if (!isFilePresent) {
    alert("Please select image");
  }
  else {
    const imageContent = document.querySelector(".image-preview").src;
    currentUser.profilePicture = imageContent;
    const users = JSON.parse(localStorage.getItem("registeredUsers"));
    const index = users.findIndex(item => item.email == currentUser.email);
    users.splice(index, 1, currentUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    location.reload();
  }
})