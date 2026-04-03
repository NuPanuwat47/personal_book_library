import { useMemo, useState } from 'react';
import type { Book } from '../types';

type BookListProps = {
  books: Book[];
  totalBooks: number;
  onDeleteBook: (bookId: Book["_id"]) => Promise<void>;
  isLoading: boolean;
};

function BookList({
  books,
  totalBooks,
  onDeleteBook,
  isLoading,
}: BookListProps) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const filteredBooks = useMemo(() => {
    if (!normalizedQuery) {
      return books;
    }
    return books.filter((book) =>
      book.title.toLowerCase().includes(normalizedQuery),
    );
  }, [books, normalizedQuery]);

  const showLoading = isLoading && books.length === 0;
  const showEmpty = !isLoading && books.length === 0;
  const showNoResults =
    !isLoading && books.length > 0 && filteredBooks.length === 0;

  return (
    <section className="panel">
      <h2>Books</h2>
      <p className="muted">Total: {totalBooks}</p>
      <label className="field">
        Search
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title"
        />
      </label>
      {showLoading ? <p>Loading...</p> : null}
      {showEmpty ? <p>No books yet.</p> : null}
      {showNoResults ? <p>No results.</p> : null}
      <ul className="list">
        {filteredBooks.map((book) => (
          <li key={String(book._id)} className="book-row">
            <div>
              <strong>{book.title}</strong>
            </div>
            <button type="button" onClick={() => void onDeleteBook(book._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BookList;
