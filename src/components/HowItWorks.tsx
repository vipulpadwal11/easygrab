
import React from 'react';
import { Link, Play, Download } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Link className="h-10 w-10" />,
      title: "Paste URL",
      description: "Copy the URL of the media you want to download and paste it into the input field."
    },
    {
      icon: <Play className="h-10 w-10" />,
      title: "Preview Content",
      description: "Preview the media before downloading to make sure it's what you want."
    },
    {
      icon: <Download className="h-10 w-10" />,
      title: "Download Media",
      description: "Choose your preferred format and quality, then download your media with one click."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-4 md:px-8 bg-black text-pearl">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 border border-pearl/20 rounded-lg">
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
