export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  year: number;
  createdAt: string;
  updatedAt: string | null;
}