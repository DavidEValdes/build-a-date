const API_URL = "http://worldtimeapi.org/api/timezone";

export const timezoneData = {
  title: "Timezone",
  description: "Shows times in users' local timezones for coordination.",
  buttonText: "View Local Time",
  fetchData: () => alert(`Fetching data from: ${API_URL}`),
  data: {
    "Local Time": "5:30 PM",
    Timezone: "America/New_York",
  },
};
