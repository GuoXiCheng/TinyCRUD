import { StartTest } from "./helper/start-test";

test('Test Ping Gitee', async () => {
    const request = StartTest.getGiteeRequest();
    const res = await request.ping();
    expect(res).not.toBeNull();
}, 30000);