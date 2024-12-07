// src/pages/LegalPages.jsx
import React from 'react';
import Footer from '../components/Footer';

const PageContainer = ({ children }) => (
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
    {children}
    <Footer />
  </div>
);

const PageTitle = ({ children }) => (
  <h1
    style={{
      fontSize: '1.875rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: '#1f2937',
      textAlign: 'center',
    }}
  >
    {children}
  </h1>
);

const SectionTitle = ({ children }) => (
  <h2
    style={{
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#1f2937',
    }}
  >
    {children}
  </h2>
);

const SubsectionTitle = ({ children }) => (
  <h3
    style={{
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#1f2937',
    }}
  >
    {children}
  </h3>
);

export const PrivacyPolicy = () => {
  return (
    <PageContainer>
      <PageTitle>Privacy Policy</PageTitle>
      <div>
        <p style={{ marginBottom: '1rem', color: '#4b5563' }}>Last Updated: {new Date().toLocaleDateString()}</p>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>1. Introduction</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Build a Date ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our date recommendation service, including our website and mobile application (collectively, the "Service").
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>2. Information We Collect</SectionTitle>

          <SubsectionTitle>2.1 Personal Information</SubsectionTitle>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Account Information: Email address, username, password</li>
            <li>Profile Information: Date preferences, interests, activity levels</li>
            <li>Usage Data: Interaction with date suggestions, saved dates, ratings</li>
            <li>Location Data: General location for date recommendations (optional)</li>
            <li>Communication Data: Messages, feedback, support inquiries</li>
          </ul>

          <SubsectionTitle>2.2 Technical Information</SubsectionTitle>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Device Information: Browser type, operating system, device identifiers</li>
            <li>Usage Information: Access times, pages viewed, features used</li>
            <li>Log Data: IP addresses, browser type, referring/exit pages</li>
            <li>Cookies and Similar Technologies: Session data, preferences</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>3. How We Use Your Information</SectionTitle>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Provide personalized date recommendations</li>
            <li>Improve our recommendation algorithm</li>
            <li>Maintain and optimize our Service</li>
            <li>Communicate with you about your account and updates</li>
            <li>Analyze usage patterns and trends</li>
            <li>Prevent fraud and ensure security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>4. Information Sharing</SectionTitle>
          <SubsectionTitle>4.1 Service Providers</SubsectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            We may share your information with third-party service providers who assist us in:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Hosting and maintaining our Service</li>
            <li>Processing payments</li>
            <li>Analyzing data and usage patterns</li>
            <li>Customer service and communication</li>
            <li>Marketing and advertising</li>
          </ul>

          <SubsectionTitle>4.2 Legal Requirements</SubsectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            We may disclose your information if required by law, regulation, legal process, or governmental request.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>5. Data Security</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            We implement appropriate technical and organizational security measures to protect your information, including:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Encryption of sensitive data</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Secure data storage and transmission</li>
            <li>Regular security updates and monitoring</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>6. Your Rights and Choices</SectionTitle>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Access and update your personal information</li>
            <li>Delete your account and associated data</li>
            <li>Opt-out of marketing communications</li>
            <li>Control cookie preferences</li>
            <li>Export your data</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>7. Children's Privacy</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Our Service is not intended for individuals under the age of 18. We do not knowingly collect or maintain information from persons under 18 years of age.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>8. Changes to This Policy</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>9. Contact Us</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Email: privacy@buildadate.com</li>
            <li>Address: 123 Date Street, San Francisco, CA 94105</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>10. GDPR Compliance</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            For users in the European Union, we comply with GDPR requirements:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Legal basis for processing data</li>
            <li>Data Protection Officer contact: dpo@buildadate.com</li>
            <li>Right to file complaints with supervisory authorities</li>
            <li>Cross-border data transfer safeguards</li>
            <li>72-hour breach notification commitment</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>11. CCPA Compliance</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            For California residents, in accordance with the California Consumer Privacy Act (CCPA):
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Right to know what personal information is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to opt-out of the sale of personal information</li>
            <li>Right to non-discrimination for exercising CCPA rights</li>
            <li>Annual disclosure of data sharing practices</li>
          </ul>
        </section>
      </div>
    </PageContainer>
  );
};

