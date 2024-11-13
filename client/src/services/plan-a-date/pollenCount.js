const API_URL = "https://api.ambeedata.com/latest/pollen";

export const pollenCountData = {
  title: "Pollen Count",
  description: "Check pollen levels to plan an allergy-free date.",
  buttonText: "Check Pollen Count",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    "Pollen Count": "Low",
    Allergens: "None",
  },
};
