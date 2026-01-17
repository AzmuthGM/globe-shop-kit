import React from 'react';
import Layout from '@/components/layout/Layout';

const Terms: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="section-heading mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

          <div className="prose prose-neutral max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using the Azm Store website, you agree to be bound by these Terms of 
                Service and all applicable laws and regulations. If you do not agree with any of these 
                terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
              <p className="text-muted-foreground mb-4">
                Permission is granted to temporarily access and use the materials on Azm Store's 
                website for personal, non-commercial transactional use only. This license does not include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Modifying or copying the materials</li>
                <li>Using materials for commercial purposes or public display</li>
                <li>Attempting to reverse engineer any software</li>
                <li>Removing any copyright or proprietary notations</li>
                <li>Transferring the materials to another person</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Product Information</h2>
              <p className="text-muted-foreground">
                We strive to provide accurate product descriptions, images, and pricing. However, 
                we do not warrant that product descriptions or other content is accurate, complete, 
                or current. We reserve the right to correct any errors and to change or update 
                information without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Pricing and Payment</h2>
              <p className="text-muted-foreground mb-4">
                All prices are listed in USD unless otherwise specified. We accept payment via 
                credit/debit cards (through Stripe) and PayPal. By providing payment information, you represent that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You are authorized to use the payment method</li>
                <li>The information you provide is accurate and complete</li>
                <li>You will pay all charges at the prices in effect at the time of purchase</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Order Acceptance</h2>
              <p className="text-muted-foreground">
                Your receipt of an order confirmation does not constitute our acceptance of your order. 
                We reserve the right to limit or cancel quantities, refuse any order, or cancel orders 
                in our sole discretion. If we cancel your order after payment has been made, we will 
                issue a full refund.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Shipping and Delivery</h2>
              <p className="text-muted-foreground">
                Delivery times are estimates and not guaranteed. We are not liable for any delays 
                in shipments. Risk of loss and title for items pass to you upon delivery to the carrier.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Returns and Refunds</h2>
              <p className="text-muted-foreground">
                Our return policy allows for returns within 30 days of delivery. Items must be unused 
                and in original packaging. Certain items are non-returnable. Please refer to our 
                Shipping & Returns page for complete details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on this website, including text, graphics, logos, images, and software, 
                is the property of Azm Store or its content suppliers and is protected by international 
                copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall Azm Store, its directors, employees, partners, agents, or suppliers 
                be liable for any indirect, incidental, special, consequential, or punitive damages 
                arising out of or relating to your use of the website or purchase of products.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">10. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold Azm Store harmless from any claim or demand, including 
                reasonable attorneys' fees, made by any third party due to or arising out of your 
                breach of these Terms of Service or your violation of any law or rights of a third party.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with the laws of the 
                State of New York, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting to the website. Your continued use of the site constitutes 
                acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">13. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-muted-foreground mt-4">
                Email: legal@azmstore.com<br />
                Address: 123 Commerce Street, Suite 100, New York, NY 10001
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
