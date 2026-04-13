import { Document } from "mongoose";
export interface IBook extends Document {
    title: string;
}
export declare const Book: import("mongoose").Model<IBook, {}, {}, {}, Document<unknown, {}, IBook, {}, import("mongoose").DefaultSchemaOptions> & IBook & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IBook>;
//# sourceMappingURL=book.model.d.ts.map