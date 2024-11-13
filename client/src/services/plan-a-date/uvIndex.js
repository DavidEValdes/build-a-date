const API_URL = "https://api.openweathermap.org/data/2.5/uvi";

const sampleData = {
  "UV Index": "Moderate",
  Advice: "Wear sunscreen if outdoors for extended periods.",
};

export const uvIndexData = {
  title: "UV Index",
  description: "Check UV levels to plan safe outdoor activities.",
  buttonText: "Check UV Index",
  fetchData: () => sampleData,
};
