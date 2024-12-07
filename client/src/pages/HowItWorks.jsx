import Footer from "../components/Footer";

const HowItWorks = () => {
  const steps = [
    {
      title: "Tell Us Your Preferences",
      description:
        "Answer a few simple questions about what you're looking for in a date. We'll ask about your interests, preferred activity level, budget, and more.",
      icon: "🎯",
    },
    {
      title: "Get Personalized Suggestions",
      description:
        "Our AI-powered system analyzes your preferences to suggest unique and exciting date ideas tailored just for you.",
      icon: "💡",
    },
    {
      title: "Save Your Favorites",
      description:
        "Found a date idea you love? Save it to your profile for easy access later. You can also like and share great date ideas with others.",
      icon: "❤️",
    },
   
  ];

  const features = [
    {
      title: "AI-Powered Matching",
      description:
        "Our sophisticated algorithm learns from your preferences to suggest increasingly personalized date ideas.",
      icon: "🤖",
    },
    {
      title: "Diverse Options",
      description:
        "From cozy indoor activities to outdoor adventures, we have date ideas for every preference and budget.",
      icon: "🎨",
    },
    
  
  ];

  return (
    <div className="how-it-works-page">
      <div className="how-it-works-container">
        <h1>How Build A Date Works</h1>
        <p className="intro-text">
          Build A Date makes it easy to discover and plan the perfect date. Here's
          how our platform helps you create memorable experiences.
        </p>

        <section className="steps-section">
          <h2>Simple Steps to Your Perfect Date</h2>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-icon">{step.icon}</div>
                <h3>
                  <span className="step-number">{index + 1}</span>. {step.title}
                </h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="features-section">
          <h2>Why Choose Build A Date?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Find Your Perfect Date?</h2>
          <p>
            Start exploring unique date ideas tailored to your preferences today.
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="cta-button"
          >
            Get Started
          </button>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks; 