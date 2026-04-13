import { Schema, model, Document } from "mongoose";
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });
export const User = model('User', userSchema);
//# sourceMappingURL=user.model.js.map