const API_URL = "https://api.predicthq.com/v1/events";

export const crowdPredictionData = {
  title: "Crowd Prediction",
  description: "Find the best times to avoid crowds for your date.",
  buttonText: "Check Crowds",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    "Crowd Level": "Low",
    "Best Time": "Morning",
  },
};