export const TermsAndConditions = () => {
  return (
    <PageContainer>
      <PageTitle>Terms and Conditions</PageTitle>
      <div>
        <p style={{ marginBottom: '1rem', color: '#4b5563' }}>Last Updated: {new Date().toLocaleDateString()}</p>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>1. Agreement to Terms</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            By accessing or using Build a Date ("the Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of these Terms, you may not access or use the Service.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>2. User Accounts</SectionTitle>
          <SubsectionTitle>2.1 Account Creation</SubsectionTitle>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>You must be at least 18 years old to create an account</li>
            <li>You must provide accurate and complete information</li>
            <li>You are responsible for maintaining account security</li>
            <li>One account per person</li>
          </ul>

          <SubsectionTitle>2.2 Account Responsibilities</SubsectionTitle>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Maintain confidentiality of login credentials</li>
            <li>Report unauthorized access immediately</li>
            <li>Update account information as needed</li>
            <li>Accept responsibility for all account activity</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>3. Service Usage</SectionTitle>
          <SubsectionTitle>3.1 Date Recommendations</SubsectionTitle>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Recommendations are suggestions only</li>
            <li>We do not guarantee availability or suitability</li>
            <li>Users are responsible for verifying details</li>
            <li>Safety and planning are user responsibilities</li>
          </ul>

          <SubsectionTitle>3.2 User Content</SubsectionTitle>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>You retain ownership of your content</li>
            <li>Grant us license to use and display content</li>
            <li>Must not violate others' rights</li>
            <li>Must be appropriate and legal</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>4. Prohibited Activities</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            You agree not to:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Use the service for illegal purposes</li>
            <li>Harass or harm other users</li>
            <li>Post inappropriate or offensive content</li>
            <li>Attempt to access unauthorized areas</li>
            <li>Interfere with service operation</li>
            <li>Create multiple accounts</li>
            <li>Scrape or collect user data</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>5. Intellectual Property</SectionTitle>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Service content is our exclusive property</li>
            <li>Trademarks and logos are protected</li>
            <li>No right to copy or modify content</li>
            <li>Limited license for personal use only</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>6. Disclaimer of Warranties</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Success of date recommendations</li>
            <li>Accuracy of information</li>
            <li>Uninterrupted service</li>
            <li>Security or error-free operation</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>7. Limitation of Liability</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Build a Date shall not be liable for:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Direct, indirect, or consequential damages</li>
            <li>Personal injury or property damage</li>
            <li>Loss of data or profits</li>
            <li>Service interruptions</li>
            <li>Third-party actions</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>8. Indemnification</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            You agree to indemnify and hold Build a Date harmless from any claims arising from:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Your use of the Service</li>
            <li>Violation of these Terms</li>
            <li>Your content</li>
            <li>Interaction with other users</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>9. Termination</SectionTitle>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>We may terminate accounts for violations</li>
            <li>You may terminate your account anytime</li>
            <li>Certain terms survive termination</li>
            <li>No refunds upon termination</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>10. Governing Law</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>11. Changes to Terms</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or service notification.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>12. Contact Information</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            For questions about these Terms, please contact us at:
          </p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Email: legal@buildadate.com</li>
            <li>Address: 123 Date Street, San Francisco, CA 94105</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>13. Dispute Resolution</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Any disputes shall be resolved through:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Mandatory arbitration in San Francisco, California</li>
            <li>Class action waiver</li>
            <li>Small claims court option for eligible claims</li>
            <li>30-day informal dispute resolution period</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>14. Age Restrictions and Verification</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            By using our Service:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>You confirm you are at least 18 years old</li>
            <li>We reserve the right to verify age and identity</li>
            <li>Parents/guardians are responsible for minor access</li>
            <li>Immediate account termination for age misrepresentation</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>15. User Safety and Conduct</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Users agree to:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Take responsibility for personal safety during dates</li>
            <li>Not share personal identifying information through the Service</li>
            <li>Report suspicious or harmful behavior</li>
            <li>Follow safety guidelines provided by the Service</li>
            <li>Understand we are not responsible for offline interactions</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>16. Intellectual Property Rights</SectionTitle>
          <SubsectionTitle>16.1 Our IP Rights</SubsectionTitle>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>All content and materials are protected by copyright</li>
            <li>Trademarks and service marks are our exclusive property</li>
            <li>Patents and pending patent applications</li>
            <li>Trade secrets and proprietary information</li>
          </ul>

          <SubsectionTitle>16.2 User Content License</SubsectionTitle>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Non-exclusive, worldwide, royalty-free license</li>
            <li>Right to use, modify, and distribute user content</li>
            <li>Right to use feedback for service improvement</li>
            <li>User retention of ownership rights</li>
          </ul>
        </section>
      </div>
    </PageContainer>
  );
};

export const CookiePolicy = () => {
  return (
    <PageContainer>
      <PageTitle>Cookie Policy</PageTitle>
      <div>
        <p style={{ marginBottom: '1rem', color: '#4b5563' }}>Last Updated: {new Date().toLocaleDateString()}</p>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>1. Introduction</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            This Cookie Policy explains how Build a Date uses cookies and similar technologies to recognize and track your usage of our Service, and to optimize your experience.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>2. What Are Cookies</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Cookies are small text files stored on your device when you visit our website. They help us provide and improve our Service by:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Remembering your preferences</li>
            <li>Understanding how you use our Service</li>
            <li>Personalizing your experience</li>
            <li>Maintaining your session</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>3. Types of Cookies We Use</SectionTitle>
          
          <SubsectionTitle>3.1 Essential Cookies</SubsectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Required for basic functionality:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Authentication and security</li>
            <li>Account management</li>
            <li>Service functionality</li>
            <li>Session management</li>
          </ul>

          <SubsectionTitle>3.2 Preference Cookies</SubsectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Remember your choices:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Date preferences</li>
            <li>Language settings</li>
            <li>Personalization options</li>
            <li>Interface customization</li>
          </ul>

          <SubsectionTitle>3.3 Analytics Cookies</SubsectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Help us understand usage:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Usage patterns</li>
            <li>Feature popularity</li>
            <li>Performance metrics</li>
            <li>Error tracking</li>
          </ul>

          <SubsectionTitle>3.4 Marketing Cookies</SubsectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Support our marketing efforts:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Advertising effectiveness</li>
            <li>Campaign tracking</li>
            <li>Partner integrations</li>
            <li>Referral tracking</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>4. Third-Party Cookies</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            We use services from these providers:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Google Analytics - Usage analysis</li>
            <li>Stripe - Payment processing</li>
            <li>Social media platforms - Integration</li>
            <li>Marketing partners - Advertising</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>5. Cookie Management</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            You can control cookies through:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Browser settings</li>
            <li>Our cookie preferences center</li>
            <li>Third-party opt-out tools</li>
            <li>Private browsing mode</li>
          </ul>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Note: Blocking essential cookies may impact service functionality.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>6. Updates to Cookie Policy</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            We may update this Cookie Policy as our services evolve. Changes will be posted here with an updated date.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>7. Contact Us</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            For questions about our Cookie Policy, contact us at:
          </p>
          <ul style={{ listStyleType: 'none', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Email: privacy@buildadate.com</li>
            <li>Address: 123 Date Street, San Francisco, CA 94105</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>8. GDPR Cookie Compliance</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            For EU users, we ensure:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Explicit consent before non-essential cookies</li>
            <li>Right to withdraw consent at any time</li>
            <li>Detailed information about each cookie category</li>
            <li>Cookie preference center accessibility</li>
            <li>Regular cookie audit and policy updates</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <SectionTitle>9. Data Storage and Transfer</SectionTitle>
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
            Information about cookie data handling:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Cookie data storage location and duration</li>
            <li>International data transfer safeguards</li>
            <li>Security measures for cookie data</li>
            <li>Third-party data processing agreements</li>
          </ul>
        </section>
      </div>
    </PageContainer>
  );
};

export const HowItWorks = () => {
  return (
    <PageContainer>
      <PageTitle>How It Works</PageTitle>
      {/* Content for How It Works page */}
    </PageContainer>
  );
};

export const ContactUs = () => {
  return (
    <PageContainer>
      <PageTitle>Contact Us</PageTitle>
      {/* Content for Contact Us page */}
    </PageContainer>
  );
};
