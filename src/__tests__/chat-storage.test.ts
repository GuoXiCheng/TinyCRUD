import { ChatStorage } from "./helper/chat-storage";

describe('Use Gitlab Test Chat Storage', () => {
    const chatStorage = new ChatStorage();

    test('Test deleteAll Chat', async () => {
        await chatStorage.deleteAll();
        const detail = await chatStorage.find();
        expect(detail.length).toEqual(0);
    });

    test('Test create & findById Chat', async () => {
        await chatStorage.create({
            participants: ['test-user', 'test-user-update'],
            messages: [
                {
                    from: 'test-user',
                    to: 'test-user-update',
                    message: 'hello'
                }
            ]
        });
        const findResult = await chatStorage.find();
        expect(findResult.length).toEqual(1);

        const findByIdResult = await chatStorage.findById(findResult[0].id);
        expect(findByIdResult).toEqual(findResult[0]);
    });

    test('Test updateById Chat', async () => {
        const findResult = await chatStorage.find();
        const updateResult = await chatStorage.updateById(findResult[0].id, {
            participants: ['test-user', 'test-user-update'],
            messages: [
                {
                    from: 'test-user',
                    to: 'test-user-update',
                    message: 'hello world'
                }
            ]
        });
        const findByIdResult = await chatStorage.findById(findResult[0].id);
        expect(updateResult.participants).toEqual(findByIdResult.participants);
        expect(updateResult.messages).toEqual(findByIdResult.messages);
        expect(updateResult.id).toEqual(findByIdResult.id);
        expect(updateResult.created_at).toEqual(findByIdResult.created_at);
        expect(updateResult.updated_at).toEqual(findByIdResult.updated_at);
    });

    test('Test deleteById Chat failed', async () => {
        try {
            await chatStorage.deleteById(123);
        } catch (error: any) {
            expect(error.response.data).toEqual({
                "message": "404 Not found"
            });
        }
    });

    test('Test updateById Chat failed', async () => {
        try {
            await chatStorage.updateById(123, {
                participants: ['test-user', 'test-user-update'],
                messages: [
                    {
                        from: 'test-user',
                        to: 'test-user-update',
                        message: 'hello world'
                    }
                ]
            });
        } catch (error: any) {
            expect(error.response.data).toEqual({
                "message": "404 Not found"
            });
        }
    });

    test('Test findById Chat failed', async () => {
        try {
            await chatStorage.findById(123);
        } catch (error: any) {
            expect(error.response.data).toEqual({
                "message": "404 Not found"
            });
        }
    });
});