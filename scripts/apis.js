
const api_key = "46856b024a23a0bcfcf98c5194d9945e";

export const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key} `;
    },
    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`
    },
    geo(query) {
        return `http://api.openweathermap.org/geo/1.0/direct?q=${query},uttarakhand,india&limit=1&appid=${api_key}`;
    },
}


export function kelvintoCelsius(kel) {
    return (kel - 273.15)
}
