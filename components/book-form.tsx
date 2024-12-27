'use client';

import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageSelector } from './image-selector';
import { useEffect, useState } from 'react';

interface BookFormProps {
  book: Book | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function BookForm({ book, isOpen, onOpenChange, onSubmit }: BookFormProps) {
  const [cover, setCover] = useState(book?.cover || '');

  useEffect(() => {
    if (isOpen) {
      setCover(book?.cover || '');
    }
  }, [isOpen, book]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              {book?.id ? 'Edit Book' : 'Add New Book'}
            </DialogTitle>
            <DialogDescription>
              Fill in the book details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={book?.title}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                defaultValue={book?.author}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cover">Cover Image</Label>
              <ImageSelector
                value={cover}
                onChange={(url) => setCover(url)}
              />
              <input type="hidden" name="cover" value={cover} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                defaultValue={book?.year}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={book?.description}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {book?.id ? (book.updatedAt ? 'Update' : 'Save') : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}