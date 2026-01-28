/**
 * Weather Service
 * 
 * Fetches real weather data from Open-Meteo API.
 */

export const CITIES = [
    { name: "Boston, MA", lat: 42.3601, lon: -71.0589 },
    { name: "NYC, NY", lat: 40.7128, lon: -74.0060 },
    { name: "Chicago, IL", lat: 41.8781, lon: -87.6298 },
    { name: "Detroit, MI", lat: 42.3314, lon: -83.0458 },
    { name: "Miami, FL", lat: 25.7617, lon: -80.1918 },
    { name: "San Fran, CA", lat: 37.7749, lon: -122.4194 },
    { name: "Anchorage, AK", lat: 61.2181, lon: -149.9003 },
];

// Map WMO codes to readable conditions
function getConditionFromCode(code) {
    const codes = {
        0: "Clear Sky",
        1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
        45: "Fog", 48: "Depositing Rime Fog",
        51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
        56: "Light Freezing Drizzle", 57: "Freezing Drizzle",
        61: "Slight Rain", 63: "Moderate Rain", 65: "Heavy Rain",
        66: "Light Freezing Rain", 67: "Freezing Rain",
        71: "Slight Snow Fall", 73: "Moderate Snow Fall", 75: "Heavy Snow Fall",
        77: "Snow Grains",
        80: "Slight Rain Showers", 81: "Moderate Rain Showers", 82: "Violent Rain Showers",
        85: "Slight Snow Showers", 86: "Heavy Snow Showers",
        95: "Thunderstorm", 96: "Thunderstorm + Hail", 99: "Thunderstorm + Heavy Hail"
    };
    return codes[code] || "High Hype Potential"; // Fallback
}

export async function fetchCoordinatesByZip(zip) {
    try {
        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        if (!response.ok) throw new Error("Zip code not found");
        const data = await response.json();

        return {
            name: `${data.places[0]["place name"]}, ${data.places[0]["state abbreviation"]}`,
            lat: parseFloat(data.places[0].latitude),
            lon: parseFloat(data.places[0].longitude)
        };
    } catch (error) {
        console.error("Failed to fetch zip coordinates:", error);
        return null;
    }
}

export async function fetchWeatherData(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,precipitation_probability&temperature_unit=fahrenheit&wind_speed_unit=mph`;

        const response = await fetch(url);
        const data = await response.json();
        const current = data.current;

        return {
            temp: Math.round(current.temperature_2m),
            condition: getConditionFromCode(current.weather_code),
            windSpeed: Math.round(current.wind_speed_10m),
            precipProb: current.precipitation_probability || 0,
            timestamp: new Date().toISOString(),
            rawCode: current.weather_code
        };
    } catch (error) {
        console.error("Failed to fetch weather:", error);
        // Fallback
        return {
            temp: 32,
            condition: "Data Glitch",
            windSpeed: 0,
            precipProb: 0,
            timestamp: new Date().toISOString()
        };
    }
}
