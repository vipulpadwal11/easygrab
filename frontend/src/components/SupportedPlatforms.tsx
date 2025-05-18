
import React from 'react';
import { Youtube, Instagram, Facebook, Twitter } from 'lucide-react';
import { Reddit } from 'lucide-react';

const SupportedPlatforms = () => {
  const platforms = [
    { 
      name: "YouTube", 
      icon: <span className="text-red-600 mr-2"><Youtube size={20} /></span>
    },
    { 
      name: "Instagram", 
      icon: <span className="text-pink-500 mr-2"><Instagram size={20} /></span>
    },
    { 
      name: "TikTok", 
      icon: <span className="mr-2">♪</span>
    },
    { 
      name: "Facebook", 
      icon: <span className="text-blue-600 mr-2"><Facebook size={20} /></span>
    },
    { 
      name: "Twitter", 
      icon: <span className="text-blue-400 mr-2"><Twitter size={20} /></span>
    },
    { 
      name: "Pinterest", 
      icon: <span className="text-red-500 mr-2">P</span>
    },
    { 
      name: "Vimeo", 
      icon: <span className="text-cyan-600 mr-2">V</span>
    },
    { 
      name: "Reddit", 
      icon: <span className="text-orange-500 mr-2"><Reddit size={20} /></span>
    }
  ];

  return (
    <section id="supported-platforms" className="py-16 px-4 md:px-8 bg-pearl/50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Supported Platforms</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-6 bg-white border border-black/10 rounded-lg hover:shadow-md transition-all hover:scale-105 duration-300"
            >
              {platform.icon}
              <h3 className="font-medium">{platform.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportedPlatforms;
