const API_URL = "https://api.themoviedb.org/3/discover/movie";

export const eventsData = {
  title: "Movie Suggestions",
  description: "Get movie recommendations for your date night.",
  buttonText: "Browse Movies",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    "Upcoming Event": "Jazz Concert",
    Date: "Dec 12, 2024",
    Location: "Downtown Arena",
    Tickets: "Available",
  },
};
