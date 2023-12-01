import 'dotenv/config';
import { TinyRequestInstance } from '../request-lib';
import { RequestLib } from '..';
import axios from 'axios';


test('Test TinyRequestInstance', async () => {
    const instance = TinyRequestInstance(RequestLib.axios, axios, process.env.GITEE_TOKEN as string);
    const detail = await instance.get(process.env.GITEE_GET_ALL_URL as string);
    expect(detail.length).toBeGreaterThan(0);
}, 30000);