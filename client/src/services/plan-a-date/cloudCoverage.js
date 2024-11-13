const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const sampleData = {
  "Cloud Coverage": "20%",
  Type: "Few Clouds",
};

export const cloudCoverageData = {
  title: "Cloud Coverage",
  description: "Check cloud coverage for outdoor date planning.",
  buttonText: "Check Cloud Coverage",
  fetchData: () => sampleData,
};
