function getRegisteredUser() {
  if (localStorage.getItem("isUserSignIn") === "false") {
    return false;
  }
  else {
    const currentUser = JSON.parse(localStorage.getItem("registeredUsers")).find(user => user.email === localStorage.getItem("loggedInUser"));
    return currentUser;
  }
}

const currentUser = getRegisteredUser();

if (!currentUser) {
  location.replace("../Error.html");
}

// get the value of clicked section
const allSections = document.querySelectorAll("[data-type]");
const allLinks = document.querySelectorAll("[data-link]");
const slidebarLinks = document.querySelector(".slidebar-link");
const alluploadedBlogs = document.querySelector(".alluploadedBlogs");
const currentSection = "info";

showActiveSection(currentSection);

slidebarLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "DIV" && e.target.hasAttribute("data-link")) {
    const section = e.target.getAttribute("data-link");
    showActiveSection(section)
  }
})


function showActiveSection(section) {
  for (const item of allSections) {
    if (item.getAttribute("data-type") === section) {
      item.style.display = "block";
      showActiveLink(section);
      if (section === "blogs") {
        displayAllBlogs();
      }
    }
    else {
      item.style.display = "none";
    }
  }
}

function showActiveLink(link) {
  for (const item of allLinks) {
    if (item.getAttribute("data-link") == link) {
      item.classList.add("active");
    }
    else {
      item.classList.remove("active");
    }
  }
}

const allblogs = JSON.parse(localStorage.getItem("blogsData")) || [];

function displayAllBlogs() {
  const blogs = allblogs.filter(item => item.userEmail === currentUser.email);
  if (blogs.length === 0) {
    alluploadedBlogs.innerHTML = `<h4 class="tx-center">No Blogs </h4>`;
  }
  else {

    for (const item of blogs) {
      alluploadedBlogs.innerHTML += `
        <div class="card">
              <h4 title="${item.heading}" >${item.heading}</h4>
              <p title="${item.message}" >${item.message.slice(0, 300)}..</p>
              <h5>Upload Date :${item.uploadDate}</h5>
              <div>
                <p> <strong>Likes : ${item.likes}</strong> </p>
                <p><strong>Dislikes: ${item.dislikes} </strong></p>
              </div>
              <button type="button" class="delete-btn" onclick='deleteBlog(${item.blogId})'>Delete</button>
        </div>`;
    }
  }
}

function deleteBlog(blogId) {
  if (confirm("Are You Sure?")) {
    let index = allblogs.findIndex(item => item.blogId == blogId);
    allblogs.splice(index, 1);
    localStorage.setItem("blogsData", JSON.stringify(allblogs));
    location.reload();
  }
}

