import { Router } from "express";
import { createBook, getBooks, deleteBook } from "./book.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post('/api/books', auth, createBook);
router.get('/api/books', getBooks);
router.delete('/api/books/:id', auth, deleteBook);

export default router;