const API_URL = "https://api.themoviedb.org/3/discover/movie";

export const moviesData = {
  title: "Movie Suggestions",
  description: "Get movie recommendations for your date night.",
  buttonText: "Browse Movies",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    "Top Movie": "Inception",
    Genre: "Sci-Fi",
    Rating: "8.8/10",
    "Release Year": "2010",
  },
};
