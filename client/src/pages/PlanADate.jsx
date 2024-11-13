import React from 'react';
import Footer from '../components/Footer';
import PlanADateCard from '../components/PlanADateCard';

const PlanADate = () => {
  // Function to handle button clicks
  const handleButtonClick = (apiUrl) => {
    // Replace with actual API call logic
    alert(`Fetching data from: ${apiUrl}`);
  };

  // Sample data for demonstration purposes
  const sampleData = {
    weather: {
      Temp: '72°F',
      Wind: '5 mph',
      Humidity: '60%',
      Forecast: 'Sunny',
    },
    restaurants: {
      'Top Restaurant': 'La Bella',
      Cuisine: 'Italian',
      Rating: '4.5/5',
      Distance: '0.5 miles',
    },
    movies: {
      'Top Movie': 'Inception',
      Genre: 'Sci-Fi',
      Rating: '8.8/10',
      'Release Year': '2010',
    },
    events: {
      'Upcoming Event': 'Jazz Concert',
      Date: 'Dec 12, 2024',
      Location: 'Downtown Arena',
      Tickets: 'Available',
    },
    dateTips: {
      Tip: "Be yourself and show genuine interest.",
    },
    playlists: {
      Playlist: 'Romantic Evenings',
      Songs: '25',
      Genre: 'Love Songs',
      Duration: '1 hour 45 mins',
    },
    sunriseSunset: {
      Sunrise: '6:30 AM',
      Sunset: '7:45 PM',
    },
    airQuality: {
      AQI: 'Good',
      'Main Pollutant': 'None',
    },
    timezone: {
      'Local Time': '5:30 PM',
      Timezone: 'America/New_York',
    },
    aiQuote: {
      Quote: "Life is what happens when you're busy making other plans.",
      Author: 'John Lennon',
    },
    moonPhase: {
      'Current Phase': 'Full Moon',
      Illumination: '100%',
    },
    uvIndex: {
      'UV Index': 'Moderate',
      Advice: 'Wear sunscreen if outdoors for extended periods.',
    },
    fogVisibility: {
      Visibility: '10 km',
      Fog: 'No',
    },
    pollenCount: {
      'Pollen Count': 'Low',
      Allergens: 'None',
    },
    crowdPrediction: {
      'Crowd Level': 'Low',
      'Best Time': 'Morning',
    },
    noiseLevel: {
      'Noise Level': '30 dB',
      Location: 'Park Bench',
    },
    lightPollution: {
      'Light Pollution': 'Low',
      'Best Spots': 'Hilltop Park',
    },
    marineConditions: {
      'Wave Height': '3 ft',
      'Wind Speed': '10 mph',
      Condition: 'Calm',
    },
    cloudCoverage: {
      'Cloud Coverage': '20%',
      Type: 'Few Clouds',
    },
    allergy: {
      Allergens: 'None',
      Advice: 'Enjoy your date without worries!',
    },
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#ffffff', // Changed to white for a cleaner look
        padding: '40px 20px', // Increased padding for better spacing
        color: '#333333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: `'Helvetica Neue', Helvetica, Arial, sans-serif`, // Apple-like font
      }}
    >
      {/* Header */}
      <header
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '60px',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1e90ff', // Softer blue accent
          }}
        >
          Plan A Date
        </h1>
      </header>

      {/* Vertical Cards Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px', // Increased gap for better separation
          padding: '0 20px',
          maxWidth: '1000px', // Adjusted maxWidth for better fit on large screens
          width: '100%',
          marginBottom: '60px',
        }}
      >
        {[
          {
            title: 'Weather Forecast',
            description: 'Plan a date with the latest weather information.',
            buttonText: 'Check Weather',
            apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
            data: sampleData['weather'],
          },
          {
            title: 'Nearby Restaurants',
            description: 'Discover nearby dining options for your date.',
            buttonText: 'Find Restaurants',
            apiUrl: 'https://developers.zomato.com/api/v2.1/search',
            data: sampleData['restaurants'],
          },
          {
            title: 'Movie Suggestions',
            description: 'Get movie recommendations for your date night.',
            buttonText: 'Browse Movies',
            apiUrl: 'https://api.themoviedb.org/3/discover/movie',
            data: sampleData['movies'],
          },
          {
            title: 'Event Finder',
            description: 'Find local events happening near you.',
            buttonText: 'Find Events',
            apiUrl: 'https://www.eventbriteapi.com/v3/events/search/',
            data: sampleData['events'],
          },
          {
            title: 'Date Tips',
            description: 'Get tips to make your date even better.',
            buttonText: 'View Tips',
            apiUrl: 'https://api.adviceslip.com/advice',
            data: sampleData['dateTips'],
          },
          {
            title: 'Music Playlists',
            description: 'Find music playlists to set the mood for your date.',
            buttonText: 'Browse Playlists',
            apiUrl: 'https://api.spotify.com/v1/browse/featured-playlists',
            data: sampleData['playlists'],
          },
          {
            title: 'Sunset/Sunrise Times',
            description: 'Shows the sunrise and sunset times for romantic dates.',
            buttonText: 'View Times',
            apiUrl: 'https://api.sunrise-sunset.org/json',
            data: sampleData['sunriseSunset'],
          },
          {
            title: 'Air Quality',
            description: 'Check air quality for planning outdoor activities.',
            buttonText: 'Check Air Quality',
            apiUrl: 'https://api.openweathermap.org/data/2.5/air_pollution',
            data: sampleData['airQuality'],
          },
          {
            title: 'Timezone',
            description: "Shows times in users' local timezones for coordination.",
            buttonText: 'View Local Time',
            apiUrl: 'http://worldtimeapi.org/api/timezone',
            data: sampleData['timezone'],
          },
          {
            title: 'AI Quote',
            description: 'Get random conversation starters for your date.',
            buttonText: 'Get Quote',
            apiUrl: 'https://api.quotable.io/random',
            data: sampleData['aiQuote'],
          },
          {
            title: 'Moon Phase',
            description: 'Shows the current moon phase for stargazing dates.',
            buttonText: 'View Moon Phase',
            apiUrl: 'https://api.farmsense.net/v1/moonphases/',
            data: sampleData['moonPhase'],
          },
          {
            title: 'UV Index',
            description: 'Check UV levels to plan safe outdoor activities.',
            buttonText: 'Check UV Index',
            apiUrl: 'https://api.openweathermap.org/data/2.5/uvi',
            data: sampleData['uvIndex'],
          },
          {
            title: 'Fog & Visibility',
            description: 'Check fog and visibility for clear views on your date.',
            buttonText: 'Check Visibility',
            apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
            data: sampleData['fogVisibility'],
          },
          {
            title: 'Pollen Count',
            description: 'Check pollen levels to plan an allergy-free date.',
            buttonText: 'Check Pollen Count',
            apiUrl: 'https://api.ambeedata.com/latest/pollen',
            data: sampleData['pollenCount'],
          },
          {
            title: 'Crowd Prediction',
            description: 'Find the best times to avoid crowds for your date.',
            buttonText: 'Check Crowds',
            apiUrl: 'https://api.predicthq.com/v1/events',
            data: sampleData['crowdPrediction'],
          },
          {
            title: 'Noise Level',
            description: 'Find quiet spots for a peaceful date experience.',
            buttonText: 'Check Noise Level',
            apiUrl: 'https://api.soundsnap.com/v1/noise-levels',
            data: sampleData['noiseLevel'],
          },
          {
            title: 'Light Pollution',
            description: 'Find dark skies for stargazing on your date.',
            buttonText: 'Check Light Pollution',
            apiUrl: 'https://api.lightpollutionmap.info/v1/overlays',
            data: sampleData['lightPollution'],
          },
          {
            title: 'Marine Conditions',
            description: 'Check marine conditions for waterfront activities.',
            buttonText: 'Check Marine Conditions',
            apiUrl: 'https://api.stormglass.io/v2/weather/point',
            data: sampleData['marineConditions'],
          },
          {
            title: 'Cloud Coverage',
            description: 'Check cloud coverage for outdoor date planning.',
            buttonText: 'Check Cloud Coverage',
            apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
            data: sampleData['cloudCoverage'],
          },
          {
            title: 'Allergy',
            description: 'Check local allergens to avoid allergy triggers.',
            buttonText: 'Check Allergies',
            apiUrl: 'https://api.ambeedata.com/latest/pollen',
            data: sampleData['allergy'],
          },
        ].map((card, index) => (
          <PlanADateCard key={index} {...card} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PlanADate;
