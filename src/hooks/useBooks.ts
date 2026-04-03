import { useCallback, useEffect, useMemo, useState } from 'react';
import { API_BASE_URL } from '../api/config';
import { getErrorMessage } from '../utils/errors';
import type { Book } from '../types';

type TokenProvider = () => string | null;

type BooksState = {
  books: Book[];
  totalBooks: number;
  booksLoading: boolean;
  mutating: boolean;
  error: string | null;
  addBook: (title: string) => Promise<boolean>;
  deleteBook: (bookId: Book['_id']) => Promise<void>;
};

export const useBooks = (
  token: string | null,
  getTokenOrRedirect: TokenProvider,
  onUnauthorized: () => void,
): BooksState => {
  const [books, setBooks] = useState<Book[]>([]);
  const [booksLoading, setBooksLoading] = useState(false);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalBooks = useMemo(() => books.length, [books]);

  const fetchBooks = useCallback(async () => {
    const storedToken = getTokenOrRedirect();
    if (!storedToken) {
      return;
    }
    setBooksLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/books`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          onUnauthorized();
          return;
        }
        throw new Error('Failed to load books.');
      }
      const data = await response.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load books.'));
    } finally {
      setBooksLoading(false);
    }
  }, [getTokenOrRedirect, onUnauthorized]);

  useEffect(() => {
    if (!token) {
      setBooks([]);
      setError(null);
      setBooksLoading(false);
      setMutating(false);
      return;
    }
    void fetchBooks();
  }, [token, fetchBooks]);

  const addBook = useCallback(
    async (title: string) => {
      const storedToken = getTokenOrRedirect();
      if (!storedToken) {
        return false;
      }
      setMutating(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/books`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });
        if (!response.ok) {
          if (response.status === 401) {
            onUnauthorized();
            return false;
          }
          throw new Error('Failed to add book.');
        }
        const created = await response.json();
        const nextBook: Book = {
          _id: created?.id ?? created?._id ?? String(Date.now()),
          title: created?.title ?? title,
        };
        setBooks((prev) => [...prev, nextBook]);
        window.alert('Book added.');
        return true;
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to add book.'));
        return false;
      } finally {
        setMutating(false);
      }
    },
    [getTokenOrRedirect, onUnauthorized],
  );

  const deleteBook = useCallback(
    async (bookId: Book['_id']) => {
      const storedToken = getTokenOrRedirect();
      if (!storedToken) {
        return;
      }
      setMutating(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            onUnauthorized();
            return;
          }
          throw new Error('Failed to delete book.');
        }
        setBooks((prev) => prev.filter((book) => book._id !== bookId));
        window.alert('Book removed.');
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to delete book.'));
      } finally {
        setMutating(false);
      }
    },
    [getTokenOrRedirect, onUnauthorized],
  );

  return {
    books,
    totalBooks,
    booksLoading,
    mutating,
    error,
    addBook,
    deleteBook,
  };
};
