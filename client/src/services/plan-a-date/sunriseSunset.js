const API_URL = "https://api.sunrise-sunset.org/json";

const sampleData = {
  Sunrise: "6:30 AM",
  Sunset: "7:45 PM",
};

export const sunriseSunsetData = {
  title: "Sunset/Sunrise Times",
  description: "Shows the sunrise and sunset times for romantic dates.",
  buttonText: "View Times",
  fetchData: () => sampleData,
};
