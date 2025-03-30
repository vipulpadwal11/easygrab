
import React from 'react';

const SupportedPlatforms = () => {
  const platforms = [
    { name: "YouTube", icon: "📺" },
    { name: "Instagram", icon: "📷" },
    { name: "TikTok", icon: "🎵" },
    { name: "Facebook", icon: "👥" },
    { name: "Twitter", icon: "🐦" },
    { name: "Vimeo", icon: "🎬" }
  ];

  return (
    <section id="supported-platforms" className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Supported Platforms</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms.map((platform, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center p-6 border border-black/10 rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="text-4xl mb-3">{platform.icon}</span>
              <h3 className="font-medium">{platform.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportedPlatforms;
