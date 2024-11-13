import React, { useState, useEffect } from "react";
import axios from "axios";

const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "#ffffff",
    padding: "40px 20px",
    color: "#333333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: `'Helvetica Neue', Helvetica, Arial, sans-serif`,
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#1e90ff",
  },
  searchContainer: {
    width: "100%",
    maxWidth: "800px",
  },
  filterSection: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "30px",
    position: "relative",
  },
  filterToggle: {
    // position: "absolute",
    right: "20px",
    top: "20px",
    padding: "8px 16px",
    fontSize: "0.9rem",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer",
  },
  filtersContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  searchBar: {
    width: "100%",
    display: "flex",
    gap: "10px",
    // marginBottom: "20px",
  },
  searchInput: {
    flex: 1,
    padding: "12px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    outline: "none",
  },
  button: {
    padding: "12px 20px",
    fontSize: "1rem",
    backgroundColor: "#1e90ff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  formGroup: {
    flex: "1 1 200px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  clearButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer",
  },
  movieGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  movieCard: {
    width: "calc(33.333% - 20px)",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  movieImage: {
    width: "100%",
    height: "auto",
  },
  movieInfo: {
    padding: "10px",
  },
  movieTitle: {
    fontSize: "1.2rem",
    margin: "0 0 10px 0",
  },
  movieMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  rating: {
    color: "#f39c12",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
  },
  noResults: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#999",
  },
};

export default function MovieSuggestion() {
  const [searchParams, setSearchParams] = useState({
    title: "",
    genre: "",
    year: "",
    director: "",
    actors: "",
  });
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const AUTH_HEADER = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
  };

  const fetchPopularMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: TMDB_API_KEY },
      });
      setMovies(response.data.results || []);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/genre/movie/list?language=en`,
          AUTH_HEADER
        );

        console.log({ genreRes: response });
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
    fetchPopularMovies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    setLoading(true);

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
      setMovies(response.data.results || []);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchParams({
      title: "",
      genre: "",
      year: "",
    });
    fetchPopularMovies();
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Movie Explorer</h1>
      </header>

      <div style={styles.searchContainer}>
        <div style={styles.filterSection}>
          <div style={styles.searchBar}>
            <input
              type="text"
              name="title"
              value={searchParams.title}
              onChange={handleChange}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              style={styles.searchInput}
              placeholder="Search movies..."
            />
            <button onClick={handleSearch} style={styles.button}>
              Search
            </button>
          </div>

          <button
            style={styles.filterToggle}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {showFilters && (
            <div style={styles.filtersContainer}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Genre</label>
                <select
                  name="genre"
                  value={searchParams.genre}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Genre</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Year</label>
                <select
                  name="year"
                  value={searchParams.year}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Year</option>
                  {Array.from(new Array(50), (v, i) => (
                    <option key={i} value={2024 - i}>
                      {2024 - i}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  ...styles.formGroup,
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <button
                  type="button"
                  onClick={clearFilters}
                  style={styles.clearButton}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : (
          <div style={styles.movieGrid}>
            {movies.map((movie) => (
              <div key={movie.id} style={styles.movieCard}>
                <img
                  src={
                    movie.poster_path
                      ? `${IMG_BASE_URL}${movie.poster_path}`
                      : "/api/placeholder/300/450"
                  }
                  alt={movie.title}
                  style={styles.movieImage}
                />
                <div style={styles.movieInfo}>
                  <h3 style={styles.movieTitle}>{movie.title}</h3>
                  <div style={styles.movieMeta}>
                    <span>{movie.release_date?.split("-")[0]}</span>
                    <span style={styles.rating}>
                      ★ {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>
                    {movie.overview?.slice(0, 150)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && movies.length === 0 && (
          <div style={styles.noResults}>
            No movies found. Please adjust your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
