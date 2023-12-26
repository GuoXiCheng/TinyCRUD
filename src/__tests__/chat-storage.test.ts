import { Chat } from "./helper/chat-storage";

describe('Use Gitlab Test Chat Storage', () => {

    beforeAll(async () => {
        await Chat.deleteAll();
    });

    test('Test find Chat', async () => {
        const detail = await Chat.find();
        expect(detail.length).toEqual(0);
    });

    test('Test create & findById Chat', async () => {
        await Chat.create({
            participants: ['test-user', 'test-user-update'],
            messages: [
                {
                    from: 'test-user',
                    to: 'test-user-update',
                    message: 'hello'
                }
            ]
        });
        const findResult = await Chat.find();
        expect(findResult.length).toEqual(1);

        const findByIdResult = await Chat.findById(findResult[0].id);
        expect(findByIdResult).toEqual(findResult[0]);
    });

    test('Test updateById Chat', async () => {
        const findResult = await Chat.find();
        const updateResult = await Chat.updateById(findResult[0].id, {
            participants: ['test-user', 'test-user-update'],
            messages: [
                {
                    from: 'test-user',
                    to: 'test-user-update',
                    message: 'hello world'
                }
            ]
        });
        const findByIdResult = await Chat.findById(findResult[0].id);
        expect(updateResult.participants).toEqual(findByIdResult.participants);
        expect(updateResult.messages).toEqual(findByIdResult.messages);
        expect(updateResult.id).toEqual(findByIdResult.id);
        expect(updateResult.created_at).toEqual(findByIdResult.created_at);
        expect(updateResult.updated_at).toEqual(findByIdResult.updated_at);
    });

    test('Test deleteById Chat failed', async () => {
        try {
            await Chat.deleteById(123);
        } catch (error: any) {
            expect(error.response.data).toEqual({
                "message": "404 Not found"
            });
        }
    });

    test('Test updateById Chat failed', async () => {
        try {
            await Chat.updateById(123, {
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
            await Chat.findById(123);
        } catch (error: any) {
            expect(error.response.data).toEqual({
                "message": "404 Not found"
            });
        }
    });

    test('Test createAll Chat', async () => {
        await Chat.deleteAll();
        const result = await Chat.createAll([
            {
                participants: ['from-user-1', 'to-user-1'],
                messages: [
                    {
                        from: 'from-user-1',
                        to: 'to-user-1',
                        message: 'hello'
                    }
                ]
            },
            {
                participants: ['from-user-2', 'to-user-2'],
                messages: [
                    {
                        from: 'from-user-2',
                        to: 'to-user-2',
                        message: 'hello'
                    }
                ]
            },
            {
                participants: ['from-user-3', 'to-user-3'],
                messages: [
                    {
                        from: 'from-user-3',
                        to: 'to-user-3',
                        message: 'hello'
                    }
                ]
            },
            {
                participants: ['from-user-4', 'to-user-4'],
                messages: [
                    {
                        from: 'from-user-4',
                        to: 'to-user-4',
                        message: 'hello'
                    }
                ]
            },
            {
                participants: ['from-user-5', 'to-user-5'],
                messages: [
                    {
                        from: 'from-user-5',
                        to: 'to-user-5',
                        message: 'hello'
                    }
                ]
            },
            {
                participants: ['from-user-6', 'to-user-6'],
                messages: [
                    {
                        from: 'from-user-6',
                        to: 'to-user-6',
                        message: 'hello'
                    }
                ]
            },
            {
                participants: ['from-user-7', 'to-user-7'],
                messages: [
                    {
                        from: 'from-user-7',
                        to: 'to-user-7',
                        message: 'hello'
                    }
                ]
            },
            {
                participants: ['from-user-8', 'to-user-8'],
                messages: [
                    {
                        from: 'from-user-8',
                        to: 'to-user-8',
                        message: 'hello'
                    }
                ]
            },
            {
                participants: ['from-user-9', 'to-user-9'],
                messages: [
                    {
                        from: 'from-user-9',
                        to: 'to-user-9',
                        message: 'hello'
                    }
                ]
            },
            {
                participants: ['from-user-10', 'to-user-10'],
                messages: [
                    {
                        from: 'from-user-10',
                        to: 'to-user-10',
                        message: 'hello'
                    }
                ]
            }
        ]);
        expect(result.length).toEqual(10);
    });
});