const fetchData = async () => {
  const getLocation = async () => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          },
        );
      });
    } else {
      throw new Error("Geolocation is not supported by this browser.");
    }
  };

  const { latitude, longitude } = await getLocation();

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=1`;

  const res = await fetch(url);
  const data = await res.json();

  const measurements = data["current"];
  const units = data["current_units"];

  const temp = measurements["temperature_2m"] + units["temperature_2m"];
  const precipitation = measurements["precipitation"] + units["precipitation"];
  const humidity =
    measurements["relative_humidity_2m"] + units["relative_humidity_2m"];
  const wind = measurements["wind_speed_10m"] + units["wind_speed_10m"];

  return {
    Temperature: temp,
    Precipitation: precipitation,
    Humidity: humidity,
    Wind: wind,
  };
};

export const weatherData = {
  title: "Weather Forecast",
  description: "Plan a date with the latest weather information.",
  buttonText: "Check Weather",
  fetchData,
};
