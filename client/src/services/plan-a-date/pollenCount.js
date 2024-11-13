const API_URL = "https://api.ambeedata.com/latest/pollen";

const sampleData = {
  "Pollen Count": "Low",
  Allergens: "None",
};

export const pollenCountData = {
  title: "Pollen Count",
  description: "Check pollen levels to plan an allergy-free date.",
  buttonText: "Check Pollen Count",
  fetchData: () => sampleData,
};
