
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 md:px-8 mt-auto border-t border-black/10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} EasyGrab</p>
        </div>
        <div>
          <ul className="flex space-x-4 text-sm">
            <li className="hover:underline">
              <a href="#">Terms</a>
            </li>
            <li className="hover:underline">
              <a href="#">Privacy</a>
            </li>
            <li className="hover:underline">
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
