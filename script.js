document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const searchButton = document.querySelector(".search-box button");
    const weatherBox = document.querySelector(".weather-box");
    const weatherDetails = document.querySelector(".weather-details");
    const error404 = document.querySelector(".not-found");

    searchButton.addEventListener("click", () => {
        const APIKey = "5e30f8581c253f7c8c36e798062e53be";
        const city = document.querySelector(".search-box input").value.trim();

        if (!city) return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === "404") {
                    container.style.height = "400px";
                    weatherBox.style.display = "none";
                    weatherDetails.style.display = "none";
                    error404.style.display = "block";
                    return;
                }

                error404.style.display = "none";

                const image = document.querySelector(".weather-box img");
                const temperature = document.querySelector(".weather-box .temperature");
                const description = document.querySelector(".weather-box .description");
                const humidity = document.querySelector(".weather-details .detail:nth-child(1) span");
                const wind = document.querySelector(".weather-details .detail:nth-child(2) span");
                const pressure = document.querySelector(".weather-details .detail:nth-child(3) span");
                const visibility = document.querySelector(".weather-details .detail:nth-child(4) span");

                switch (json.weather[0].main) {
                    case "Clear":
                        image.src = "images/clear.png";
                        break;
                    case "Rain":
                        image.src = "images/rain.png";
                        break;
                    case "Snow":
                        image.src = "images/snow.png";
                        break;
                    case "Clouds":
                        image.src = "images/cloud.png";
                        break;
                    case "Mist":
                        image.src = "images/mist.png";
                        break;
                    case "Smoke":
                        image.src = "images/smoke.png";
                        break;
                    case "Haze": s
                        image.src = "images/haze.png";
                        break;
                    default:
                        image.src = "";
                }

                temperature.innerHTML = `${json.main.temp.toFixed(1)}<span>°C</span>`;
                description.textContent = json.weather[0].description;
                humidity.textContent = `${json.main.humidity}%`;
                wind.textContent = `${json.wind.speed.toFixed(1)} km/h`;
                pressure.textContent = `${json.main.pressure} mb`;
                visibility.textContent = `${(json.visibility / 1000).toFixed(1)} km`;

                weatherBox.style.display = "block";
                weatherDetails.style.display = "flex";
                container.style.height = "auto";
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    });
});
