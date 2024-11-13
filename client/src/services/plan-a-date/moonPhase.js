const API_URL = "https://api.farmsense.net/v1/moonphases/";

export const moonPhaseData = {
  title: "Moon Phase",
  description: "Shows the current moon phase for stargazing dates.",
  buttonText: "View Moon Phase",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    "Current Phase": "Full Moon",
    Illumination: "100%",
  },
};
