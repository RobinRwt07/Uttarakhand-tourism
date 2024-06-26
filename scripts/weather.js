import { url, kelvintoCelsius, days } from './apis.js';

const loc = document.querySelector("#location-name").textContent;
const weatherContainer = document.querySelector("#weather-container");

async function fetchData() {
    try {
        const res = await fetch(url.geo(loc))
        const data = await res.json();
        if (data) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            const response = await fetch(url.currentWeather(lat, lon));
            const weatherData = await response.json();

            if (weatherData) {
                const result = await fetch(url.forecast(lat, lon));
                const forecast = await result.json();
                if (forecast) {
                    const hourlyForecast = forecast.list.slice(0, 7);
                    console.log(hourlyForecast);

                    const weatherBox = document.createElement("div");
                    weatherBox.classList.add("weather-map");
                    weatherBox.innerHTML = `
                  <div class="left">
                    <h3 id="location-name">${weatherData.name}</h3>
                    <h4 >${new Date().toDateString()}</h4>
                    <div>
                        <span >${Math.round(kelvintoCelsius(weatherData.main.temp))} &deg;C</span>
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
                                    <span> ${new Date(items.dt * 1000).getHours()}:${new Date(items.dt * 1000).getMinutes()} </span>
                                    <span>${Math.round(kelvintoCelsius(items.main.temp))} &deg;C</span>
                                </div>`;
                    }
                    card += `</div>`;
                    weatherContainer.appendChild(weatherBox);
                    weatherContainer.innerHTML += card;

                    // weatherContainer.appendChild(card);
                }
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}



fetchData();