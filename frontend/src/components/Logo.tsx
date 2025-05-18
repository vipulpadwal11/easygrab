
import React from 'react';
import { Download } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="bg-black rounded-md p-1.5">
        <Download className="h-4 w-4 text-pearl" />
      </div>
      <span className="font-bold text-xl">EasyGrab</span>
    </div>
  );
};

export default Logo;
