// Weather Dashboard Application

class WeatherDashboard {
    constructor() {
        // OpenWeatherMap API key (free tier)
        this.apiKey = 'b6fd43532d86f51538d91da544290c37'; // This is a demo key, replace with your own
        this.baseUrl = 'https://api.openweathermap.org';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.hideWeatherSection();
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('searchBtn').addEventListener('click', () => this.handleSearch());
        document.getElementById('cityInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        // Location button
        document.getElementById('locationBtn').addEventListener('click', () => this.handleLocationClick());

        // Quick city buttons
        document.querySelectorAll('.quick-city-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const city = e.target.dataset.city;
                document.getElementById('cityInput').value = city;
                this.handleSearch();
            });
        });
    }

    handleSearch() {
        const cityName = document.getElementById('cityInput').value.trim();
        if (!cityName) {
            this.showError('Please enter a city name');
            return;
        }
        this.getWeatherByCity(cityName);
    }

    handleLocationClick() {
        if (navigator.geolocation) {
            this.showLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.getWeatherByCoordinates(latitude, longitude);
                },
                (error) => {
                    this.showLoading(false);
                    this.showError('Unable to access your location. Please enable location services.');
                }
            );
        } else {
            this.showError('Geolocation is not supported by your browser');
        }
    }

    async getWeatherByCity(cityName) {
        this.showLoading(true);
        this.clearError();
        try {
            // Get coordinates from city name
            const geoResponse = await fetch(
                `${this.baseUrl}/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${this.apiKey}`
            );
            const geoData = await geoResponse.json();

            if (!geoData.length) {
                throw new Error('City not found');
            }

            const { lat, lon } = geoData[0];
            await this.getWeatherByCoordinates(lat, lon);
        } catch (error) {
            this.showLoading(false);
            this.showError(`Error: ${error.message}`);
        }
    }

    async getWeatherByCoordinates(lat, lon) {
        try {
            // Fetch current weather and forecast
            const weatherResponse = await fetch(
                `${this.baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
            );
            const forecastResponse = await fetch(
                `${this.baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
            );

            if (!weatherResponse.ok || !forecastResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const weatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();

            this.displayWeather(weatherData, forecastData);
            this.showLoading(false);
        } catch (error) {
            this.showLoading(false);
            this.showError(`Error: ${error.message}`);
        }
    }

    displayWeather(weatherData, forecastData) {
        // Extract weather data
        const {
            main: { temp, feels_like, temp_max, temp_min, humidity, pressure },
            weather: [{ main, description, icon }],
            wind: { speed },
            visibility,
            clouds: { all: cloudiness },
            sys: { sunrise, sunset, country },
            name: cityName
        } = weatherData;

        // Update current weather display
        document.getElementById('cityName').textContent = cityName;
        document.getElementById('countryCode').textContent = country;
        document.getElementById('temperature').textContent = Math.round(temp) + '°';
        document.getElementById('weatherDescription').textContent = description;
        document.getElementById('feelsLike').textContent = `Feels like: ${Math.round(feels_like)}°C`;
        document.getElementById('windSpeed').textContent = speed.toFixed(1) + ' m/s';
        document.getElementById('humidity').textContent = humidity + '%';
        document.getElementById('pressure').textContent = pressure + ' hPa';
        document.getElementById('visibility').textContent = (visibility / 1000).toFixed(1) + ' km';
        document.getElementById('cloudiness').textContent = cloudiness + '%';
        document.getElementById('maxTemp').textContent = Math.round(temp_max) + '°C';
        document.getElementById('minTemp').textContent = Math.round(temp_min) + '°C';

        // Update sunrise/sunset
        document.getElementById('sunrise').textContent = new Date(sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('sunset').textContent = new Date(sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        // Update weather icon
        document.getElementById('weatherIcon').textContent = this.getWeatherEmoji(icon);

        // Display hourly forecast
        this.displayHourlyForecast(forecastData);

        // Display daily forecast
        this.displayDailyForecast(forecastData);

        // Update additional info
        this.displayAdditionalInfo(forecastData, weatherData);

        // Update last update time
        document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();

        // Show weather section
        this.showWeatherSection();
    }

    displayHourlyForecast(forecastData) {
        const hourlyForecast = document.getElementById('hourlyForecast');
        hourlyForecast.innerHTML = '';

        // Get next 8 hourly forecasts (every 3 hours)
        const hourly = forecastData.list.slice(0, 8);

        hourly.forEach(forecast => {
            const { dt, main: { temp }, weather: [{ icon }] } = forecast;
            const date = new Date(dt * 1000);
            const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            const hourlyItem = document.createElement('div');
            hourlyItem.className = 'hourly-item';
            hourlyItem.innerHTML = `
                <div class="hourly-time">${time}</div>
                <div class="hourly-icon">${this.getWeatherEmoji(icon)}</div>
                <div class="hourly-temp">${Math.round(temp)}°C</div>
            `;
            hourlyForecast.appendChild(hourlyItem);
        });
    }

    displayDailyForecast(forecastData) {
        const dailyForecast = document.getElementById('dailyForecast');
        dailyForecast.innerHTML = '';

        // Group forecast by day
        const dailyData = {};
        forecastData.list.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

            if (!dailyData[day]) {
                dailyData[day] = [];
            }
            dailyData[day].push(forecast);
        });

        // Display first 5 days
        Object.keys(dailyData).slice(0, 5).forEach(day => {
            const dayForecasts = dailyData[day];
            const temps = dayForecasts.map(f => f.main.temp);
            const maxTemp = Math.max(...temps);
            const minTemp = Math.min(...temps);
            const weatherDesc = dayForecasts[0].weather[0].description;
            const icon = dayForecasts[0].weather[0].icon;

            const dailyItem = document.createElement('div');
            dailyItem.className = 'daily-item';
            dailyItem.innerHTML = `
                <div class="daily-date">${day}</div>
                <div class="daily-icon">${this.getWeatherEmoji(icon)}</div>
                <div class="daily-description">${weatherDesc}</div>
                <div class="daily-temps">
                    <span class="daily-temp-high">${Math.round(maxTemp)}°</span>
                    <span class="daily-temp-low">${Math.round(minTemp)}°</span>
                </div>
            `;
            dailyForecast.appendChild(dailyItem);
        });
    }

    displayAdditionalInfo(forecastData, weatherData) {
        // Calculate average values from forecast
        const temps = forecastData.list.map(f => f.main.temp);
        const avgTemp = (temps.reduce((a, b) => a + b) / temps.length).toFixed(1);

        // Dew point approximation (simplified formula)
        const { main: { temp, humidity } } = weatherData;
        const dewPoint = (temp - ((100 - humidity) / 5)).toFixed(1);

        // Rain probability and volume
        const rainyForecasts = forecastData.list.filter(f => f.rain);
        const rainProbability = Math.round((rainyForecasts.length / forecastData.list.length) * 100);
        const rainVolume = rainyForecasts.reduce((sum, f) => sum + (f.rain['3h'] || 0), 0).toFixed(1);

        document.getElementById('dewPoint').textContent = dewPoint + '°C';
        document.getElementById('feelsLikeTemp').textContent = weatherData.main.feels_like.toFixed(1) + '°C';
        document.getElementById('rainProbability').textContent = rainProbability + '%';
        document.getElementById('rainVolume').textContent = rainVolume + ' mm';
        document.getElementById('uvIndex').textContent = '(N/A)'; // UV index requires separate API call
    }

    getWeatherEmoji(iconCode) {
        const iconMap = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '🌤️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return iconMap[iconCode] || '🌤️';
    }

    showError(message) {
        const errorElement = document.getElementById('errorMessage');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        setTimeout(() => {
            errorElement.classList.remove('show');
        }, 5000);
    }

    clearError() {
        const errorElement = document.getElementById('errorMessage');
        errorElement.classList.remove('show');
    }

    showLoading(show) {
        const spinner = document.getElementById('loadingSpinner');
        if (show) {
            spinner.classList.remove('hidden');
        } else {
            spinner.classList.add('hidden');
        }
    }

    showWeatherSection() {
        document.getElementById('weatherSection').classList.remove('hidden');
        document.getElementById('welcomeSection').style.display = 'none';
    }

    hideWeatherSection() {
        document.getElementById('weatherSection').classList.add('hidden');
        document.getElementById('welcomeSection').style.display = 'block';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WeatherDashboard();
});
