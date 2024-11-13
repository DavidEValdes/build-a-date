const API_URL = "https://developers.zomato.com/api/v2.1/search";

const sampleData = {
  "Top Restaurant": "La Bella",
  Cuisine: "Italian",
  Rating: "4.5/5",
  Distance: "0.5 miles",
};

export const restaurantsData = {
  title: "Nearby Restaurants",
  description: "Discover nearby dining options for your date.",
  buttonText: "Find Restaurants",
  fetchData: () => sampleData,
};
