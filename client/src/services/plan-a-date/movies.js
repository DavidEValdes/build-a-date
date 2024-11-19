import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const AUTH_HEADER = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  },
};

export const fetchMovies = async (searchParams) => {
  try {
    let url = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`;

    if (searchParams.title) {
      url = `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        searchParams.title
      )}`;
    }

    if (searchParams.year) {
      url += `&primary_release_year=${searchParams.year}`;
    }

    if (searchParams.genre) {
      url += `&with_genres=${searchParams.genre}`;
    }

    const response = await axios.get(url);
    return response.data.results.slice(0, 4); // Cap to 4 movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const moviesData = {
  title: "Movie Suggestions",
  description: "Get movie recommendations for your date night.",
  buttonText: "Browse Movies",
  fetchData: async (searchParams) => await fetchMovies(searchParams),
};
