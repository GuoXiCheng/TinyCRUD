import 'dotenv/config';
import { StartTest } from './helper/start-test';


test('Test TinyRequestInstance', async () => {
    const request = new StartTest().getRequest();
    const detail = await request.get(process.env.GITEE_GET_ALL_URL as string);
    expect(detail.length).toBeGreaterThan(0);
}, 30000);