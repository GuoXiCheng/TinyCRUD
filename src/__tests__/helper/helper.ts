import 'dotenv/config';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { createRequest } from '../../request-lib';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import MockAdapter from 'axios-mock-adapter';
import jsonfile from 'jsonfile';

export const mock = new MockAdapter(axios);

dayjs.extend(utc);
dayjs.extend(timezone);

// 设置默认时区
dayjs.tz.setDefault('Asia/Shanghai');

export const GITEE_NUMBER = process.env.TEST_GITEE_NUMBER || '1';

export const GITHUB_NUMBER = process.env.TEST_GITHUB_NUMBER as string;

export const GITLAB_NUMBER = process.env.TEST_GITLAB_NUMBER as string;

export const ENCRYPT_KEY = process.env.TEST_ENCRYPT_KEY || 'test-encrypt-key';

export const GITEE_OWNER = process.env.TEST_GITEE_OWNER || 'test-owner';

export const GITEE_REPO = process.env.TEST_GITEE_REPO || 'test-repo';

export const giteeRequest = createRequest({
    httpLib: 'axios',
    httpClient: axios,

    accessToken: process.env.TEST_GITEE_TOKEN as string,

    platform: 'gitee',
    owner: GITEE_OWNER,
    repo: GITEE_REPO,

    useEncrypt: true,
    encryptFn: (data: string) => {
        return CryptoJS.AES.encrypt(data, ENCRYPT_KEY).toString();
    },
    decryptFn: (data: string) => {
        return CryptoJS.AES.decrypt(data, ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
    }
});

export const githubRequest = createRequest({
    httpLib: 'axios',
    httpClient: axios,
    accessToken: process.env.TEST_GITHUB_TOKEN as string,
    platform: 'github',
    owner: process.env.TEST_GITHUB_OWNER as string,
    repo: process.env.TEST_GITHUB_REPO as string,
    issueNumber: process.env.TEST_GITHUB_NUMBER as string
});

export const gitlabRequest = createRequest({
    httpLib: 'axios',
    httpClient: axios,
    accessToken: process.env.TEST_GITLAB_TOKEN as string,
    platform: 'gitlab',
    projectId: process.env.TEST_GITLAB_PROJECT_ID as string
});

export function readJSONSync(filename: string) {
    return jsonfile.readFileSync(`src/__tests__/mock/json/${filename}`);
}