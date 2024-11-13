const API_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

export const airQualityData = {
  title: "Air Quality",
  description: "Check air quality for planning outdoor activities.",
  buttonText: "Check Air Quality",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    AQI: "Good",
    "Main Pollutant": "None",
  },
};
