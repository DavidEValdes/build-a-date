import React from 'react';
import Footer from '../components/Footer';

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
        background: '#f8f9fa',
        padding: '32px',
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <header
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#3b82f6',
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
          gap: '24px',
          padding: '16px',
          maxWidth: '1200px',
          width: '100%',
          marginBottom: '48px',
        }}
      >
        {[
          {
            title: 'Weather Forecast',
            description: 'Plan a date with the latest weather information.',
            buttonText: 'Check Weather',
            apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
            dataKey: 'weather',
          },
          {
            title: 'Nearby Restaurants',
            description: 'Discover nearby dining options for your date.',
            buttonText: 'Find Restaurants',
            apiUrl: 'https://developers.zomato.com/api/v2.1/search',
            dataKey: 'restaurants',
          },
          {
            title: 'Movie Suggestions',
            description: 'Get movie recommendations for your date night.',
            buttonText: 'Browse Movies',
            apiUrl: 'https://api.themoviedb.org/3/discover/movie',
            dataKey: 'movies',
          },
          {
            title: 'Event Finder',
            description: 'Find local events happening near you.',
            buttonText: 'Find Events',
            apiUrl: 'https://www.eventbriteapi.com/v3/events/search/',
            dataKey: 'events',
          },
          {
            title: 'Date Tips',
            description: 'Get tips to make your date even better.',
            buttonText: 'View Tips',
            apiUrl: 'https://api.adviceslip.com/advice',
            dataKey: 'dateTips',
          },
          {
            title: 'Music Playlists',
            description: 'Find music playlists to set the mood for your date.',
            buttonText: 'Browse Playlists',
            apiUrl: 'https://api.spotify.com/v1/browse/featured-playlists',
            dataKey: 'playlists',
          },
          {
            title: 'Sunset/Sunrise Times',
            description: 'Shows the sunrise and sunset times for romantic dates.',
            buttonText: 'View Times',
            apiUrl: 'https://api.sunrise-sunset.org/json',
            dataKey: 'sunriseSunset',
          },
          {
            title: 'Air Quality',
            description: 'Check air quality for planning outdoor activities.',
            buttonText: 'Check Air Quality',
            apiUrl: 'https://api.openweathermap.org/data/2.5/air_pollution',
            dataKey: 'airQuality',
          },
          {
            title: 'Timezone',
            description: "Shows times in users' local timezones for coordination.",
            buttonText: 'View Local Time',
            apiUrl: 'http://worldtimeapi.org/api/timezone',
            dataKey: 'timezone',
          },
          {
            title: 'AI Quote',
            description: 'Get random conversation starters for your date.',
            buttonText: 'Get Quote',
            apiUrl: 'https://api.quotable.io/random',
            dataKey: 'aiQuote',
          },
          {
            title: 'Moon Phase',
            description: 'Shows the current moon phase for stargazing dates.',
            buttonText: 'View Moon Phase',
            apiUrl: 'https://api.farmsense.net/v1/moonphases/',
            dataKey: 'moonPhase',
          },
          {
            title: 'UV Index',
            description: 'Check UV levels to plan safe outdoor activities.',
            buttonText: 'Check UV Index',
            apiUrl: 'https://api.openweathermap.org/data/2.5/uvi',
            dataKey: 'uvIndex',
          },
          {
            title: 'Fog & Visibility',
            description: 'Check fog and visibility for clear views on your date.',
            buttonText: 'Check Visibility',
            apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
            dataKey: 'fogVisibility',
          },
          {
            title: 'Pollen Count',
            description: 'Check pollen levels to plan an allergy-free date.',
            buttonText: 'Check Pollen Count',
            apiUrl: 'https://api.ambeedata.com/latest/pollen',
            dataKey: 'pollenCount',
          },
          {
            title: 'Crowd Prediction',
            description: 'Find the best times to avoid crowds for your date.',
            buttonText: 'Check Crowds',
            apiUrl: 'https://api.predicthq.com/v1/events',
            dataKey: 'crowdPrediction',
          },
          {
            title: 'Noise Level',
            description: 'Find quiet spots for a peaceful date experience.',
            buttonText: 'Check Noise Level',
            apiUrl: 'https://api.soundsnap.com/v1/noise-levels',
            dataKey: 'noiseLevel',
          },
          {
            title: 'Light Pollution',
            description: 'Find dark skies for stargazing on your date.',
            buttonText: 'Check Light Pollution',
            apiUrl: 'https://api.lightpollutionmap.info/v1/overlays',
            dataKey: 'lightPollution',
          },
          {
            title: 'Marine Conditions',
            description: 'Check marine conditions for waterfront activities.',
            buttonText: 'Check Marine Conditions',
            apiUrl: 'https://api.stormglass.io/v2/weather/point',
            dataKey: 'marineConditions',
          },
          {
            title: 'Cloud Coverage',
            description: 'Check cloud coverage for outdoor date planning.',
            buttonText: 'Check Cloud Coverage',
            apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
            dataKey: 'cloudCoverage',
          },
          {
            title: 'Allergy',
            description: 'Check local allergens to avoid allergy triggers.',
            buttonText: 'Check Allergies',
            apiUrl: 'https://api.ambeedata.com/latest/pollen',
            dataKey: 'allergy',
          },
        ].map((card, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              minWidth: '320px',
              minHeight: '260px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '12px',
                }}
              >
                {card.title}
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  marginBottom: '16px',
                }}
              >
                {card.description}
              </p>
              {/* Mini Dashboard Sections */}
              <div
                style={{
                  display: 'grid',
                  gap: '8px',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                }}
              >
                {Object.entries(sampleData[card.dataKey] || {}).map(([key, value], idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#f1f5f9',
                      padding: '8px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.875rem',
                        color: '#4b5563',
                        fontWeight: '500',
                      }}
                    >
                      {key}:
                    </span>
                    <span
                      style={{
                        fontSize: '1rem',
                        color: '#1f2937',
                        fontWeight: '600',
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleButtonClick(card.apiUrl)}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'background-color 0.2s, transform 0.2s',
                marginTop: '24px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {card.buttonText}
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PlanADate;
