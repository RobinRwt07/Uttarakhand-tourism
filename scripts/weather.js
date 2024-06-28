import { url, kelvintoCelsius } from "./apis.js";

const weatherContainer = document.querySelector("#weather-container");
let loc = document.querySelector("#location-name").textContent;

if (loc.length === 0) {
    loc = "Dehradun";
}

async function fetchData() {
    try {
        const res = await fetch(url.geo(loc));
        const data = await res.json();
        if (data) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            showMap(lat, lon);
            const response = await fetch(url.currentWeather(lat, lon));
            const weatherData = await response.json();

            if (weatherData) {
                const result = await fetch(url.forecast(lat, lon));
                const forecast = await result.json();
                if (forecast) {
                    const hourlyForecast = forecast.list.slice(0, 7);

                    const weatherBox = document.createElement("div");
                    weatherBox.classList.add("weather-map");
                    weatherBox.innerHTML = `
                  <div class="left">
                    <h3 id="location-name">${weatherData.name}</h3>
                    <h4 >${new Date().toDateString()}</h4>
                    <div>
                        <span >${Math.round(
                        kelvintoCelsius(weatherData.main.temp)
                    )} &deg;C</span>
                        <span>${weatherData.weather[0].description}</span>
                    </div>
                  </div>
                  <div class="right">
                    <div class="weather-info">
                        <div>
                            <p>Visibility:</p>
                            <p >${weatherData.visibility / 1000} Km</p>
                        </div>
                        <div>
                            <p>Humidity:</p>
                            <p >${weatherData.main.humidity}%</p>
                        </div>
                        <div>
                            <p>Wind:</p>
                            <p>${weatherData.wind.speed} m/s</p>
                        </div>
                    </div>
                  </div>`;

                    let card = ` <h3> Hourly Forecast </h3>
                                 <div class="forecast-box">
                                 `;
                    for (const items of hourlyForecast) {
                        card += `
                                <div class="forecast-card">
                                    <span> ${new Date(
                            items.dt * 1000
                        ).getHours()}:${new Date(
                            items.dt * 1000
                        ).getMinutes()} </span>
                                    <span>${Math.round(
                            kelvintoCelsius(items.main.temp)
                        )} &deg;C</span>
                                </div>`;
                    }
                    card += `</div>`;
                    weatherContainer.appendChild(weatherBox);
                    weatherContainer.innerHTML += card;

                    // weatherContainer.appendChild(card);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function showMap(lat, lon) {
    let map = L.map("map").setView([lat, lon], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var marker = L.marker([lat, lon]).addTo(map);

    var circle = L.circle([lat, lon], {
        color: "blue",
        fillColor: "#0000FF",
        fillOpacity: 0.4,
        radius: 500,
    }).addTo(map);
    // marker.bindPopup(`<b>${loc}</b>`).openPopup();
}

fetchData();
