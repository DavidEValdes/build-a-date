const API_URL = "https://developers.zomato.com/api/v2.1/search";

export const restaurantsData = {
  title: "Nearby Restaurants",
  description: "Discover nearby dining options for your date.",
  buttonText: "Find Restaurants",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    "Top Restaurant": "La Bella",
    Cuisine: "Italian",
    Rating: "4.5/5",
    Distance: "0.5 miles",
  },
};
