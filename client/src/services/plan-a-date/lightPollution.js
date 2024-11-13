const API_URL = "https://api.lightpollutionmap.info/v1/overlays";

const sampleData = {
  "Light Pollution": "Low",
  "Best Spots": "Hilltop Park",
};

export const lightPollutionData = {
  title: "Light Pollution",
  description: "Find dark skies for stargazing on your date.",
  buttonText: "Check Light Pollution",
  fetchData: () => sampleData,
};
