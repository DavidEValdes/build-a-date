const API_URL = "https://api.openweathermap.org/data/2.5/uvi";

export const uvIndexData = {
  title: "UV Index",
  description: "Check UV levels to plan safe outdoor activities.",
  buttonText: "Check UV Index",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    "UV Index": "Moderate",
    Advice: "Wear sunscreen if outdoors for extended periods.",
  },
};
