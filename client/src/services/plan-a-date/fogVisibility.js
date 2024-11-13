const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const sampleData = {
  Visibility: "10 km",
  Fog: "No",
};

export const fogVisibilityData = {
  title: "Fog & Visibility",
  description: "Check fog and visibility for clear views on your date.",
  buttonText: "Check Visibility",
  fetchData: async () => sampleData,
};
