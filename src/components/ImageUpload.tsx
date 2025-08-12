import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import imageCompression from 'browser-image-compression';

interface ImageUploadProps {
  onUploadComplete: (imageUrl: string, category: string) => void;
}

export default function ImageUpload({ onUploadComplete }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('Nature'); //will set the category to a default
  const [fileSizeMB, setFileSizeMB] = useState<string | null>(null); 

  

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {

    supabase.auth.getSession().then(console.log); //testing purposes 

    try {
      setUploading(true);

      const originalFile = event.target.files?.[0];
      if (!originalFile) return;
      
      // Log original file size
      const originalSize = (originalFile.size / (1024 * 1024)).toFixed(2);
      console.log(`Original file size: ${originalSize} MB`);
      
      const compressedFile = await imageCompression(originalFile, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      
      const compressedSize = (compressedFile.size / (1024 * 1024)).toFixed(2);
      console.log(`Compressed file size: ${compressedSize} MB`);
      setFileSizeMB(compressedSize);
      
      const fileExt = compressedFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      console.log("Uploading file:", compressedFile.name, compressedFile.type, compressedFile.size); //console log
      console.log("File path:", filePath);

      //Image Upload Handler 
      console.log("Starting Supabase upload...");
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, compressedFile, {
          cacheControl: '3600',
          upsert: false, //if file duplicate will fail
          contentType: compressedFile.type,
        });



      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl, category);
    } catch (error) {
      console.error('Error uploading image:', error);
      
      // More specific error messages
      if (error instanceof Error) {
        if (error.message.includes('JWT')) {
          alert('Authentication error: Please log in again');
        } else if (error.message.includes('bucket')) {
          alert('Storage bucket error: Please check Supabase configuration');
        } else if (error.message.includes('permission')) {
          alert('Permission denied: Check your user role');
        } else {
          alert(`Upload failed: ${error.message}`);
        }
      } else {
        alert('Unknown error occurred during upload');
      }
    } finally {
      setUploading(false);
    }
    
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
      <h3 className="text-xl font-light text-gray-800 mb-4">Upload New Image</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="Nature">Nature</option>
            <option value="Portrait">Portrait</option>
            <option value="Street">Street</option>
            <option value="Architecture">Architecture</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                {uploading ? 'Uploading...' : 'Click or drag and drop to upload'}
              </p>
              {fileSizeMB && (
  <p className="text-sm text-gray-600 mt-2">
    Selected file size: {fileSizeMB} MB
  </p>
)}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}