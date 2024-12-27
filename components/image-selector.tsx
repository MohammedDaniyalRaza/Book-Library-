'use client';

import { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { FileUpload } from './file-upload';

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
];

interface ImageSelectorProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageSelector({ value, onChange }: ImageSelectorProps) {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter image URL"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowGallery(!showGallery)}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Gallery
        </Button>
      </div>

      <FileUpload onFileSelect={onChange} />
      
      {showGallery && (
        <div className="grid grid-cols-2 gap-4">
          {DEFAULT_IMAGES.map((url) => (
            <button
              key={url}
              type="button"
              onClick={() => {
                onChange(url);
                setShowGallery(false);
              }}
              className="relative aspect-[4/3] overflow-hidden rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <img
                src={url}
                alt="Book cover"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}