import { UserStorage } from "./helper/user-storage";

describe('Test User Storage', () => {
    const userStorage = new UserStorage();

    test('Test User Storage', async () => {
        const detail = await userStorage.find();
        expect(detail.length).toEqual(1);

        const first = detail[0];
        const result = await userStorage.findById(first.id);
        expect(detail[0]).toEqual(result);
    }, 30000);
});