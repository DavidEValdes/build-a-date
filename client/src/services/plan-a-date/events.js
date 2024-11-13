const API_URL = "https://api.themoviedb.org/3/discover/movie";

const sampleData = {
  "Upcoming Event": "Jazz Concert",
  Date: "Dec 12, 2024",
  Location: "Downtown Arena",
  Tickets: "Available",
};

export const eventsData = {
  title: "Movie Suggestions",
  description: "Get movie recommendations for your date night.",
  buttonText: "Browse Movies",
  fetchData: () => sampleData,
};
