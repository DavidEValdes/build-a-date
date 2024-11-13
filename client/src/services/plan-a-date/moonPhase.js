const API_URL = "https://api.farmsense.net/v1/moonphases/";

const sampleData = {
  "Current Phase": "Full Moon",
  Illumination: "100%",
};

export const moonPhaseData = {
  title: "Moon Phase",
  description: "Shows the current moon phase for stargazing dates.",
  buttonText: "View Moon Phase",
  fetchData: () => sampleData,
};
