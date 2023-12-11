import { UserStorage } from "./helper/user-storage";

test('Test Storage Lib', async () => {
    const userStorage = new UserStorage();
    const detail = await userStorage.find();
    expect(detail.length).toBeGreaterThan(0);
}, 30000);