
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Download Media from Any Platform</h1>
      <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
        EasyGrab simplifies downloading images, videos, and audio from platforms like YouTube, Instagram, TikTok, and more. Just paste the URL and download!
      </p>
      <a 
        href="#download" 
        className="flex items-center space-x-2 btn-primary group"
      >
        <span>Start Downloading</span>
        <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
      </a>
    </section>
  );
};

export default Hero;
