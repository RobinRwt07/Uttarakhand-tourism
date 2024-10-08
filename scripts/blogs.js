import { getRegisteredUser } from "./functions.js";
import { showAlert } from "./alerts.js";

const blogForm = document.getElementById("blog-form");
const msgError = document.getElementById("msgError");
const headingError = document.getElementById("headingError");
const uploaderName = document.getElementById("user-name");
const uploaderEmail = document.getElementById("user-email");

// get the loggedIn user name and email
const currentUser = getRegisteredUser();
const openDialog = document.querySelector("#open-dialog");
const closeDialog = document.querySelector("#close-dialog");
const blog = document.querySelector("#blog");

openDialog.addEventListener("click", () => {
  if (localStorage.getItem("isUserSignIn") === "false" || localStorage.getItem("isUserSignIn") === null) {
    showAlert("error", "Please Login first");
    return;
  }
  else {
    blog.showModal();
    uploaderName.value = currentUser?.name || "";
    uploaderEmail.value = currentUser?.email || "";
  }
});
closeDialog.addEventListener("click", () => {
  blog.close();
});

blogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentUser) {
    showAlert("error", "Please login")
    return;
  }
  let valid = true;
  msgError.textContent = "";
  headingError.textContent = "";
  const blogData = new FormData(blogForm);
  const msg = blogData.get("message");
  if (msg.split(" ").length < 150) {
    valid = false;
    msgError.textContent = "blog content should contain at least 150 words";
  }
  if (blogData.get("blogheading").length === 0) {
    valid = false;
    headingError.textContent = "Please provide heading for blog"
  }

  if (valid) {
    const blog = {
      blogId: Math.floor(Math.random() * 900000) + 10000,
      heading: blogData.get("blogheading"),
      message: blogData.get("message"),
      userEmail: blogData.get("useremail"),
      uploadDate: new Date().toDateString(),
      name: blogData.get("username"),
      image: blogData.get("image") || "https://brandminds.ro/wp-content/uploads/2021/07/blogging-for-business-blog-articles-e1536066690505.jpg",
      likes: 0,
      dislikes: 0,
    };
    if (!localStorage.getItem("blogsData")) {
      localStorage.setItem("blogsData", "[]");
    }
    let blogs = JSON.parse(localStorage.getItem("blogsData"));
    blogs.push(blog);
    localStorage.setItem("blogsData", JSON.stringify(blogs));
    showAlert("success", "blog Uploaded");
    location.reload();
  }
});


const allBlogs = JSON.parse(localStorage.getItem("blogsData")) || [];
displayBlogs();

function displayBlogs() {
  const topBlogSection = document.querySelector("#topBlogSection");
  try {
    topBlogSection.innerHTML = `
  <div class="left">
    <img src="${allBlogs.at(-1).image}" alt="blog image">
    </div>
    <div class="right">
    <h2>${allBlogs.at(-1).heading}</h2>
    <p>${allBlogs.at(-1).message.split(" ", 50).join(" ")}</p>
    <div class="user-info">
      <div class="picture">
          <img src="./Assests/user_profile.jpg" alt="userImage" width="50" height="50">
      </div>
      <div>
          <h4>${allBlogs.at(-1).name}</h4>
          <p>${allBlogs.at(-1).uploadDate}</p>
      </div>
    </div>
  </div>`;

    const blogContainer = document.querySelector("#blogContainer");
    if (allBlogs.length === 0) {
      blogContainer.innerHTML = `<h2 class="sub-heading" style="text-align:center">blogs not available</h2>`;
    }
    else {
      for (const item of allBlogs) {
        blogContainer.innerHTML += `
        <div class="blog-card">
          <div class="top">
            <img src="${item.image ? item.image : "./Assests/blog_default2.jpg"}" alt="blog-image">
          </div>
          <div class="bottom">
            <h3 title="${item.heading}">${item.heading}</h3>
            <p>${item.message.slice(0, 60)}...</p>
            <a href="./blog.html?blogId=${item.blogId}">Read More></a>
          </div>
        </div>`;
      }
    }
  }
  catch (e) {
    console.log(e);
  }
}

displayTrendingBlogs();

function displayTrendingBlogs() {
  const trendingBlogs = document.querySelector("#trendingBlogs");
  allBlogs.sort((a, b) => {
    return b.likes - a.likes
  });

  if (allBlogs.length === 0) {
    trendingBlogs.innerHTML = `<h2 class="sub-heading" style="text-align:center">blogs not available</h2>`;
  }
  else {
    for (const item of allBlogs) {
      trendingBlogs.innerHTML += `
        <div class="blog-card">
          <div class="top">
            <img src="${item.image ? item.image : "./Assests/blog_default2.jpg"}" alt="blog-image">
          </div>
          <div class="bottom">
            <h3 title="${item.heading}">${item.heading}</h3>
            <p>${item.message.slice(0, 60)}...</p>
            <a href="./blog.html?blogId=${item.blogId}">Read More></a>
          </div>
        </div>`;
    }
  }
}