import { Book } from './book.model.js';
export const createBook = async (req, res) => {
    try {
        const { title } = req.body;
        if (typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const newBook = new Book({ title });
        await newBook.save();
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating book', error });
    }
};
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).lean();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
};
export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id).lean();
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching book', error });
    }
};
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        if (typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const updatedBook = await Book.findByIdAndUpdate(id, { title: title.trim() }, { new: true, runValidators: true }).lean();
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
};
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};
//# sourceMappingURL=book.controller.js.map