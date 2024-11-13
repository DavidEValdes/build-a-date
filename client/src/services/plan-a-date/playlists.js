const API_URL = "https://api.spotify.com/v1/browse/featured-playlists";

const sampleData = {
  Playlist: "Romantic Evenings",
  Songs: "25",
  Genre: "Love Songs",
  Duration: "1 hour 45 mins",
};

export const playlistsData = {
  title: "Music Playlists",
  description: "Find music playlists to set the mood for your date.",
  buttonText: "Browse Playlists",
  fetchData: () => sampleData,
};
