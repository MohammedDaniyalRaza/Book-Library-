'use client';

import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-6 text-center border-t">
      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
        <span>Powered by</span>
        <Heart className="h-4 w-4 text-red-500 animate-pulse" />
        <a 
          href="https://sinceauraagency.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-semibold hover:text-primary transition-colors"
        >
          Since Aura Agency
        </a>
        <span>© {currentYear}</span>
      </div>
    </footer>
  );
}