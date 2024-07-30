const totalHotels = document.getElementById("totalHotels");
const totalVisitor = document.getElementById("totalVisitor");
const totalPlaces = document.getElementById("totalPlaces");
const totalBlogs = document.getElementById("totalBlogs");
const totalEvent = document.getElementById("totalEvents");

const allplaces = JSON.parse(localStorage.getItem("UttarakhandTouristPlaces") || "[]");
const allblogs = JSON.parse(localStorage.getItem("blogsData") || "[]");
const allevents = JSON.parse(localStorage.getItem("events") || "[]");
const allhotels = JSON.parse(localStorage.getItem("hotels") || "[]");

totalHotels.textContent = allhotels.length;
totalEvent.textContent = allevents.length;
totalPlaces.textContent = allplaces.length;
totalBlogs.textContent = allblogs.length;