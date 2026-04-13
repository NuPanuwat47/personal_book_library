import { Router } from "express";
import { createBook, getBookById, getBooks, updateBook, deleteBook } from "./book.controller.js";
import { auth } from "../middleware/auth.js";
const router = Router();
router.post('/api/books', auth, createBook);
router.get('/api/books', getBooks);
router.get('/api/books/:id', getBookById);
router.put('/api/books/:id', auth, updateBook);
router.delete('/api/books/:id', auth, deleteBook);
export default router;
//# sourceMappingURL=book.route.js.map