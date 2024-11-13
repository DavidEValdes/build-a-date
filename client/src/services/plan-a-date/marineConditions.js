const API_URL = "https://api.stormglass.io/v2/weather/point";

const sampleData = {
  "Wave Height": "3 ft",
  "Wind Speed": "10 mph",
  Condition: "Calm",
};

export const marineConditionsData = {
  title: "Marine Conditions",
  description: "Check marine conditions for waterfront activities.",
  buttonText: "Check Marine Conditions",
  fetchData: async () => sampleData,
};
