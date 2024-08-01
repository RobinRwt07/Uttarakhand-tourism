const isAdminSignIn = localStorage.getItem("isAdminSignIn");
if (isAdminSignIn == null || isAdminSignIn === "false") {
  location.replace("../Error.html");
}

const queryParam = location.search.length === 0 ? "home" : location.search.slice(1);

const arr = ['home', 'places', 'hotels', 'blogs', 'events', 'query'];

if (!arr.includes(queryParam)) {
  location.replace("../Error.html");
}
const dashboradSection = document.querySelectorAll('[data-type]');
for (const item of dashboradSection) {
  if (item.attributes["data-type"].value === queryParam) {
    item.style.display = "block";
    document.querySelector(`[data-link="${item.attributes["data-type"].value}"]`).classList.add("active");
  }
}

const placeSection = document.querySelector("#placeSection");
const places = JSON.parse(localStorage.getItem("UttarakhandTouristPlaces"));
if (places.length === 0) {
  placeSection.parentElement.parentElement.innerHTML = `<h4 class="tx-center mt-1"> No Places available</h4>`;
}
else {
  for (const item of places) {
    placeSection.innerHTML += `
        <tr>
          <td>${item.placeName}</td>
          <td>${item.districtName}</td>
          <td>${item.category}</td>
          <td>${item.popular}</td>
          <td style="text-align:center">
            <button type="button" class="delete-btn" onclick='deletePlace(event)' data-name="${item.placeName}"><i class="fa-solid fa-trash-can"></i> </button>
          </td>
        </tr>`
  }
}

function addPlaces() {
  document.querySelector("#allPlacesInfo").style.display = "none";
  document.querySelector("#addPlaceForm").style.display = "block";
}

// add new place
document.querySelector("#add-places").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(document.querySelector("#add-places"));
  const newPlace = {
    placeName: formData.get("placeName"),
    bestTimeToVisit: formData.get("bestTimeToVisit"),
    category: formData.get("category"),
    districtName: formData.get("districtName"),
    image: formData.get("image") || "front-image.jpg",
    description: formData.get("description"),
    popular: formData.get("popular"),
    howToReach: {
      byAir: formData.get("byAir"),
      byTrain: formData.get("byTrain"),
      byRoad: formData.get("byRoad"),
    }
  }
  const allPlaces = JSON.parse(localStorage.getItem("UttarakhandTouristPlaces") || "[]");
  allPlaces.push(newPlace);
  localStorage.setItem("UttarakhandTouristPlaces", JSON.stringify(allPlaces));
  alert("Successfully Added");
  location.reload();
});

// delete places
function deletePlace(event) {
  if (confirm("Are You Sure")) {
    const deleteItem = event.currentTarget.attributes["data-name"].value;
    const allPlaces = JSON.parse(localStorage.getItem("UttarakhandTouristPlaces"));
    let index = allPlaces.findIndex(item => item.placeName === deleteItem);
    allPlaces.splice(index, 1);
    localStorage.setItem("UttarakhandTouristPlaces", JSON.stringify(allPlaces));
    location.reload();
  }
}



const blogsSection = document.querySelector("#blogsSection");

const blogs = JSON.parse(localStorage.getItem("blogsData"));
if (blogs.length === 0) {
  blogsSection.parentElement.parentElement.innerHTML = `<h4 class="tx-center mt-1"> No blogs available</h4>`;
}
else {
  for (const item of blogs) {
    blogsSection.innerHTML += `
        <tr>
          <td>${item.blogId}</td>
          <td>${item.heading}</td>
          <td>${item.name}</td>
          <td>${item.uploadDate}</td>
          <td style="text-align:center">
            <button type="button" class="delete-btn" onclick='deleteBlog(event)' data-blogId="${item.blogId}"><i class="fa-solid fa-trash-can"></i></button>
          </td>
          <td style="text-align:center">
            <button type="button" class="update-btn" onclick='previewBlog(event)' data-blogId="${item.blogId}">Preview </button>
          </td>
        </tr>`;
  }
}

// script for blog section

const blogPreview = document.querySelector("#blogPreview");

function previewBlog(event) {
  const blogId = event.target.attributes['data-blogId'].value;
  const blog = blogs.find(item => item.blogId == blogId);
  blogPreview.innerHTML = `
    <div onclick='closeModal()'>
      <i class="fa-solid fa-xmark fa-2xl"></i>
    </div>
    <h2 class="sub-heading">${blog.heading}</h2>
    <div>
      <pre style="text-wrap:wrap">${blog.message}</pre>
    </div>`;
  blogPreview.showModal();
}

function closeModal() {
  blogPreview.close();
}

function deleteBlog(event) {
  if (confirm("Are you sure?")) {
    const blogId = event.currentTarget.attributes['data-blogId'].value;
    const index = blogs.findIndex(item => item.blogId == blogId);
    blogs.splice(index, 1);
    localStorage.setItem("blogsData", JSON.stringify(blogs));
    location.reload();
  }
}


// query section

const querySection = document.querySelector("#querySection");
const queries = JSON.parse(localStorage.getItem("usersQuery") || "[]");
if (queries.length === 0) {
  querySection.parentElement.parentElement.innerHTML = `<h4 class="tx-center mt-1"> No Queries</h4>`;
}
else {
  for (const item of queries) {
    querySection.innerHTML += `
        <tr>
          <td>${item.queryId}</td>
          <td>${item.username}</td>
          <td>${item.useremail}</td>
          <td>${item.message}</td>
          <td style="text-align:center">
            <button type="button" class="delete-btn" onclick='deleteQuery(event)' data-queryId="${item.queryId}"><i class="fa-solid fa-trash-can"></i></button>
          </td>
          <td style="text-align:center">
            <button type="button" class="update-btn" onclick='previewBlog(event)' data-blogId="${item.blogId}">Preview </button>
          </td>
        </tr>`;
  }
}

const queryPreview = document.querySelector("#queryPreview");

function previewBlog(event) {
  const blogId = event.target.attributes['data-blogId'].value;
  const blog = blogs.find(item => item.blogId == blogId);
  blogPreview.innerHTML = `
    <div onclick='closeModal()'>
      <i class="fa-solid fa-xmark fa-2xl"></i>
    </div>
    <h2 class="sub-heading">${blog.heading}</h2>
    <div>
      <pre style="text-wrap:wrap">${blog.message}</pre>
    </div>`;
  blogPreview.showModal();
}

function closeModal() {
  blogPreview.close();
}

function deleteQuery(event) {
  if (confirm("Are you sure?")) {
    const queryId = event.currentTarget.attributes['data-queryId'].value;
    const index = queries.findIndex(item => item.queryId == queryId);
    queries.splice(index, 1);
    localStorage.setItem("usersQuery", JSON.stringify(queries));
    location.reload();
  }
}

