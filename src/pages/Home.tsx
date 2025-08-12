import React, { useState, useEffect } from 'react';
import ImageCarousel from '../components/ImageCarousel';
import MasonryGrid from '../components/MasonryGrid';
import SocialComments from '../components/SocialComments';
import ContactSection from '../components/ContactSection';
import { supabase } from '../lib/supabase';

interface ImageEntry {
  id: string;
  url: string;
  category: string;
  created_at: string;
}

export default function Home() {
  const [featuredImages, setFeaturedImages] = useState<ImageEntry[]>([]);

  useEffect(() => {
    async function loadFeatured() {
      const { data } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);

      if (data) setFeaturedImages(data);
    }

    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#93c5fd] via-white to-[#fca5a5] px-4 py-20">
      <div className="max-w-6xl mx-auto bg-white/30 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 transition duration-300">
  
        {/* Hero / Carousel Section */}
        <div className="relative mb-16">
          <ImageCarousel images={featuredImages} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <h1 className="text-5xl md:text-7xl font-light text-white drop-shadow-lg mb-4">AddisLifeInPixels</h1>
            <p className="text-xl text-gray-200 font-light drop-shadow">Capturing moments, creating memories</p>
          </div>
        </div>
  
        {/* Featured Gallery */}
        <MasonryGrid images={featuredImages} />
  
        {/* Comments & Contact */}
        <SocialComments />
        <ContactSection />
  
      </div>
    </div>
  );
  
  
}
