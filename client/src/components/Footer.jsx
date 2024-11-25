// src/components/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css"; // Import the external CSS

const Footer = () => {
  const location = useLocation();
  const legalPages = ["/privacy", "/terms", "/cookiepolicy"];
  const isLegalPage = legalPages.includes(location.pathname.toLowerCase());

  return (
    <footer className={`footer-container ${isLegalPage ? "footer-legal" : ""}`}>
      <div className="footer-content">
        {/* Company Info */}
        <div className="footer-section">
          <h3>Build a Date</h3>
          <p>
            Let our AI-tailored matchmaker craft your perfect date experience.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <div>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h3>Legal</h3>
          <div>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms and Conditions</Link>
            <Link to="/cookiepolicy">Cookie Policy</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Build a Date, LLC. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
