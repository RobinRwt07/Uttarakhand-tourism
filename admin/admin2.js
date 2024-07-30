const hotelsSection = document.querySelector("#hotelsSection");

const hotels = JSON.parse(localStorage.getItem("hotels") || "[]");

if (hotels.length === 0) {
  hotelsSection.innerHTML = `<h2 colspan="6" class="sub-heading tx-center"> No Places available</h2>`;
}
else {
  for (const item of hotels) {
    hotelsSection.innerHTML += `
        <tr>
          <td>${item.hotelId}</td>
          <td>${item.hotelName}</td>
          <td>${item.hotelLocation}</td>
          <td>${item.hotelAddress}</td>
          <td>${item.charges}</td>
          <td>${item.hotelOwner}</td>
          <td>${item.contact}</td>
          <td style="text-align:center">
            <button type="button" class="delete-btn" onclick='deleteHotel(event)' data-hotelId="${item.hotelId}"><i class="fa-solid fa-trash-can"></i></button>
          </td>
          <td style="text-align:center">
            <button type="button" class="update-btn" onclick='updateHotel(event)' data-hotelId="${item.hotelId}"><i class="fa-solid fa-pen-to-square"></i></button>
          </td>
        </tr>`;
  }
}

function addHotel() {
  document.querySelector("#allHotels").style.display = "none";
  document.querySelector("#addHotelForm").style.display = "block";
}

// add hotels
document.querySelector("#add-hotels").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(document.querySelector("#add-hotels"));
  const id = formData.get("hotelId");
  if (id) {
    let index = hotels.findIndex(item => item.hotelId == id);
    hotels.splice(index, 1);
  }
  const newHotel = {
    hotelId: id ? id : ("HTL" + (Math.floor(Math.random() * 900000) + 10000)),
    hotelName: formData.get("hotelName"),
    hotelLocation: formData.get("districtName"),
    hotelAddress: formData.get("hotelAddress"),
    charges: formData.get("charges"),
    hotelOwner: formData.get("hotelOwner"),
    contact: formData.get("contact")
  }
  hotels.push(newHotel);
  localStorage.setItem("hotels", JSON.stringify(hotels));
  alert("Successfully Added");
  location.reload();
});


function deleteHotel(event) {
  if (confirm("Are You Sure")) {
    const hotelID = event.currentTarget.attributes["data-hotelId"].value;
    let index = hotels.findIndex(item => item.hotelId == hotelID);
    hotels.splice(index, 1);
    localStorage.setItem("hotels", JSON.stringify(hotels));
    location.reload();
  }
}

function updateHotel(event) {
  addHotel();
  const hotelID = event.currentTarget.attributes["data-hotelId"].value;
  const hotel = hotels.find(item => item.hotelId == hotelID);
  document.querySelector("#hotelId").value = hotelID;
  document.querySelector("#hotelName").value = hotel.hotelName;
  document.querySelector("#districtName").value = hotel.hotelLocation;
  document.querySelector("#hotelAddress").value = hotel.hotelAddress;
  document.querySelector("#charges").value = hotel.charges;
  document.querySelector("#hotelOwner").value = hotel.hotelOwner;
  document.querySelector("#contact").value = hotel.contact;
}


// event section
const eventsSection = document.querySelector("#eventsSection");
const events = JSON.parse(localStorage.getItem("events") || "[]");
if (events.length === 0) {
  eventsSection.innerHTML = `<h2 class="sub-heading tx-center"> No Events  available</h2>`;
}
else {
  for (const item of events) {
    const startDate = new Date(item.startDate).toDateString();
    const endDate = new Date(item.endDate).toDateString();

    eventsSection.innerHTML += `
      <div class="event-card">
        <div class="top">
          <img src="${item.image}" alt="event image">
        </div>
        <div class="bottom">
          <h3>${item.eventName}</h3>
          <p>${item.eventDetails.slice(0, 300)}...</p>
          <p>Event Date : <em>${startDate} - ${endDate} </em></p>
          <div>
            <button type="button" class="delete-btn" onclick="deleteEvent(event)" data-eventId=${item.eventId} ><i class="fa-solid fa-trash-can"></i></button>
            <button title="update" class="update-btn" type="button" onclick="updateEvent(event)" data-eventId=${item.eventId} ><i class="fa-solid fa-pen-to-square"></i></button>
          </div>
        </div>
      </div>`;
  }
}

function addEvent() {
  document.querySelector("#allEvents").style.display = "none";
  document.querySelector("#addEventForm").style.display = "block";
}

// add events
document.querySelector("#add-Event").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(document.querySelector("#add-Event"));
  const id = formData.get("eventId");
  if (id) {
    let index = events.findIndex(item => item.eventId == id);
    events.splice(index, 1);
  }
  const newEvent = {
    eventId: id ? id : ("EVNT" + (Math.floor(Math.random() * 900000) + 10000)),
    eventName: formData.get("eventName"),
    eventDetails: formData.get("eventDetails"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    image: formData.get("image"),
  }
  events.push(newEvent);
  localStorage.setItem("events", JSON.stringify(events));
  alert("Successfully Added");
  location.reload();
});

function updateEvent(event) {
  addEvent();
  const eventID = event.currentTarget.attributes["data-eventId"].value;
  const eventItem = events.find(item => item.eventId == eventID);
  document.querySelector("#eventId").value = eventID;
  document.querySelector("#eventName").value = eventItem.eventName;
  document.querySelector("#eventDetails").value = eventItem.eventDetails;
  document.querySelector("#startDate").value = eventItem.startDate;
  document.querySelector("#endDate").value = eventItem.endDate;
  document.querySelector("#image").value = eventItem.image;
}


function deleteEvent(event) {
  if (confirm("Are You Sure")) {
    const eventID = event.currentTarget.attributes["data-eventId"].value;
    let index = events.findIndex(item => item.hotelId == eventID);
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    location.reload();
  }
}