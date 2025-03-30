
import React from 'react';
import { Download } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center border-b border-black/10 animate-fade-in">
      <div className="flex items-center">
        <Download className="h-6 w-6 mr-2 hover:scale-110 transition-transform duration-300" />
        <h1 className="text-xl font-bold">EasyGrab</h1>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li className="hidden md:block hover:underline transition-all">
            <a href="#how-it-works" className="hover:opacity-70 transition-opacity">How it works</a>
          </li>
          <li className="hidden md:block hover:underline transition-all">
            <a href="#supported-platforms" className="hover:opacity-70 transition-opacity">Platforms</a>
          </li>
          <li className="hover:underline transition-all">
            <a href="#download" className="hover:opacity-70 transition-opacity">Download</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
