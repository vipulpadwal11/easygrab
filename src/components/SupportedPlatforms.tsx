
import React from 'react';

const SupportedPlatforms = () => {
  const platforms = [
    { 
      name: "YouTube", 
      logo: "https://www.youtube.com/s/desktop/a2292057/img/favicon_144x144.png",
      logoAlt: "YouTube logo" 
    },
    { 
      name: "Instagram", 
      logo: "https://static.cdninstagram.com/rsrc.php/v3/yt/r/30PrGfR3xhB.png",
      logoAlt: "Instagram logo" 
    },
    { 
      name: "TikTok", 
      logo: "https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web-common-sg/mtact/static/images/logo_144c91a.png",
      logoAlt: "TikTok logo" 
    },
    { 
      name: "Facebook", 
      logo: "https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico",
      logoAlt: "Facebook logo" 
    },
    { 
      name: "Twitter", 
      logo: "https://abs.twimg.com/responsive-web/client-web/icon-default.ee534d6a.png",
      logoAlt: "Twitter/X logo" 
    },
    { 
      name: "Vimeo", 
      logo: "https://i.vimeocdn.com/favicon/main-touch_180",
      logoAlt: "Vimeo logo" 
    }
  ];

  return (
    <section id="supported-platforms" className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Supported Platforms</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms.map((platform, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center p-6 border border-black/10 rounded-lg hover:shadow-md transition-all hover:scale-105 duration-300"
            >
              <img 
                src={platform.logo} 
                alt={platform.logoAlt} 
                className="w-12 h-12 mb-3 object-contain"
              />
              <h3 className="font-medium">{platform.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportedPlatforms;
