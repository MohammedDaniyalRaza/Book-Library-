import { Book } from '@/types/book';

const STORAGE_KEY = 'books';

export function getBooks(): Book[] {
  if (typeof window === 'undefined') return [];
  const books = localStorage.getItem(STORAGE_KEY);
  return books ? JSON.parse(books) : [];
}

export function saveBooks(books: Book[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}