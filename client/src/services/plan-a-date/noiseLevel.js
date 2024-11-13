const API_URL = "https://api.soundsnap.com/v1/noise-levels";

export const noiseLevelData = {
  title: "Noise Level",
  description: "Find quiet spots for a peaceful date experience.",
  buttonText: "Check Noise Level",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    "Noise Level": "30 dB",
    Location: "Park Bench",
  },
};
