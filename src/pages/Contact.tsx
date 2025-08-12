import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      
      <div className="relative z-20 flex items-center justify-center min-h-screen py-20">
        <div className="max-w-md w-full mx-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8">
          <h2 className="text-3xl font-light text-white mb-8 text-center">Get in Touch</h2>
          
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            
            <div>
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}