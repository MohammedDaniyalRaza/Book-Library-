import { NextResponse } from 'next/server';

// In-memory storage for books (in a real app, this would be a database)
let books = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    description: 'A story of decadence and excess.',
    year: 1925,
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    description: 'A story of racial injustice and the loss of innocence.',
    year: 1960,
  },
];

// GET all books
export async function GET() {
  return NextResponse.json(books);
}

// POST new book
export async function POST(request: Request) {
  const book = await request.json();
  const newBook = {
    ...book,
    id: Date.now().toString(),
  };
  books.push(newBook);
  return NextResponse.json(newBook, { status: 201 });
}

// PUT update book
export async function PUT(request: Request) {
  const book = await request.json();
  const index = books.findIndex((b) => b.id === book.id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
  
  books[index] = book;
  return NextResponse.json(book);
}

// DELETE book
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  
  const initialLength = books.length;
  books = books.filter((book) => book.id !== id);
  
  if (books.length === initialLength) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
  
  return NextResponse.json({ message: 'Book deleted successfully' });
}