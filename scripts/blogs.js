const blogForm = document.getElementById("blog-form");
const msgError = document.getElementById("msgError");
const headingError = document.getElementById("headingError");
const uploaderName = document.getElementById("user-name");
const uploaderEmail = document.getElementById("user-email");

blogForm.addEventListener("submit", (e) => {
  if (localStorage.getItem("isUserSignIn") === "false") {
    alert("Please Login");
    location.href = "./signin.html";
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
      image: blogData.get("image") || "https://brandminds.ro/wp-content/uploads/2021/07/blogging-for-business-blog-articles-e1536066690505.jpg"
    };
    if (!localStorage.getItem("blogsData")) {
      localStorage.setItem("blogsData", "[]");
    }
    let blogs = JSON.parse(localStorage.getItem("blogsData"));
    blogs.push(blog);
    localStorage.setItem("blogsData", JSON.stringify(blogs));
    alert("blog successfully uploaded");
    location.reload();
  }
  e.preventDefault();
});


displayBlogs();

function displayBlogs() {
  const topBlogSection = document.querySelector("#topBlogSection");
  const allBlogs = JSON.parse(localStorage.getItem("blogsData")) || [];
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
          <img src="./Assests/Yoga.jpg" alt="userImage" width="50" height="50">
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

// get the loggedIn user name and email
const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"));
if (localStorage.getItem("loggedInUser")) {
  const user = registeredUsers.find((item) => item.email === localStorage.getItem("loggedInUser"));
  uploaderName.value = user.name;
  uploaderEmail.value = user.email;
}