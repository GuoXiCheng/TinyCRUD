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
});