import { useEffect, useRef, useState } from "react";

type BookFormProps = {
  onAddBook: (title: string) => Promise<boolean>;
  isLoading: boolean;
};

function BookForm({ onAddBook, isLoading }: BookFormProps) {
  const [title, setTitle] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }
    const success = await onAddBook(trimmedTitle);
    if (success) {
      setTitle("");
      titleInputRef.current?.focus();
    }
  };

  return (
    <section className="panel">
      <h2>Add Book</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          Title
          <input
            ref={titleInputRef}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Book title"
          />
        </label>
        <div className="actions">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookForm;
