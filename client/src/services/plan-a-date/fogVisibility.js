const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fogVisibilityData = {
  title: "Fog & Visibility",
  description: "Check fog and visibility for clear views on your date.",
  buttonText: "Check Visibility",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    Visibility: "10 km",
    Fog: "No",
  },
};
