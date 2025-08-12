import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const categories = ['All', 'Portrait', 'Street', 'Nature', 'Architecture'];

interface Image {
  url: string;
  category: string;
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data: images, error } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (images) setImages(images);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-rose-100 px-4 py-20">
      <div className="max-w-6xl mx-auto bg-white/30 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10">
        {/* Category Filter */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-12 shadow-lg">
          <h2 className="text-2xl font-light text-gray-800 mb-6 text-center">Explore My Work</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-black text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Image Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {filteredImages.map((image, index) => (
            <div key={index} className="mb-4 break-inside-avoid">
              <img
                src={image.url}
                alt={`Gallery image ${index + 1}`}
                className="w-full rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}