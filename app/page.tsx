'use client';

import { useState, useEffect, useMemo } from 'react';
import { Library, Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Book } from '@/types/book';
import { BookCard } from '@/components/book-card';
import { BookForm } from '@/components/book-form';
import { SearchBar } from '@/components/search-bar';
import { getBooks, saveBooks } from '@/lib/storage';

const emptyBook: Book = {
  id: '',
  title: '',
  author: '',
  cover: '',
  description: '',
  year: new Date().getFullYear(),
  createdAt: '',
  updatedAt: null,
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadedBooks = getBooks();
    setBooks(loadedBooks);
    setLoading(false);
  }, []);

  const filteredBooks = useMemo(() => {
    const searchTerm = search.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm)
    );
  }, [books, search]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const now = new Date().toISOString();
    
    const bookData: Book = {
      ...selectedBook,
      id: selectedBook?.id || crypto.randomUUID(),
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      cover: formData.get('cover') as string,
      description: formData.get('description') as string,
      year: parseInt(formData.get('year') as string),
      createdAt: selectedBook?.createdAt || now,
      updatedAt: selectedBook?.id ? now : null,
    };

    const newBooks = selectedBook?.id
      ? books.map((book) => (book.id === bookData.id ? bookData : book))
      : [...books, bookData];

    setBooks(newBooks);
    saveBooks(newBooks);
    toast.success(`Book ${selectedBook?.id ? 'updated' : 'added'} successfully`);
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    const newBooks = books.filter((book) => book.id !== id);
    setBooks(newBooks);
    saveBooks(newBooks);
    toast.success('Book deleted successfully');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Library className="h-8 w-8" />
            <h1 className="text-2xl sm:text-3xl font-bold">Dani Library</h1>
          </div>
          <Button
            onClick={() => {
              setSelectedBook(emptyBook);
              setIsOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Book
          </Button>
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {books.length === 0
              ? "No books added yet. Click 'Add Book' to get started!"
              : 'No books found matching your search.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={(book) => {
                setSelectedBook(book);
                setIsOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <BookForm
        book={selectedBook}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
      />
    </div>
  );
}