const API_URL = "https://api.lightpollutionmap.info/v1/overlays";

export const lightPollutionData = {
  title: "Light Pollution",
  description: "Find dark skies for stargazing on your date.",
  buttonText: "Check Light Pollution",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    "Light Pollution": "Low",
    "Best Spots": "Hilltop Park",
  },
};
