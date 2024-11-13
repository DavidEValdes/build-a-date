const API_URL = "https://api.quotable.io/random";

export const aiQuoteData = {
  title: "AI Quote",
  description: "Get random conversation starters for your date.",
  buttonText: "Get Quote",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    Quote: "Life is what happens when you're busy making other plans.",
    Author: "John Lennon",
  },
};
