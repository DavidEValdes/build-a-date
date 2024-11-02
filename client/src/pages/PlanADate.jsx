const PlanADate = () => {
    return (
      <div style={{ minHeight: '100vh', background: 'white', padding: '16px', color: '#333' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4b6cb7' }}>Plan A Date Dashboard</h1>
        </header>
  
        {/* Main Dashboard Section */}
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
  
          {/* Card Template with Flexbox to Align Button at Bottom */}
          {/* Original and New Cards */}
          {[
            { title: "Weather Forecast", description: "Plan a date with the latest weather information.", buttonText: "Check Weather" },
            { title: "Nearby Restaurants", description: "Discover nearby dining options for your date.", buttonText: "Find Restaurants" },
            { title: "Movie Suggestions", description: "Get movie recommendations for your date night.", buttonText: "Browse Movies" },
            { title: "Event Finder", description: "Find local events happening near you.", buttonText: "Find Events" },
            { title: "Date Tips", description: "Get tips to make your date even better.", buttonText: "View Tips" },
            { title: "Music Playlists", description: "Find music playlists to set the mood for your date.", buttonText: "Browse Playlists" },
  
            // New API Cards from the Screenshot
            { title: "Sunset/Sunrise Times", description: "Shows the sunrise and sunset times for romantic dates.", buttonText: "View Times" },
            { title: "Air Quality", description: "Check air quality for planning outdoor activities.", buttonText: "Check Air Quality" },
            { title: "Timezone", description: "Shows times in users' local timezones for coordination.", buttonText: "View Local Time" },
            { title: "AI Quote", description: "Get random conversation starters for your date.", buttonText: "Get Quote" },
            { title: "Moon Phase", description: "Shows the current moon phase for stargazing dates.", buttonText: "View Moon Phase" },
            { title: "UV Index", description: "Check UV levels to plan safe outdoor activities.", buttonText: "Check UV Index" },
            { title: "Fog & Visibility", description: "Check fog and visibility for clear views on your date.", buttonText: "Check Visibility" },
            { title: "Pollen Count", description: "Check pollen levels to plan an allergy-free date.", buttonText: "Check Pollen Count" },
            { title: "Crowd Prediction", description: "Find the best times to avoid crowds for your date.", buttonText: "Check Crowds" },
            { title: "Noise Level", description: "Find quiet spots for a peaceful date experience.", buttonText: "Check Noise Level" },
            { title: "Light Pollution", description: "Find dark skies for stargazing on your date.", buttonText: "Check Light Pollution" },
            { title: "Marine Conditions", description: "Check marine conditions for waterfront activities.", buttonText: "Check Marine Conditions" },
            { title: "Cloud Coverage", description: "Check cloud coverage for outdoor date planning.", buttonText: "Check Cloud Coverage" },
            { title: "Allergy", description: "Check local allergens to avoid allergy triggers.", buttonText: "Check Allergies" },
          ].map((card, index) => (
            <div key={index} style={{ backgroundColor: 'rgba(80, 122, 207, 0.9)', padding: '20px', borderRadius: '16px', textAlign: 'center', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>{card.title}</h2>
                <p>{card.description}</p>
              </div>
              <button style={{ marginTop: '12px', backgroundColor: 'white', color: '#4b6cb7', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer', alignSelf: 'center' }}>
                {card.buttonText}
              </button>
            </div>
          ))}
          
        </div>
      </div>
    );
  };
  
  export default PlanADate;
  