'use client';

import { Upload } from 'lucide-react';
import { Button } from './ui/button';

interface FileUploadProps {
  onFileSelect: (url: string) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onFileSelect(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Upload image"
      />
      <Button type="button" variant="outline" className="w-full">
        <Upload className="h-4 w-4 mr-2" />
        Choose from device
      </Button>
    </div>
  );
}