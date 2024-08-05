const blogHeader = document.querySelector("#blogHeader");
const blogContent = document.querySelector("#blogContent");
const relatedBlogs = document.querySelector("#relatedBlogs");

const queryParam = window.location.search;
const blogId = Number(queryParam.split("=")[1]);
if (isNaN(blogId)) {
  location.replace("./Error.html");
}

const allBlogs = JSON.parse(localStorage.getItem("blogsData")) || [];

const blog = allBlogs.find(item => item.blogId === blogId);

if (!blog) {
  location.replace("./Error.html");
}

displayBlogContent(blog);
showLikeDislike(blog);
showRelatedBlog(allBlogs);

function displayBlogContent(blog) {
  blogHeader.innerHTML = `
  <div class="user-info">
    <div class="userimg">
      <img src="./Assests/adventure.jpg" alt="user image">
    </div>
    <div>
      <h3>${blog.name}</h3>
      <p>Posted On <span>${blog.uploadDate}</span></p>
    </div>
  </div>
  <h1 class="heading">${blog.heading}</h1>
  <div class="blog-image">
    <img src="${blog.image}" alt="image">
  </div>`;
  blogContent.innerHTML = `<pre style="text-wrap:wrap">${blog.message}</pre>`;
}

function showLikeDislike(blog) {
  document.querySelector("#totalLikes").textContent = blog.likes;
  document.querySelector("#totalDislikes").textContent = blog.dislikes;
}

function showRelatedBlog(allBlogs) {
  const otherBlogs = allBlogs.slice(-4);
  relatedBlogs.innerHTML = '';
  for (const item of otherBlogs) {
    relatedBlogs.innerHTML += `
        <a href="./blog.html?blogId=${item.blogId}" class="blog-card">
          <div class="top">
            <img src="${item.image ? item.image : "./Assests/blog_default2.jpg"}" alt="blog-image">
          </div>
          <div class="bottom">
            <p><span>${item.name}</span> | <span>${item.uploadDate}</span>
            </p>
            <h3>${item.heading}</h3>
            <p>${item.message.slice(0, 100)}...</p>
          </div>
        </a>`;
  }
}

function handleLikeDislike(event, type) {
  const likeDislike = JSON.parse(localStorage.getItem("likeDislikeData")) || [];
  if (localStorage.getItem("isUserSignIn") === "true") {
    let currentUser = localStorage.getItem("loggedInUser");
    let user = likeDislike.find(item => item.userId == currentUser);
    if (user) {
      let blogIndex = user.ldData.findIndex(item => item[0] == blogId);
      // when user first time like or dislike  blog
      if (blogIndex === -1) {
        if (type === "like") {
          event.target.style.color = "green";
          controlLikeDislike(1, type);
          showLikeDislike(blog)
        }
        if (type === "dislike") {
          event.target.style.color = "red";
          controlLikeDislike(1, type);
          showLikeDislike(blog)
        }
        likeDislike.find(item => item.userId === currentUser).ldData.push([blogId, type]);
      } // if user already like of dislike blog
      else {
        const previousType = user.ldData[blogIndex][1];
        if (previousType == type) {
          event.target.style.color = null;
          controlLikeDislike(-1, type);
          showLikeDislike(blog)
          likeDislike.find(item => item.userId === currentUser).ldData.splice(blogIndex, 1);
        }
        if (previousType != type) {
          document.querySelector(`#${previousType}`).lastElementChild.style.color = null;
          event.target.style.color = type == "like" ? "green" : "red";
          controlLikeDislike(1, type);
          controlLikeDislike(-1, previousType);
          showLikeDislike(blog);
          likeDislike.find(item => item.userId === currentUser).ldData.splice(blogIndex, 1, [blogId, type]);
        }
      }
    } // if user is not present in likeDislike data
    else {
      let user = {
        userId: currentUser,
        ldData: [],
      }
      if (type === "like") {
        event.target.style.color = "green";
        controlLikeDislike(1, type);
        showLikeDislike(blog)
      }
      if (type === "dislike") {
        event.target.style.color = "red";
        controlLikeDislike(1, type);
        showLikeDislike(blog)
      }
      user.ldData.push([blogId, type]);

      likeDislike.push(user);
    }
    localStorage.setItem("likeDislikeData", JSON.stringify(likeDislike));
  }
  else {
    alert("Please login.");
  }
}

function controlLikeDislike(n, type) {
  if (type === "like") {
    blog.likes += n;
  }
  if (type === 'dislike') {
    blog.dislikes += n;
  }
  let index = allBlogs.findIndex(item => item.blogId === blogId);
  allBlogs.splice(index, 1, blog);
  localStorage.setItem("blogsData", JSON.stringify(allBlogs));
}

function initialColor() {
  let likeDislikeData = JSON.parse(localStorage.getItem("likeDislikeData")) || [];
  if (localStorage.getItem("isUserSignIn") === "true") {
    let user = likeDislikeData.find(item => item.userId === localStorage.getItem("loggedInUser"));
    if (user) {
      let blog = user.ldData.find(item => item[0] === blogId);
      if (blog) {
        document.querySelector(`#${blog[1]}`).lastElementChild.style.color = blog[1] == "like" ? "green" : "red";
      }
    }
  }
}

initialColor();