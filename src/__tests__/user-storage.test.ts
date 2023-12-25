import { User } from "./helper/user-storage";

describe('Test User Storage', () => {

    test('Test deleteAll User', async () => {
        await User.deleteAll();
        const detail = await User.find();
        expect(detail.length).toEqual(0);
    });

    test('Test create & findById User', async () => {
        await User.create({
            name: 'test-user',
            age: 18
        });
        const findResult = await User.find();
        expect(findResult.length).toEqual(1);

        const findByIdResult = await User.findById(findResult[0].id);
        expect(findByIdResult).toEqual(findResult[0]);
    });

    test('Test updateById User', async () => {
        const findResult = await User.find();
        const updateResult = await User.updateById(findResult[0].id, {
            name: 'test-user-update',
            age: 20
        });
        const findByIdResult = await User.findById(findResult[0].id);
        expect(updateResult.name).toEqual(findByIdResult.name);
        expect(updateResult.age).toEqual(findByIdResult.age);
        expect(updateResult.id).toEqual(findByIdResult.id);
        expect(updateResult.created_at).toEqual(findByIdResult.created_at);
        expect(updateResult.updated_at).toEqual(findByIdResult.updated_at);
    });

    test('Test deleteById User failed', async () => {
        try {
            await User.deleteById(123);
        } catch (error: any) {
            expect(error.response.data).toEqual({ message: '404 Not Found' });
        }
    });

    test('Test updateById User failed', async () => {
        try {
            await User.updateById(123, {
                name: 'test-user-update',
                age: 20
            });
        } catch (error: any) {
            expect(error.response.data).toEqual({ message: '404 Not Found' });
        }
    });

    test('Test findById User failed', async () => {
        try {
            await User.findById(123);
        } catch (error: any) {
            expect(error.response.data).toEqual({ message: '404 Not Found' });
        }
    });
});