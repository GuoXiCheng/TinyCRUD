import 'dotenv/config';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { createRequest } from '../../request-lib';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// 设置默认时区
dayjs.tz.setDefault('Asia/Shanghai');

export const GITEE_NUMBER = process.env.TEST_GITEE_NUMBER as string;

export const GITHUB_NUMBER = process.env.TEST_GITHUB_NUMBER as string;

export const GITLAB_NUMBER = process.env.TEST_GITLAB_NUMBER as string;

export const TEST_ENCRYPT_KEY = process.env.TEST_ENCRYPT_KEY as string;

export const giteeRequest = createRequest({
    httpLib: 'axios',
    httpClient: axios,
    accessToken: process.env.TEST_GITEE_TOKEN as string,
    platform: 'gitee',
    owner: process.env.TEST_GITEE_OWNER as string,
    repo: process.env.TEST_GITEE_REPO as string,
    useEncrypt: true,
    encryptFn: (data: string) => {
        return CryptoJS.AES.encrypt(data, TEST_ENCRYPT_KEY).toString();
    },
    decryptFn: (data: string) => {
        return CryptoJS.AES.decrypt(data, TEST_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
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