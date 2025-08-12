/*
  # Create images table and storage

  1. New Tables
    - `images`
      - `id` (uuid, primary key)
      - `url` (text, not null)
      - `category` (text, not null)
      - `created_at` (timestamp with time zone, default: now())

  2. Storage
    - Create 'images' storage bucket
    - Enable public access for viewing images

  3. Security
    - Enable RLS on `images` table
    - Add policies for authenticated users to manage their images
    - Add storage policies for authenticated uploads and public viewing
*/

-- Create images table
CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Create table policies
CREATE POLICY "Anyone can view images"
  ON images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can upload images"
  ON images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create storage policies
CREATE POLICY "Public viewing of images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete their images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'images');