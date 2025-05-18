
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MediaDownloader from '@/components/MediaDownloader';
import SupportedPlatforms from '@/components/SupportedPlatforms';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import DonationButton from '@/components/DonationButton';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <MediaDownloader />
        <SupportedPlatforms />
        <HowItWorks />
      </main>
      <DonationButton />
      <Footer />
    </div>
  );
};

export default Index;
