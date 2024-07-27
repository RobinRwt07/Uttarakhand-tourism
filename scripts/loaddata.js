import { fetchData, fetchDataPlaces, verifySignIn } from "./functions.js";
verifySignIn();

if (!localStorage.getItem("UttarakhandTourismData")) {
  fetchData();
}
if (!localStorage.getItem("UttarakhandTouristPlaces")) {
  fetchDataPlaces();
}

const searchField = document.querySelector("#searchField");
const searchedItemContainer = document.querySelector("#searchedItemContainer");

const allPlaces = JSON.parse(localStorage.getItem("UttarakhandTouristPlaces"));

searchField.addEventListener("input", () => {
  filterSearchPlaces(searchField.value);
});

function filterPlace(searchValue) {
  let filteredItem = [];
  searchValue = searchValue.toLowerCase();
  searchedItemContainer.innerHTML = "";

  if (searchValue.length === 0) {
    filteredItem = [];
    searchedItemContainer.innerHTML = '';
    return;
  }
  else {
    filteredItem = allPlaces.filter(item => item.placeName.toLowerCase().includes(searchValue));
  }
  if (filteredItem.length === 0) {
    searchedItemContainer.innerHTML = `<li><a>No Match Found</a></li>`;
    return
  }
  for (const item of filteredItem) {
    searchedItemContainer.innerHTML += `<li><a href="./location.html?place=${item.placeName}">${item.placeName}, ${item.districtName}</a></li>`
  }
}

function debounce(fun, delay = 500) {
  let timer;
  return (searchVal) => {
    clearTimeout(timer);
    timer = setTimeout(() => { fun.call({}, searchVal) }, delay);
  }
}
const filterSearchPlaces = debounce(filterPlace, 700);

// script for blog section
fetchBlogs();

async function fetchBlogs() {
  try {
    const response = await fetch('./json/blog.json');
    if (response.status !== 200) {
      throw new Error("Request Failed");
    }
    else {
      let blogs = await response.json();
      if (!localStorage.getItem("blogsData")) {
        localStorage.setItem("blogsData", JSON.stringify(blogs));
      }
      const localStorageBlog = JSON.parse(localStorage.getItem("blogsData"));
      const allBlogs = [...blogs, ...localStorageBlog];
      displayHomeBlogs(allBlogs);
    }
  }
  catch (e) {
    console.log("Failed To fetch blogs.");
  }
}

function displayHomeBlogs(allBlogs) {
  const latestBlog = document.querySelector("#latestBlog");
  const blogContainer = document.querySelector("#blogContainer");

  const firstFourBlogs = allBlogs.slice(-4);

  console.log(allBlogs);

  if (allBlogs.length == 0) {
    latestBlog.innerHTML = `<h3>No Blogs Available</h3>`;
  }
  else {
    latestBlog.innerHTML = `
    <img src="./Assests/velly of flower.jpg" alt="blog cover" loading="lazy" />
    <div class="overlay">
    <h3 title="${allBlogs.at(-1).heading}">${allBlogs.at(-1).heading}</h3>
    <a href="./blog.html?blogId=${allBlogs.at(-1).blogId}">Read More -></a>
    </div>`;
  }
  if (firstFourBlogs.length > 0) {
    blogContainer.innerHTML = '';
    for (const item of firstFourBlogs) {
      blogContainer.innerHTML += `
      <div class="blog-card">
          <div class="blog-image">
            <img src="./Assests/pexels-gokul-gurang-224181659-15896015.jpg" alt="blog imgae" loading="lazy" />
          </div>
          <div class="blog-data">
            <h3 title="${item.heading}">${item.heading}</h3>
            <p>${item.message.slice(0, 60)}... </p>
            <a href="./blog.html?blogId=${item.blogId}">Read More-></a>
          </div>
      </div>`;
    }
  }
}
