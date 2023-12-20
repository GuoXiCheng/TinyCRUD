import { BaseModel } from "../../storage-lib";

export interface BookModel extends BaseModel {
    book_name: string;
    book_author: string;
    book_price: number;
}