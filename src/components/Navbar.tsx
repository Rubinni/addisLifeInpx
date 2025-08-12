import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg rounded-full px-8 py-3 backdrop-blur-lg border border-gray-200 max-w-fit mx-auto">
      <ul className="flex space-x-8 items-center justify-center text-gray-800 font-medium text-sm">
        <li><a href="/home" className="hover:text-black transition">Home</a></li>
        <li><a href="/gallery" className="hover:text-black transition">Gallery</a></li>
        <li><a href="/contact" className="hover:text-black transition">Contact</a></li>
      </ul>
    </nav>
  );
}
