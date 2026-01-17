import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import USPSection from '@/components/home/USPSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryGrid from '@/components/home/CategoryGrid';
import NewArrivals from '@/components/home/NewArrivals';
import PromoSection from '@/components/home/PromoSection';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <USPSection />
      <FeaturedProducts />
      <CategoryGrid />
      <NewArrivals />
      <PromoSection />
    </Layout>
  );
};

export default Index;
