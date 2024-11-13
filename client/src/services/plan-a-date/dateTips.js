const API_URL = "https://api.adviceslip.com/advice";

export const dateTipsData = {
  title: "Date Tips",
  description: "Get tips to make your date even better.",
  buttonText: "View Tips",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    Tip: "Be yourself and show genuine interest.",
  },
};
