const fetchData = async () => {
  // TODO: get latitude and longitude of user dynamically
  const URL =
    "https://api.open-meteo.com/v1/forecast?latitude=40.7934&longitude=-77.86&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=1";

  const res = await fetch(URL);
  const data = await res.json();

  const measurements = data["current"];
  const units = data["current_units"];

  const temp = measurements["temperature_2m"] + units["temperature_2m"];
  const precipitation = measurements["precipitation"] + units["precipitation"];
  const humidity =
    measurements["relative_humidity_2m"] + units["relative_humidity_2m"];
  const wind = measurements["wind_speed_10m"] + units["wind_speed_10m"];

  return {
    temp,
    precipitation,
    humidity,
    wind,
  };
};

export const weatherData = {
  title: "Weather Forecast",
  description: "Plan a date with the latest weather information.",
  buttonText: "Check Weather",
  fetchData,
};
