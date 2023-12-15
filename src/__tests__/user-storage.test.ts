import { UserStorage } from "./helper/user-storage";

describe('Test User Storage', () => {
    const userStorage = new UserStorage();

    test('Test deleteAll User', async () => {
        await userStorage.deleteAll();
        const detail = await userStorage.find();
        expect(detail.length).toEqual(0);
    });

    test('Test create & User & findById User', async () => {
        await userStorage.create({
            name: 'test-user',
            age: 18
        });
        const findResult = await userStorage.find();
        expect(findResult.length).toEqual(1);

        const findByIdResult = await userStorage.findById(findResult[0].id);
        expect(findByIdResult).toEqual(findResult[0]);
    });

    test('Test updateById User', async () => {
        const findResult = await userStorage.find();
        const updateResult = await userStorage.updateById(findResult[0].id, {
            name: 'test-user-update',
            age: 20
        });
        const findByIdResult = await userStorage.findById(findResult[0].id);
        expect(updateResult.name).toEqual(findByIdResult.name);
        expect(updateResult.age).toEqual(findByIdResult.age);
    });

    test('Test deleteById User failed', async () => {
        try {
            await userStorage.deleteById(123);
        } catch (error: any) {
            expect(error.response.data).toEqual({ message: '404 Not Found' });
        }
    });

    test('Test updateById User failed', async () => {
        try {
            await userStorage.updateById(123, {
                name: 'test-user-update',
                age: 20
            });
        } catch (error: any) {
            expect(error.response.data).toEqual({ message: '404 Not Found' });
        }
    });

    test('Test findById User failed', async () => {
        try {
            await userStorage.findById(123);
        } catch (error: any) {
            expect(error.response.data).toEqual({ message: '404 Not Found' });
        }
    });
});