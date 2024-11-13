const API_URL = "https://api.sunrise-sunset.org/json";

export const sunriseSunsetData = {
  title: "Sunset/Sunrise Times",
  description: "Shows the sunrise and sunset times for romantic dates.",
  buttonText: "View Times",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    Sunrise: "6:30 AM",
    Sunset: "7:45 PM",
  },
};
