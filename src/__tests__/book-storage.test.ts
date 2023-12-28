import dayjs from "dayjs";
import { BookModel } from "./helper/book-model";
import { Book } from "./helper/book-storage";
import { PlainObject } from "../storage-lib";

describe('Test Book Storage', () => {

    const bookList: PlainObject<BookModel>[] = [
        {
            book_name: 'test-book-1',
            book_author: 'test-author-1',
            book_price: 100
        },
        {
            book_name: 'test-book-2',
            book_author: 'test-author-2',
            book_price: 200
        },
        {
            book_name: 'test-book-3',
            book_author: 'test-author-3',
            book_price: 300
        },
        {
            book_name: 'test-book-4',
            book_author: 'test-author-4',
            book_price: 400
        },
        {
            book_name: 'test-book-5',
            book_author: 'test-author-5',
            book_price: 500
        },
        {
            book_name: 'test-book-6',
            book_author: 'test-author-6',
            book_price: 600
        },
        {
            book_name: 'test-book-7',
            book_author: 'test-author-7',
            book_price: 700
        },
        {
            book_name: 'test-book-8',
            book_author: 'test-author-8',
            book_price: 800
        },
        {
            book_name: 'test-book-9',
            book_author: 'test-author-9',
            book_price: 900
        },
        {
            book_name: 'test-book-10',
            book_author: 'test-author-10',
            book_price: 1000
        }
    ];

    beforeAll(async () => {
        await Book.deleteAll();
    });

    test('Test find Book', async () => {
        const detail = await Book.find();
        expect(detail.length).toEqual(0);
    });

    test('Test create & findById Book', async () => {
        await Book.create({
            book_name: 'test-book',
            book_author: 'test-author',
            book_price: 100
        });
        const findResult = await Book.find();
        expect(findResult.length).toEqual(1);

        const findByIdResult = await Book.findById(findResult[0].id);
        expect(findByIdResult).toEqual(findResult[0]);
    });

    test('Test updateById Book', async () => {
        const findResult = await Book.find();
        const updateResult = await Book.updateById(findResult[0].id, {
            book_name: 'test-book-update',
            book_author: 'test-author-update',
            book_price: 200
        });
        const findByIdResult = await Book.findById(findResult[0].id);
        expect(updateResult.book_name).toEqual(findByIdResult.book_name);
        expect(updateResult.book_author).toEqual(findByIdResult.book_author);
        expect(updateResult.book_price).toEqual(findByIdResult.book_price);
        expect(updateResult.id).toEqual(findByIdResult.id);
        expect(updateResult.created_at).toEqual(findByIdResult.created_at);
        expect(updateResult.updated_at).toEqual(findByIdResult.updated_at);
    });

    test('Test deleteById Book failed', async () => {
        try {
            await Book.deleteById(123);
        } catch (error: any) {
            expect(error.response.data).toEqual({
                "message": "Not Found",
                "documentation_url": "https://docs.github.com/rest/issues/comments#delete-an-issue-comment"
            });
        }
    });

    test('Test updateById Book failed', async () => {
        try {
            await Book.updateById(123, {
                book_name: 'test-book-update',
                book_author: 'test-author-update',
                book_price: 200
            });
        } catch (error: any) {
            expect(error.response.data).toEqual({
                "message": "Not Found",
                "documentation_url": "https://docs.github.com/rest/issues/comments#update-an-issue-comment"
            });
        }
    });

    test('Test findById Book failed', async () => {
        try {
            await Book.findById(123);
        } catch (error: any) {
            expect(error.response.data).toEqual({
                "message": "Not Found",
                "documentation_url": "https://docs.github.com/rest/issues/comments#get-an-issue-comment"
            });
        }
    });

    test('Test createAll Book', async () => {
        await Book.deleteAll();
        const result = await Book.createAll(bookList);
        expect(result.length).toEqual(10);

        // 因为是并行创建，所以批量新增的数据是无序的
        expect((await Book.find()).map(item => item.book_name)).not.toEqual(bookList.map(item => item.book_name));
    });

    test('Test createAll Book orderly', async () => {
        await Book.deleteAll();
        const result = await Book.createAll(bookList, true);
        expect(result.length).toEqual(10);

        // 因为是顺序创建，所以批量新增的数据是有序的
        expect((await Book.find()).map(item => item.book_name)).toEqual(bookList.map(item => item.book_name));
    });

    test('Test find Book with params since', async () => {
        const time = dayjs().subtract(3, 'second').toISOString();
        const result = await Book.find({ since: time });
        expect(result.length).toBeGreaterThan(0);
        result.forEach(item => {
            expect(dayjs(item.created_at).isAfter(time)).toBeTruthy();
        });
    });

    test('Test find Book with params page & per_page', async () => {
        const firstPage = await Book.find({ page: 1, per_page: 3 });
        expect(firstPage.length).toEqual(3);

        const lastPage = await Book.find({ page: 4, per_page: 3 });
        expect(lastPage.length).toEqual(1);
    });
});