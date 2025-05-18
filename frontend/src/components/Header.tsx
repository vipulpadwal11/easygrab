
import React from 'react';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center border-b border-black/10 animate-fade-in">
      <Logo />
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
