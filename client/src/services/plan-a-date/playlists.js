const API_URL = "https://api.spotify.com/v1/browse/featured-playlists";

export const playlistsData = {
  title: "Music Playlists",
  description: "Find music playlists to set the mood for your date.",
  buttonText: "Browse Playlists",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    Playlist: "Romantic Evenings",
    Songs: "25",
    Genre: "Love Songs",
    Duration: "1 hour 45 mins",
  },
};
