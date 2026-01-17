import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, Globe, RotateCcw } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const shippingZones = [
  {
    region: 'United States',
    standard: { time: '5-7 business days', cost: '$9.99' },
    express: { time: '2-3 business days', cost: '$19.99' },
  },
  {
    region: 'Canada',
    standard: { time: '7-10 business days', cost: '$14.99' },
    express: { time: '3-5 business days', cost: '$24.99' },
  },
  {
    region: 'United Kingdom',
    standard: { time: '7-10 business days', cost: '$14.99' },
    express: { time: '4-6 business days', cost: '$29.99' },
  },
  {
    region: 'European Union',
    standard: { time: '8-12 business days', cost: '$16.99' },
    express: { time: '5-7 business days', cost: '$34.99' },
  },
];

const Shipping: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-heading text-center mb-4">Shipping & Returns</h1>
          <p className="section-subheading text-center mx-auto mb-12">
            Fast, reliable shipping to your doorstep with hassle-free returns.
          </p>

          {/* Highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-secondary rounded-xl">
              <Truck className="h-8 w-8 mx-auto mb-3 text-foreground" />
              <h3 className="font-semibold mb-1">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders over $75</p>
            </div>
            <div className="text-center p-6 bg-secondary rounded-xl">
              <Clock className="h-8 w-8 mx-auto mb-3 text-foreground" />
              <h3 className="font-semibold mb-1">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">5-7 business days</p>
            </div>
            <div className="text-center p-6 bg-secondary rounded-xl">
              <Globe className="h-8 w-8 mx-auto mb-3 text-foreground" />
              <h3 className="font-semibold mb-1">Worldwide</h3>
              <p className="text-sm text-muted-foreground">US & EU shipping</p>
            </div>
            <div className="text-center p-6 bg-secondary rounded-xl">
              <RotateCcw className="h-8 w-8 mx-auto mb-3 text-foreground" />
              <h3 className="font-semibold mb-1">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">30-day policy</p>
            </div>
          </div>

          {/* Shipping Rates */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Shipping Rates & Delivery Times</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary">
                    <th className="text-left p-4 font-semibold">Region</th>
                    <th className="text-left p-4 font-semibold">Standard Shipping</th>
                    <th className="text-left p-4 font-semibold">Express Shipping</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingZones.map((zone, index) => (
                    <tr key={zone.region} className={index % 2 === 0 ? '' : 'bg-secondary/50'}>
                      <td className="p-4 font-medium">{zone.region}</td>
                      <td className="p-4">
                        <span className="block">{zone.standard.time}</span>
                        <span className="text-sm text-muted-foreground">{zone.standard.cost}</span>
                      </td>
                      <td className="p-4">
                        <span className="block">{zone.express.time}</span>
                        <span className="text-sm text-muted-foreground">{zone.express.cost}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              * Free standard shipping on orders over $75 USD to all destinations.
            </p>
          </section>

          {/* Returns Policy */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Returns Policy</h2>
            <div className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground mb-4">
                We want you to be completely satisfied with your purchase. If you're not happy with 
                your order, we offer a hassle-free 30-day return policy.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Eligibility</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Items must be returned within 30 days of delivery</li>
                <li>Products must be unused and in original packaging</li>
                <li>All tags and labels must be attached</li>
                <li>Items must be in resalable condition</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Non-Returnable Items</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Personal care items that have been opened</li>
                <li>Intimate apparel and swimwear</li>
                <li>Customized or personalized products</li>
                <li>Items marked as final sale</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">How to Return</h3>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                <li>Contact our customer service team at support@azmstore.com</li>
                <li>Provide your order number and reason for return</li>
                <li>Receive a prepaid return shipping label via email</li>
                <li>Package items securely and drop off at any shipping location</li>
                <li>Refund processed within 3-5 business days of receipt</li>
              </ol>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center p-8 bg-secondary rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is available to assist with any shipping or returns questions.
            </p>
            <Button asChild className="btn-premium text-primary-foreground">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
