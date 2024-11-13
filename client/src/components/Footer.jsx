// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer
    className="footer-container"
    style={{
      backgroundColor: "#f8fafc",
      borderTop: "1px solid #e5e7eb",
      padding: "2rem 0", // Reduced from 3rem
      marginTop: "auto",
    }}
  >
    <div
      className="footer-content"
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "0 2rem",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "2rem", // Reduced from 3rem
        fontSize: "0.85rem",
      }}
    >
      {/* Company Info */}
      <div className="footer-section">
        <h3
          style={{
            fontSize: "0.95rem",
            fontWeight: "600",
            marginBottom: "0.5rem", // Reduced from 1rem
            color: "#1f2937",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Build a Date
        </h3>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.8rem",
            marginBottom: "0.5rem", // Reduced from 1rem
            lineHeight: "1.4", // Reduced from 1.5
          }}
        >
          Let our AI-tailored matchmaker craft your perfect date experience.
        </p>
      </div>

      {/* Quick Links */}
      <div className="footer-section">
        <h3
          style={{
            fontSize: "0.95rem",
            fontWeight: "600",
            marginBottom: "0.5rem", // Reduced from 1rem
            color: "#1f2937",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Quick Links
        </h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Link to="/about" style={{ color: "#6b7280", fontSize: "0.8rem" }}>
            About Us
          </Link>
          <Link
            to="/how-it-works"
            style={{ color: "#6b7280", fontSize: "0.8rem" }}
          >
            How It Works
          </Link>
          <Link to="/contact" style={{ color: "#6b7280", fontSize: "0.8rem" }}>
            Contact Us
          </Link>
        </div>
      </div>

      {/* Legal */}
      <div className="footer-section">
        <h3
          style={{
            fontSize: "0.95rem",
            fontWeight: "600",
            marginBottom: "0.5rem", // Reduced from 1rem
            color: "#1f2937",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Legal
        </h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Link to="/privacy" style={{ color: "#6b7280", fontSize: "0.8rem" }}>
            Privacy Policy
          </Link>
          <Link to="/terms" style={{ color: "#6b7280", fontSize: "0.8rem" }}>
            Terms and Conditions
          </Link>
          <Link
            to="/cookiepolicy"
            style={{ color: "#6b7280", fontSize: "0.8rem" }}
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        borderTop: "1px solid #e5e7eb",
        marginTop: "1.5rem", // Reduced from 3rem
        paddingTop: "1rem", // Reduced from 1.5rem
        textAlign: "center",
        color: "#6b7280",
        fontSize: "0.75rem",
        padding: "1rem 2rem", // Reduced from 1.5rem
      }}
    >
      <p>
        © {new Date().getFullYear()} Build a Date, LLC. All rights reserved.
      </p>
    </div>

    <style>
      {`
        .footer-section a:hover {
          color: #507acf !important;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .footer-section div {
            align-items: center;
          }
        }
      `}
    </style>
  </footer>
);

export default Footer;
