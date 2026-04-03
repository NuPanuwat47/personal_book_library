import type { Book } from "../types";

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
  return (
    <section className="panel">
      <h2>Books</h2>
      <p className="muted">Total: {totalBooks}</p>
      {isLoading && books.length === 0 ? <p>Loading...</p> : null}
      {!isLoading && books.length === 0 ? <p>No books yet.</p> : null}
      <ul className="list">
        {books.map((book) => (
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
