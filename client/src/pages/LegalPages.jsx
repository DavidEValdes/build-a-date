// src/pages/LegalPages.jsx
import React from 'react';
import Footer from '../components/Footer';

export const PrivacyPolicy = () => {
  return (
    <div
      style={{
        maxWidth: '64rem',
        margin: '0 auto',
        padding: '2rem 1rem',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1
        style={{
          fontSize: '1.875rem', // Equivalent to text-3xl
          fontWeight: '700', // Equivalent to font-bold
          marginBottom: '1.5rem', // Equivalent to mb-6
          color: '#1f2937',
          textAlign: 'center',
        }}
      >
        Privacy Policy
      </h1>

      <div>
        <p style={{ marginBottom: '1rem', color: '#4b5563' }}>Last Updated: November 24, 2024</p>

        {/* 1. Key Terms */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem', // Equivalent to text-2xl
              fontWeight: '600', // Equivalent to font-semibold
              marginBottom: '1rem', // Equivalent to mb-4
              color: '#1f2937',
            }}
          >
            1. Key Terms
          </h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>Personal Data:</strong> Any information relating to an identified or
              identifiable natural person.
            </li>
            <li>
              <strong>User:</strong> Any individual who accesses or uses our Service.
            </li>
            <li>
              <strong>Date Ideas:</strong> Content provided through our Service suggesting activities
              for dates.
            </li>
            <li>
              <strong>Profile:</strong> A user's account and associated information on our Service.
            </li>
          </ul>
        </section>

        {/* 2. Information We Collect */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            2. Information We Collect
          </h2>

          {/* 2.1 Information You Provide */}
          <h3
            style={{
              fontSize: '1.25rem', // Equivalent to text-xl
              fontWeight: '600',
              marginBottom: '0.5rem', // Equivalent to mb-2
              color: '#1f2937',
            }}
          >
            2.1 Information You Provide
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>Account Information:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Username</li>
                <li>Email address</li>
                <li>Password (stored in encrypted form)</li>
                <li>Account creation date</li>
              </ul>
            </li>
            <li>
              <strong>Profile Information:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Preferences for date activities</li>
                <li>Cost preferences (free, economy, standard, premium, luxury)</li>
                <li>Activity level preferences</li>
                <li>Time preferences</li>
                <li>Seasonal preferences</li>
                <li>Indoor/outdoor preferences</li>
              </ul>
            </li>
            <li>
              <strong>User Content:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Comments on date ideas</li>
                <li>Likes and saves</li>
                <li>Shared content</li>
              </ul>
            </li>
            <li>
              <strong>Communications:</strong> Any information you provide when contacting us for support
              or other purposes.
            </li>
          </ul>

          {/* 2.2 Information Automatically Collected */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            2.2 Information Automatically Collected
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>Usage Data:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Access times and dates</li>
                <li>Pages viewed</li>
                <li>Features used</li>
                <li>User interactions</li>
                <li>Error logs</li>
              </ul>
            </li>
            <li>
              <strong>Technical Data:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Unique device identifiers</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* 3. How We Use Your Information */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            3. How We Use Your Information
          </h2>

          {/* 3.1 Essential Operations */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            3.1 Essential Operations
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>To authenticate your identity and maintain your account</li>
            <li>To provide our date recommendation service</li>
            <li>To process and store your preferences</li>
            <li>To enable social features (likes, comments, saves)</li>
            <li>To maintain service security</li>
          </ul>

          {/* 3.2 Service Improvement */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            3.2 Service Improvement
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>To analyze service usage and optimize performance</li>
            <li>To debug issues and prevent fraud</li>
            <li>To develop new features</li>
            <li>To improve our recommendation algorithm</li>
          </ul>

          {/* 3.3 Communications */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            3.3 Communications
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>To send essential service notifications</li>
            <li>To respond to your inquiries</li>
            <li>To provide support</li>
          </ul>
        </section>

        {/* 4. Legal Basis for Processing (GDPR) */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            4. Legal Basis for Processing (GDPR)
          </h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>Contract Performance:</strong> Processing necessary for the performance of our contract with
              you
            </li>
            <li>
              <strong>Legitimate Interests:</strong> Processing necessary for our legitimate interests, provided
              these interests don't override your fundamental rights
            </li>
            <li>
              <strong>Legal Obligation:</strong> Processing necessary to comply with legal obligations
            </li>
            <li>
              <strong>Consent:</strong> Processing based on your specific consent
            </li>
          </ul>
        </section>

        {/* 5. Data Sharing and Disclosure */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            5. Data Sharing and Disclosure
          </h2>

          {/* 5.1 Service Providers */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            5.1 Service Providers
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>Infrastructure Providers:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Railway/Heroku for database hosting</li>
              </ul>
            </li>
            <li>
              <strong>Third-Party Services:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Pexels API for image content</li>
              </ul>
            </li>
          </ul>

          {/* 5.2 Legal Requirements */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            5.2 Legal Requirements
          </h3>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            We may disclose your information if required by law, regulation, legal process, or governmental request.
          </p>

          {/* 5.3 Business Transfers */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            5.3 Business Transfers
          </h3>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            In the event of a merger, acquisition, or sale of all or part of our assets, your information may be
            transferred as part of the transaction.
          </p>
        </section>

        {/* 6. Data Security */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            6. Data Security
          </h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>Storage Security:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Secure PostgreSQL database</li>
                <li>Encrypted data transmission</li>
                <li>Regular security updates</li>
              </ul>
            </li>
            <li>
              <strong>Authentication Security:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Password hashing using bcrypt</li>
                <li>JWT token authentication</li>
                <li>24-hour session expiration</li>
              </ul>
            </li>
            <li>
              <strong>Infrastructure Security:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>CORS policy implementation</li>
                <li>SSL/TLS encryption</li>
                <li>Regular security audits</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* 7. Your Rights */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            7. Your Rights
          </h2>

          {/* 7.1 GDPR Rights (EU Users) */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            7.1 GDPR Rights (EU Users)
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Right to access your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent</li>
          </ul>

          {/* 7.2 CCPA Rights (California Residents) */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            7.2 CCPA Rights (California Residents)
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Right to know what personal information is collected</li>
            <li>Right to know whether personal information is sold or disclosed</li>
            <li>Right to say no to the sale of personal information</li>
            <li>Right to access personal information</li>
            <li>Right to equal service and price</li>
          </ul>
        </section>

        {/* 8. Data Retention */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            8. Data Retention
          </h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>Account Information:</strong> Retained until account deletion
            </li>
            <li>
              <strong>User Content:</strong> Retained until deletion by user or account termination
            </li>
            <li>
              <strong>Usage Data:</strong> Retained for 12 months
            </li>
            <li>
              <strong>Technical Logs:</strong> Retained for 30 days
            </li>
          </ul>
        </section>

        {/* 9. Children's Privacy */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            9. Children's Privacy
          </h2>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Our Service is not directed to children under 13. We do not knowingly collect personal information from
            children under 13. If you become aware that a child has provided us with personal information, please
            contact us. If we become aware that we have collected personal information from children under 13 without
            verification of parental consent, we take steps to remove that information from our servers.
          </p>
        </section>

        {/* 10. International Data Transfers */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            10. International Data Transfers
          </h2>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Your information may be transferred to — and maintained on — computers located outside of your state,
            province, country, or other governmental jurisdiction where the data protection laws may differ from
            those of your jurisdiction. If you are located outside the United States and choose to provide information
            to us, please note that we transfer the data to the United States and process it there.
          </p>
        </section>

        {/* 11. Changes to This Privacy Policy */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            11. Changes to This Privacy Policy
          </h2>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
            Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on
            this page.
          </p>
        </section>

        {/* 12. Contact Us */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            12. Contact Us
          </h2>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li>
              By email:{' '}
              <a href="mailto:privacy@buildadate.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                privacy@buildadate.com
              </a>
            </li>
            <li>
              By visiting our contact page:{' '}
              <a href="https://buildadate.com/contact" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                buildadate.com/contact
              </a>
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </div>
    
  );
};

// Terms and Conditions Component
export const TermsAndConditions = () => {
  return (
    <div
      style={{
        maxWidth: '64rem',
        margin: '0 auto',
        padding: '2rem 1rem',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1
        style={{
          fontSize: '1.875rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#1f2937',
          textAlign: 'center',
        }}
      >
        Terms and Conditions
      </h1>

      <div>
        <p style={{ marginBottom: '1rem', color: '#4b5563' }}>Last Updated: November 24, 2024</p>

        {/* Introduction */}
        <section style={{ marginBottom: '2rem' }}>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the
            Build a Date website (the "Service") operated by Build a Date ("us", "we", or "our").
          </p>

          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these
            Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>

          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of
            the terms then you may not access the Service.
          </p>
        </section>

        {/* 1. Accounts */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            1. Accounts
          </h2>

          {/* 1.1 Account Creation */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            1.1 Account Creation
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>You must be at least 18 years old to create an account.</li>
            <li>You must provide accurate, current, and complete information.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree to accept responsibility for all activities that occur under your account.</li>
          </ul>

          {/* 1.2 Account Security */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            1.2 Account Security
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>You must notify us immediately of any unauthorized use of your account.</li>
            <li>You may not share your account credentials with any third party.</li>
            <li>We reserve the right to disable any account if we suspect violations of these Terms.</li>
            <li>You are responsible for all content posted and activity through your account.</li>
          </ul>
        </section>

        {/* 2. Service Usage Rules */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            2. Service Usage Rules
          </h2>

          {/* 2.1 Acceptable Use */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            2.1 Acceptable Use
          </h3>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not
            to:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Use the Service in any way that violates any applicable law or regulation.</li>
            <li>Attempt to probe, scan, or test the vulnerability of the Service.</li>
            <li>Circumvent or modify any security mechanisms.</li>
            <li>Use any automated systems or scripts to collect information.</li>
            <li>Interfere with or disrupt the Service or servers.</li>
            <li>Upload or transmit malware or malicious code.</li>
          </ul>

          {/* 2.2 Content Guidelines */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            2.2 Content Guidelines
          </h3>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            When creating content on the Service, you must not:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Post inappropriate, offensive, or harmful content.</li>
            <li>Harass, abuse, or harm other users.</li>
            <li>Impersonate others or provide false information.</li>
            <li>Post spam or promotional content without authorization.</li>
            <li>Violate any third-party rights.</li>
          </ul>
        </section>

        {/* 3. Service Features and Limitations */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            3. Service Features and Limitations
          </h2>

          {/* 3.1 Date Recommendations */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            3.1 Date Recommendations
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Date ideas are provided for inspiration purposes only.</li>
            <li>We do not guarantee the availability or suitability of suggested activities.</li>
            <li>Users are responsible for verifying details and making arrangements.</li>
            <li>Recommendations are based on provided preferences and may not be perfect.</li>
          </ul>

          {/* 3.2 User Interactions */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            3.2 User Interactions
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Comments and likes are subject to moderation.</li>
            <li>Sharing features must be used responsibly.</li>
            <li>User profiles are publicly visible.</li>
            <li>Saved dates are private to your account.</li>
          </ul>
        </section>

        {/* 4. Intellectual Property */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            4. Intellectual Property
          </h2>

          {/* 4.1 Service Content */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            4.1 Service Content
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              The Service and its original content (excluding user-generated content) are and will remain the
              exclusive property of Build a Date and its licensors.
            </li>
            <li>
              Our trademarks and trade dress may not be used without prior written consent.
            </li>
            <li>
              The software powering the Service is proprietary and protected.
            </li>
          </ul>

          {/* 4.2 User Content */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            4.2 User Content
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>You retain ownership of content you post to the Service.</li>
            <li>
              You grant us a worldwide, non-exclusive license to use, reproduce, and distribute your content.
            </li>
            <li>You represent that you have all necessary rights to grant this license.</li>
          </ul>
        </section>

        {/* 5. Disclaimers and Limitations */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            5. Disclaimers and Limitations
          </h2>

          {/* 5.1 Service Disclaimers */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            5.1 Service Disclaimers
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>The Service is provided "as is" without warranties of any kind.</li>
            <li>We do not guarantee uninterrupted or error-free service.</li>
            <li>We are not responsible for the conduct of any users.</li>
            <li>Date recommendations are suggestions only.</li>
          </ul>

          {/* 5.2 Limitation of Liability */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            5.2 Limitation of Liability
          </h3>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            To the maximum extent permitted by law, in no event shall Build a Date be liable for:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Any indirect, incidental, special, consequential, or punitive damages.</li>
            <li>Any loss of profits, data, use, or goodwill.</li>
            <li>Any damages relating to your use or inability to use the Service.</li>
            <li>Any actions or content of third parties.</li>
          </ul>
        </section>

        {/* 6. Termination */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            6. Termination
          </h2>

          {/* 6.1 Account Termination */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            6.1 Account Termination
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>We may terminate or suspend your account without prior notice for violations of these Terms.</li>
            <li>You may terminate your account at any time through the Service interface.</li>
            <li>Upon termination, your right to use the Service will immediately cease.</li>
          </ul>

          {/* 6.2 Effects of Termination */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            6.2 Effects of Termination
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              All provisions of the Terms which should survive termination shall survive.
            </li>
            <li>We may retain certain information as required by law.</li>
            <li>We are not responsible for removing content you have shared.</li>
          </ul>
        </section>

        {/* 7. Indemnification */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            7. Indemnification
          </h2>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            You agree to defend, indemnify, and hold harmless Build a Date and its licensors, service providers,
            employees, agents, officers, and directors from and against any claims, liabilities, damages, judgments,
            awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or
            relating to:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Your violation of these Terms.</li>
            <li>Your user content.</li>
            <li>Your use of the Service.</li>
            <li>Your violation of any third party rights.</li>
          </ul>
        </section>

        {/* 8. Changes to Terms */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            8. Changes to Terms
          </h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>We reserve the right to modify or replace these Terms at any time.</li>
            <li>Changes will be effective immediately upon posting.</li>
            <li>Your continued use of the Service constitutes acceptance of changes.</li>
            <li>You are responsible for reviewing changes.</li>
          </ul>
        </section>

        {/* 9. Governing Law */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            9. Governing Law
          </h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>These Terms shall be governed by the laws of [Your Jurisdiction].</li>
            <li>Any disputes shall be resolved in the courts of [Your Jurisdiction].</li>
            <li>You agree to submit to personal jurisdiction in [Your Jurisdiction].</li>
          </ul>
        </section>

        {/* 10. Contact Information */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            10. Contact Information
          </h2>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Questions about the Terms should be sent to:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li>
              Email:{' '}
              <a href="mailto:terms@buildadate.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                terms@buildadate.com
              </a>
            </li>
            <li>
              Through our contact form:{' '}
              <a href="https://buildadate.com/contact" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                buildadate.com/contact
              </a>
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
};

// Cookie Policy Component
export const CookiePolicy = () => {
  return (
    <div
      style={{
        maxWidth: '64rem',
        margin: '0 auto',
        padding: '2rem 1rem',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1
        style={{
          fontSize: '1.875rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#1f2937',
          textAlign: 'center',
        }}
      >
        Cookie Policy
      </h1>

      <div>
        <p style={{ marginBottom: '1rem', color: '#4b5563' }}>Last Updated: November 24, 2024</p>

        {/* 1. What Are Cookies and Similar Technologies? */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            1. What Are Cookies and Similar Technologies?
          </h2>

          {/* 1.1 Definitions */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            1.1 Definitions
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>Cookies:</strong> Small text files stored on your device.
            </li>
            <li>
              <strong>Local Storage:</strong> Web browser feature for storing larger amounts of data.
            </li>
            <li>
              <strong>Session Storage:</strong> Similar to local storage but temporary.
            </li>
            <li>
              <strong>JWT Tokens:</strong> Authentication tokens for secure access.
            </li>
            <li>
              <strong>Cache Storage:</strong> Temporary storage for performance optimization.
            </li>
          </ul>
        </section>

        {/* 2. How We Use Storage Technologies */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            2. How We Use Storage Technologies
          </h2>

          {/* 2.1 Authentication and Security */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            2.1 Authentication and Security
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>JWT Tokens:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Store authentication state</li>
                <li>Maintain secure sessions</li>
                <li>Expire after 24 hours</li>
                <li>Required for account access</li>
              </ul>
            </li>
            <li>
              <strong>Security Tokens:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Prevent unauthorized access</li>
                <li>Protect against CSRF attacks</li>
                <li>Validate user sessions</li>
              </ul>
            </li>
          </ul>

          {/* 2.2 User Preferences */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            2.2 User Preferences
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>Local Storage Data:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Date preferences</li>
                <li>User settings</li>
                <li>Question pipeline responses</li>
                <li>Interface preferences</li>
              </ul>
            </li>
            <li>
              <strong>Session Storage:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Temporary state management</li>
                <li>Current session data</li>
                <li>Form progress</li>
              </ul>
            </li>
          </ul>

          {/* 2.3 Performance Optimization */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            2.3 Performance Optimization
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>Cache Storage:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Image caching system</li>
                <li>API response caching</li>
                <li>Date idea data caching</li>
              </ul>
            </li>
            <li>
              <strong>Performance Cookies:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Load time optimization</li>
                <li>Resource management</li>
                <li>Response time improvement</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* 3. Specific Storage Mechanisms */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            3. Specific Storage Mechanisms
          </h2>

          {/* 3.1 Essential Storage (Required) */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            3.1 Essential Storage (Required)
          </h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '1rem',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  Purpose
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.5rem 1rem' }}>auth_token</td>
                <td style={{ padding: '0.5rem 1rem' }}>Authentication state</td>
                <td style={{ padding: '0.5rem 1rem' }}>24 hours</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '0.5rem 1rem' }}>user_data</td>
                <td style={{ padding: '0.5rem 1rem' }}>Basic user information</td>
                <td style={{ padding: '0.5rem 1rem' }}>Session</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem 1rem' }}>csrf_token</td>
                <td style={{ padding: '0.5rem 1rem' }}>Security verification</td>
                <td style={{ padding: '0.5rem 1rem' }}>Session</td>
              </tr>
            </tbody>
          </table>

          {/* 3.2 Functional Storage (Optional) */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            3.2 Functional Storage (Optional)
          </h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '1rem',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  Purpose
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.5rem 1rem' }}>preferences</td>
                <td style={{ padding: '0.5rem 1rem' }}>User preferences</td>
                <td style={{ padding: '0.5rem 1rem' }}>Persistent</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '0.5rem 1rem' }}>date_history</td>
                <td style={{ padding: '0.5rem 1rem' }}>Saved dates</td>
                <td style={{ padding: '0.5rem 1rem' }}>Persistent</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem 1rem' }}>ui_state</td>
                <td style={{ padding: '0.5rem 1rem' }}>Interface settings</td>
                <td style={{ padding: '0.5rem 1rem' }}>Persistent</td>
              </tr>
            </tbody>
          </table>

          {/* 3.3 Cache Storage */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            3.3 Cache Storage
          </h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '1rem',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  Purpose
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 1rem',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.5rem 1rem' }}>Image Cache</td>
                <td style={{ padding: '0.5rem 1rem' }}>Store date idea images</td>
                <td style={{ padding: '0.5rem 1rem' }}>30 days</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '0.5rem 1rem' }}>API Cache</td>
                <td style={{ padding: '0.5rem 1rem' }}>Store API responses</td>
                <td style={{ padding: '0.5rem 1rem' }}>24 hours</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem 1rem' }}>Data Cache</td>
                <td style={{ padding: '0.5rem 1rem' }}>Store date suggestions</td>
                <td style={{ padding: '0.5rem 1rem' }}>7 days</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 4. Third-Party Services */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            4. Third-Party Services
          </h2>

          {/* 4.1 Image Services */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            4.1 Image Services
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>Pexels API:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Provides date idea images</li>
                <li>May use own cookies</li>
                <li>Subject to Pexels privacy policy</li>
              </ul>
            </li>
          </ul>

          {/* 4.2 Infrastructure Services */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            4.2 Infrastructure Services
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>Hosting Providers:</strong>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Railway/Heroku for database</li>
                <li>May use operational cookies</li>
                <li>Subject to provider privacy policies</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* 5. Managing Storage Technologies */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            5. Managing Storage Technologies
          </h2>

          {/* 5.1 Essential Storage */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            5.1 Essential Storage
          </h3>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Essential storage mechanisms cannot be disabled as they are required for basic service functionality,
            including:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Authentication</li>
            <li>Security measures</li>
            <li>Basic site functionality</li>
          </ul>

          {/* 5.2 Optional Storage */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937',
            }}
          >
            5.2 Optional Storage
          </h3>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            You can control optional storage through:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Browser settings</li>
            <li>Private browsing mode</li>
            <li>Manual clearing of browser data</li>
            <li>Account settings in our Service</li>
          </ul>
        </section>

        {/* 6. Storage Technology Updates */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            6. Storage Technology Updates
          </h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>We may update our storage technologies and methods.</li>
            <li>Changes will be reflected in this policy.</li>
            <li>Significant changes will be announced.</li>
            <li>Users will be notified of material changes.</li>
          </ul>
        </section>

        {/* 7. Impact of Disabling Storage */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            7. Impact of Disabling Storage
          </h2>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Disabling optional storage may affect:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li>User preference retention</li>
            <li>Date suggestion personalization</li>
            <li>Performance optimization</li>
            <li>Service convenience features</li>
          </ul>
        </section>

        {/* 8. Contact Information */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1f2937',
            }}
          >
            8. Contact Information
          </h2>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            For questions about our use of cookies and storage technologies, contact us at:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li>
              Email:{' '}
              <a href="mailto:privacy@buildadate.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                privacy@buildadate.com
              </a>
            </li>
            <li>
              Contact form:{' '}
              <a href="https://buildadate.com/contact" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                buildadate.com/contact
              </a>
            </li>
          </ul>
        </section>
        
      </div>
      <Footer  />
    </div>
    
    
  );
  
};

export const HowItWorks = () => {
  return (
    <div
      style={{
        maxWidth: '64rem',
        margin: '0 auto',
        padding: '2rem 1rem',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1
        style={{
          fontSize: '1.875rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#1f2937',
          textAlign: 'center',
        }}
      >
        How Build a Date Works
      </h1>

      {/* 1. Smart Matching System */}
      <section style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#1f2937',
          }}
        >
          1. Smart Matching System
        </h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>
            <strong>Preference Analysis:</strong>
            <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Tell us your activity preferences</li>
              <li>Specify your budget range</li>
              <li>Choose indoor or outdoor settings</li>
              <li>Set your ideal group size</li>
            </ul>
          </li>
          <li>
            <strong>AI-Powered Matching:</strong>
            <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Advanced algorithm analyzes your preferences</li>
              <li>Weighs multiple factors for optimal matches</li>
              <li>Considers seasonal appropriateness</li>
              <li>Adapts to time-of-day preferences</li>
            </ul>
          </li>
        </ul>
      </section>

      {/* 2. Date Ideas Database */}
      <section style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#1f2937',
          }}
        >
          2. Date Ideas Database
        </h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Access to 500+ unique date ideas</li>
          <li>Regularly updated with new suggestions</li>
          <li>Diverse range of activities and experiences</li>
          <li>Carefully curated for different preferences</li>
        </ul>
      </section>

      {/* 3. Social Features */}
      <section style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#1f2937',
          }}
        >
          3. Social Features
        </h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Share your favorite date ideas</li>
          <li>Save suggestions for later</li>
          <li>Like and comment on date ideas</li>
          <li>Build a community of date planners</li>
        </ul>
      </section>

      {/* 4. Getting Started */}
      <section style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#1f2937',
          }}
        >
          4. Getting Started
        </h2>
        <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Create your free account</li>
          <li>Complete the preference questionnaire</li>
          <li>Receive personalized date suggestions</li>
          <li>Save and share your favorites</li>
        </ol>
      </section>
    </div>
  );
};

export const ContactUs = () => {
  return (
    <div
      style={{
        maxWidth: '64rem',
        margin: '0 auto',
        padding: '2rem 1rem',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1
        style={{
          fontSize: '1.875rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#1f2937',
          textAlign: 'center',
        }}
      >
        Contact Us
      </h1>

      {/* 1. General Support */}
      <section style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#1f2937',
          }}
        >
          1. General Support
        </h2>
        <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
          For general inquiries and support, please email us at:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>
            <a href="mailto:support@buildadate.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>
              support@buildadate.com
            </a>
          </li>
        </ul>
      </section>

      {/* 2. Business Hours */}
      <section style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#1f2937',
          }}
        >
          2. Business Hours
        </h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>Monday - Friday: 9:00 AM - 5:00 PM (PST)</li>
          <li>Saturday: 10:00 AM - 2:00 PM (PST)</li>
          <li>Sunday: Closed</li>
        </ul>
      </section>

      {/* 3. Response Time */}
      <section style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#1f2937',
          }}
        >
          3. Response Time
        </h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>We aim to respond to all inquiries within 24 business hours</li>
          <li>For urgent matters, please mark your email as "Urgent" in the subject line</li>
          <li>Weekend responses may be delayed until the next business day</li>
        </ul>
      </section>

      {/* 4. Specific Inquiries */}
      <section style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#1f2937',
          }}
        >
          4. Specific Inquiries
        </h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>
            <strong>Technical Support:</strong>{' '}
            <a href="mailto:tech@buildadate.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>
              tech@buildadate.com
            </a>
          </li>
          <li>
            <strong>Privacy Concerns:</strong>{' '}
            <a href="mailto:privacy@buildadate.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>
              privacy@buildadate.com
            </a>
          </li>
          <li>
            <strong>Business Partnerships:</strong>{' '}
            <a href="mailto:partners@buildadate.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>
              partners@buildadate.com
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};
