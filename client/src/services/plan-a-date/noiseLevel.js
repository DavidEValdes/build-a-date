const API_URL = "https://api.soundsnap.com/v1/noise-levels";

const sampleData = {
  "Noise Level": "30 dB",
  Location: "Park Bench",
};

export const noiseLevelData = {
  title: "Noise Level",
  description: "Find quiet spots for a peaceful date experience.",
  buttonText: "Check Noise Level",
  fetchData: async () => sampleData,
};
