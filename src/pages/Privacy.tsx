import React from 'react';
import Layout from '@/components/layout/Layout';

const Privacy: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="section-heading mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

          <div className="prose prose-neutral max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Azm Store ("we," "our," or "us") respects your privacy and is committed to protecting 
                your personal data. This privacy policy explains how we collect, use, disclose, and 
                safeguard your information when you visit our website or make a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Personal identification (name, email address, phone number)</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (processed securely via Stripe/PayPal)</li>
                <li>Order history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate about orders, products, and promotional offers</li>
                <li>Provide customer support</li>
                <li>Improve our website and services</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information. We may share your data with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Service providers (shipping carriers, payment processors)</li>
                <li>Analytics partners to improve our services</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information, 
                including encryption of sensitive data, secure servers, and regular security audits. 
                Payment processing is handled by PCI-compliant providers (Stripe and PayPal).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Cookies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your browsing experience, 
                analyze site traffic, and personalize content. You can control cookie settings 
                through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Your Rights</h2>
              <p className="text-muted-foreground mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our website is not intended for children under 16. We do not knowingly collect 
                personal information from children. If you believe we have collected such data, 
                please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this privacy policy or our data practices, please contact us at:
              </p>
              <p className="text-muted-foreground mt-4">
                Email: privacy@azmstore.com<br />
                Address: 123 Commerce Street, Suite 100, New York, NY 10001
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
