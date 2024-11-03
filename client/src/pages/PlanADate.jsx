import React from 'react';
import Footer from '../components/Footer';

const PlanADate = () => {
  // Function to handle button clicks
  const handleButtonClick = (apiUrl) => {
    // Replace with actual API call logic
    alert(`Fetching data from: ${apiUrl}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white', padding: '16px', color: '#333' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4b6cb7' }}>Plan A Date</h1>
      </header>

      {/* Main Dashboard Section */}
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {/* Card Template with Flexbox to Align Button at Bottom */}
        {[
          {
            title: "Weather Forecast",
            description: "Plan a date with the latest weather information.",
            buttonText: "Check Weather",
            apiUrl: "https://api.openweathermap.org/data/2.5/weather",
          },
          {
            title: "Nearby Restaurants",
            description: "Discover nearby dining options for your date.",
            buttonText: "Find Restaurants",
            apiUrl: "https://developers.zomato.com/api/v2.1/search",
          },
          {
            title: "Movie Suggestions",
            description: "Get movie recommendations for your date night.",
            buttonText: "Browse Movies",
            apiUrl: "https://api.themoviedb.org/3/discover/movie",
          },
          {
            title: "Event Finder",
            description: "Find local events happening near you.",
            buttonText: "Find Events",
            apiUrl: "https://www.eventbriteapi.com/v3/events/search/",
          },
          {
            title: "Date Tips",
            description: "Get tips to make your date even better.",
            buttonText: "View Tips",
            apiUrl: "https://api.adviceslip.com/advice",
          },
          {
            title: "Music Playlists",
            description: "Find music playlists to set the mood for your date.",
            buttonText: "Browse Playlists",
            apiUrl: "https://api.spotify.com/v1/browse/featured-playlists",
          },
          {
            title: "Sunset/Sunrise Times",
            description: "Shows the sunrise and sunset times for romantic dates.",
            buttonText: "View Times",
            apiUrl: "https://api.sunrise-sunset.org/json",
          },
          {
            title: "Air Quality",
            description: "Check air quality for planning outdoor activities.",
            buttonText: "Check Air Quality",
            apiUrl: "https://api.openweathermap.org/data/2.5/air_pollution",
          },
          {
            title: "Timezone",
            description: "Shows times in users' local timezones for coordination.",
            buttonText: "View Local Time",
            apiUrl: "http://worldtimeapi.org/api/timezone",
          },
          {
            title: "AI Quote",
            description: "Get random conversation starters for your date.",
            buttonText: "Get Quote",
            apiUrl: "https://api.quotable.io/random",
          },
          {
            title: "Moon Phase",
            description: "Shows the current moon phase for stargazing dates.",
            buttonText: "View Moon Phase",
            apiUrl: "https://api.farmsense.net/v1/moonphases/",
          },
          {
            title: "UV Index",
            description: "Check UV levels to plan safe outdoor activities.",
            buttonText: "Check UV Index",
            apiUrl: "https://api.openweathermap.org/data/2.5/uvi",
          },
          {
            title: "Fog & Visibility",
            description: "Check fog and visibility for clear views on your date.",
            buttonText: "Check Visibility",
            apiUrl: "https://api.openweathermap.org/data/2.5/weather",
          },
          {
            title: "Pollen Count",
            description: "Check pollen levels to plan an allergy-free date.",
            buttonText: "Check Pollen Count",
            apiUrl: "https://api.ambeedata.com/latest/pollen",
          },
          {
            title: "Crowd Prediction",
            description: "Find the best times to avoid crowds for your date.",
            buttonText: "Check Crowds",
            apiUrl: "https://api.predicthq.com/v1/events",
          },
          {
            title: "Noise Level",
            description: "Find quiet spots for a peaceful date experience.",
            buttonText: "Check Noise Level",
            apiUrl: "https://api.soundsnap.com/v1/noise-levels",
          },
          {
            title: "Light Pollution",
            description: "Find dark skies for stargazing on your date.",
            buttonText: "Check Light Pollution",
            apiUrl: "https://api.lightpollutionmap.info/v1/overlays",
          },
          {
            title: "Marine Conditions",
            description: "Check marine conditions for waterfront activities.",
            buttonText: "Check Marine Conditions",
            apiUrl: "https://api.stormglass.io/v2/weather/point",
          },
          {
            title: "Cloud Coverage",
            description: "Check cloud coverage for outdoor date planning.",
            buttonText: "Check Cloud Coverage",
            apiUrl: "https://api.openweathermap.org/data/2.5/weather",
          },
          {
            title: "Allergy",
            description: "Check local allergens to avoid allergy triggers.",
            buttonText: "Check Allergies",
            apiUrl: "https://api.ambeedata.com/latest/pollen",
          },
        ].map((card, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'rgba(80, 122, 207, 0.9)',
              padding: '20px',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '200px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
                {card.title}
              </h2>
              <p>{card.description}</p>
            </div>
            <button
              onClick={() => handleButtonClick(card.apiUrl)}
              style={{
                marginTop: '12px',
                backgroundColor: 'white',
                color: '#4b6cb7',
                padding: '8px 16px',
                borderRadius: '12px',
                cursor: 'pointer',
                alignSelf: 'center'
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
