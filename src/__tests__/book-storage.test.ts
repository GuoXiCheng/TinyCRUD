import { Book } from "./helper/book-storage";

describe('Test Book Storage', () => {

    test('Test deleteAll Book', async () => {
        await Book.deleteAll();
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
});