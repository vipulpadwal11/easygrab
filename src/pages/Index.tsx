
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import SupportedPlatforms from '@/components/SupportedPlatforms';
import MediaDownloader from '@/components/MediaDownloader';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <SupportedPlatforms />
        <MediaDownloader />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
