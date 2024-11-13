const API_URL = "https://api.ambeedata.com/latest/pollen";

const sampleData = {
  Allergens: "None",
  Advice: "Enjoy your date without worries!",
};

export const allergyData = {
  title: "Allergy",
  description: "Check local allergens to avoid allergy triggers.",
  buttonText: "Check Allergies",
  fetchData: () => sampleData,
};
