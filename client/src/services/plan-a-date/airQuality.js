const API_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

const sampleData = {
  AQI: "Good",
  "Main Pollutant": "None",
};

export const airQualityData = {
  title: "Air Quality",
  description: "Check air quality for planning outdoor activities.",
  buttonText: "Check Air Quality",
  fetchData: () => sampleData,
};
