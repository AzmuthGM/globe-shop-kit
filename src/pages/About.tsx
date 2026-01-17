import React from 'react';
import Layout from '@/components/layout/Layout';
import { Globe, Heart, Leaf, Award } from 'lucide-react';

const values = [
  {
    icon: Globe,
    title: 'Global Curation',
    description: 'We source products from artisans and manufacturers worldwide, bringing you unique items you won\'t find elsewhere.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We\'re here to help 24/7 and offer hassle-free returns on all orders.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'We\'re committed to reducing our environmental impact through eco-friendly packaging and responsible sourcing.',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Every product goes through rigorous quality checks before reaching you. We stand behind everything we sell.',
  },
];

const About: React.FC = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-secondary overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Curating the Extraordinary for Everyday Life
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2020, Azm Store was born from a simple belief: everyone deserves access to 
              premium quality products that enhance their daily life. We scour the globe to bring you 
              the best in electronics, home goods, accessories, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                alt="Our team"
                className="rounded-2xl"
              />
            </div>
            <div>
              <h2 className="section-heading">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  What started as a small online shop has grown into a trusted destination for 
                  over 50,000 customers across the US and Europe. Our journey began when our 
                  founders, frustrated with the lack of quality options in mainstream retail, 
                  decided to create something different.
                </p>
                <p>
                  Today, we partner with carefully vetted suppliers and brands to offer a 
                  curated selection of products that meet our high standards for quality, 
                  design, and value. Every item in our catalog is chosen with care and 
                  tested to ensure it lives up to our promise.
                </p>
                <p>
                  We're more than just a store—we're a community of people who appreciate 
                  the finer things in life without the luxury price tag.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Values</h2>
            <p className="section-subheading mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="bg-card p-6 rounded-xl text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl lg:text-5xl font-bold mb-2">50K+</p>
              <p className="text-primary-foreground/70">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold mb-2">1000+</p>
              <p className="text-primary-foreground/70">Products</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold mb-2">25+</p>
              <p className="text-primary-foreground/70">Countries Served</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold mb-2">4.9★</p>
              <p className="text-primary-foreground/70">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
