const blogForm = document.getElementById("blog-form");
const msgError = document.getElementById("msgError");
const headingError = document.getElementById("headingError");


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
    msgError.textContent = "Message should contain at least 150 words";
  }

  if (blogData.get("blogheading").length === 0) {
    valid = false;
    headingError.textContent = "Please provide heading of blog"
  }

  if (valid) {
    const blog = {
      heading: blogData.get("blogheading"),
      message: blogData.get("message"),
      userEmail: blogData.get("useremail"),
      uploadDate: new Date().toDateString(),
      name: blogData.get("username")
    }
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
})

const allBlogs = JSON.parse(localStorage.getItem("blogsData"));
const topBlogSection = document.querySelector("#topBlogSection");
