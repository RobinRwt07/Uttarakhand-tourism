const blogHeader = document.querySelector("#blogHeader");
const blogContent = document.querySelector("#blogContent");
const relatedBlogs = document.querySelector("#relatedBlogs");

const queryParam = window.location.search;
const blogId = Number(queryParam.split("=")[1]);
if (isNaN(blogId)) {
  location.replace("./Error.html");
}
const allBlogs = JSON.parse(localStorage.getItem("blogsData"));
const blog = allBlogs.find(item => item.blogId === blogId);
if (!blog) {
  location.replace("./Error.html");
}

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
        <img src="./Assests/nainital.jpg" alt="image">
      </div>`;

blogContent.innerHTML = `<pre style="text-wrap:wrap">${blog.message}</pre>`;
const otherBlogs = allBlogs.slice(-4);
relatedBlogs.innerHTML = '';

for (const item of otherBlogs) {
  relatedBlogs.innerHTML += `
      <a href="./blog.html?blogId=${item.blogId}" class="blog-card">
        <div class="top">
          <img src="./Assests/velly of flower.jpg" alt="blog-image">
        </div>
        <div class="bottom">
          <p><span>${item.name}</span> | <span>${item.uploadDate}</span>
          </p>
          <h3>${item.heading}</h3>
          <p>${item.message.slice(0, 100)}...</p>
        </div>
      </a>`;
}
