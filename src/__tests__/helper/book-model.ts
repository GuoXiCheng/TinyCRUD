import { BaseModel } from '../../repository-lib/';
export interface BookModel extends BaseModel {
    book_name: string;
    book_author: string;
    book_price: number;
}