import { StartTest } from "./helper/start-test";
import { UserStorage } from "./helper/user-storage";

test('Test Storage Lib', async () => {
    const userStorage = new UserStorage(StartTest.getGiteeOptions());
    const detail = await userStorage.findAll();
    expect(detail.length).toBeGreaterThan(0);
}, 30000);