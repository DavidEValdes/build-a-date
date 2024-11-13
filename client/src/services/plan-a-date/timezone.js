const API_URL = "http://worldtimeapi.org/api/timezone";

const sampleData = {
  "Local Time": "5:30 PM",
  Timezone: "America/New_York",
};

export const timezoneData = {
  title: "Timezone",
  description: "Shows times in users' local timezones for coordination.",
  buttonText: "View Local Time",
  fetchData: () => sampleData,
};
