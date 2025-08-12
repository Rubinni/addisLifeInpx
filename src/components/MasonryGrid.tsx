import React, { useState } from 'react';

interface ImageEntry {
  id: string;
  url: string;
  category: string;
  created_at: string;
}

export default function MasonryGrid({ images }: { images: ImageEntry[] }) {
  const [selectedImage, setSelectedImage] = useState<ImageEntry | null>(null);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
      <h2 className="text-4xl font-display font-bold text-center text-gray-900 mb-8">
          Featured Photos
        </h2>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-lg relative group break-inside-avoid cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.url}
                alt={img.category}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105 rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full px-4 relative">
            <img
              src={selectedImage.url}
              alt={selectedImage.category}
              className="w-full h-auto rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full px-3 py-1"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
