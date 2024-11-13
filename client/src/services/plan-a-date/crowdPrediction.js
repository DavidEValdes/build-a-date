const API_URL = "https://api.predicthq.com/v1/events";

const sampleData = {
  "Crowd Level": "Low",
  "Best Time": "Morning",
};

export const crowdPredictionData = {
  title: "Crowd Prediction",
  description: "Find the best times to avoid crowds for your date.",
  buttonText: "Check Crowds",
  fetchData: () => sampleData,
};
