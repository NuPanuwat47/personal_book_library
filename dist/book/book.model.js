import { Schema, model, Document } from "mongoose";
const bookSchema = new Schema({
    title: { type: String, required: true },
}, { timestamps: true });
export const Book = model('Book', bookSchema);
//# sourceMappingURL=book.model.js.map