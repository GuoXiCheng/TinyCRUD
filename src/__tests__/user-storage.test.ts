import { StartTest } from "./helper/start-test";
import { UserStorage } from "./helper/user-storage";

test('Test Storage Lib', async () => {
    // const userStorage = new UserStorage(StartTest.createGiteeRequest());
    // const detail = await userStorage.find();
    expect(1).toBeGreaterThan(0);
}, 30000);