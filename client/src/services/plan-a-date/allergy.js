const API_URL = "https://api.ambeedata.com/latest/pollen";

export const allergyData = {
  title: "Allergy",
  description: "Check local allergens to avoid allergy triggers.",
  buttonText: "Check Allergies",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    Allergens: "None",
    Advice: "Enjoy your date without worries!",
  },
};
