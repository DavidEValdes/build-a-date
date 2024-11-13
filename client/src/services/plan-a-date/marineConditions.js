const API_URL = "https://api.stormglass.io/v2/weather/point";

export const marineConditionsData = {
  title: "Marine Conditions",
  description: "Check marine conditions for waterfront activities.",
  buttonText: "Check Marine Conditions",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    "Wave Height": "3 ft",
    "Wind Speed": "10 mph",
    Condition: "Calm",
  },
};
