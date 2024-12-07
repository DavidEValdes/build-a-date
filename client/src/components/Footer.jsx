// src/components/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();
  const legalPages = ["/privacy-policy", "/terms-and-conditions", "/cookie-policy"];
  const isLegalPage = legalPages.includes(location.pathname.toLowerCase());

  // Add scroll to top function
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // For smooth scrolling
    });
  };

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
            <Link to="/how-it-works" onClick={handleClick}>How It Works</Link>
            <Link to="/contact-us" onClick={handleClick}>Contact Us</Link>
          </div>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h3>Legal</h3>
          <div>
            <Link to="/privacy-policy" onClick={handleClick}>Privacy Policy</Link>
            <Link to="/terms-and-conditions" onClick={handleClick}>Terms and Conditions</Link>
            <Link to="/cookie-policy" onClick={handleClick}>Cookie Policy</Link>
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
