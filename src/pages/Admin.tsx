import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ImageUpload from '../components/ImageUpload';
import { supabase } from '../lib/supabase';

interface ImageEntry {
  id: string; 
  url: string;
  category: string;
  created_at: string
}

export default function Admin() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState<ImageEntry[]>([]);
  async function handleUploadComplete(imageUrl: string, category: string) {
    const { error, data } = await supabase.from('images').insert([
      { url: imageUrl, category }
    ]);
    
    if (error) {
      console.error("Insert error:", error);
      alert("Insert failed");
    } else {
      console.log("Insert success:", data);
      // Reload images after successful upload
      loadImages();
    }
  }

  async function handleDelete(id: string, url: string){
    //Delete from DB

    const {error} = await supabase.from('images').delete().eq('id', id);

    if (error) {
      alert("Faild to delete image");
      return;
    }

    //Delete from storage
    const filename = url.split('/').pop(); //assumes url ends with filename
    if (filename) {
      await supabase.storage.from('images').remove([filename]);
    }

    loadImages(); //will reload the images
  }
  
  async function loadImages() {
    const {data, error} = await supabase
      .from('images')
      .select("*")
      .order('created_at', {ascending: false});

      if(!error) setImages(data);
  }

  useEffect(() => {
    loadImages();
  },[])

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            Sign Out
          </button>
        </div>
  
        <ImageUpload onUploadComplete={handleUploadComplete} />
  
        {/* 👇 Add this grid block before the divs close */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {(images || []).map((img) => (
            <div key={img.id} className="relative">
              <img src={img.url} alt={img.category} className="rounded-lg w-full" />
              <button
                onClick={() => handleDelete(img.id, img.url)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}