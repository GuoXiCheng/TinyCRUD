import 'dotenv/config';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { createRequest } from '../../index';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import MockAdapter from 'axios-mock-adapter';
import jsonfile from 'jsonfile';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Shanghai');

export const GITEE_NUMBER = process.env.TEST_GITEE_NUMBER || '1';

export const GITHUB_NUMBER = process.env.TEST_GITHUB_NUMBER || '1';

export const GITLAB_NUMBER = process.env.TEST_GITLAB_NUMBER || '1';

export const ENCRYPT_KEY = process.env.TEST_ENCRYPT_KEY || 'test-encrypt-key';

export const GITEE_OWNER = process.env.TEST_GITEE_OWNER || 'test-owner';

export const GITEE_REPO = process.env.TEST_GITEE_REPO || 'test-repo';

export const USE_API = process.env.USE_API === 'true' || false;

export const GITHUB_OWNER = process.env.TEST_GITHUB_OWNER || 'test-owner';

export const GITHUB_REPO = process.env.TEST_GITHUB_REPO || 'test-repo';

export const GITLAB_PROJECT_ID = process.env.TEST_GITLAB_PROJECT_ID || 'test-project-id';

export let mock: MockAdapter | null = null;
if (!USE_API) {
    mock = new MockAdapter(axios);
}

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
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    issueNumber: GITHUB_NUMBER
});

export const gitlabRequest = createRequest({
    httpLib: 'axios',
    httpClient: axios,

    accessToken: process.env.TEST_GITLAB_TOKEN as string,

    platform: 'gitlab',
    projectId: GITLAB_PROJECT_ID
});

export function readJSONSync(filename: string) {
    return jsonfile.readFileSync(`src/__tests__/mock/json/${filename}`);
}

export function writeJSONSync(filename: string, data: any) {
    return jsonfile.writeFileSync(`src/__tests__/mock/json/${filename}`, data, { spaces: 2 });
}