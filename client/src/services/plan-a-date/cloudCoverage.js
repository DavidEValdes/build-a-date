const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const cloudCoverageData = {
  title: "Cloud Coverage",
  description: "Check cloud coverage for outdoor date planning.",
  buttonText: "Check Cloud Coverage",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    "Cloud Coverage": "20%",
    Type: "Few Clouds",
  },
};
