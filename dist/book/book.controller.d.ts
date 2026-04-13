import type { Request, Response } from 'express';
export declare const createBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getBooks: (req: Request, res: Response) => Promise<void>;
export declare const getBookById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=book.controller.d.ts.map