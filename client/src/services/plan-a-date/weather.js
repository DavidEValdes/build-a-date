const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const weatherData = {
  title: "Weather Forecast",
  description: "Plan a date with the latest weather information.",
  buttonText: "Check Weather",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    Temp: "72°F",
    Wind: "5 mph",
    Humidity: "60%",
    Forecast: "Sunny",
  },
};
