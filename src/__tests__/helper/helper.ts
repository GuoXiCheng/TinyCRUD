import 'dotenv/config';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { createRequest } from '../../request-lib';

export const GITEE_NUMBER = process.env.TEST_GITEE_NUMBER as string;

export const GITHUB_NUMBER = process.env.TEST_GITHUB_NUMBER as string;

export const GITLAB_NUMBER = process.env.TEST_GITLAB_NUMBER as string;

export const ENCRYPT_KEY = "MySecretPassphrase";

export const giteeRequest = createRequest({
    requestType: 'axios',
    request: axios,
    accessToken: process.env.TEST_GITEE_TOKEN as string,
    platform: 'gitee',
    owner: process.env.TEST_GITEE_OWNER as string,
    repo: process.env.TEST_GITEE_REPO as string,
    useEncrypt: true,
    encryptFn: (data: string) => {
        return CryptoJS.AES.encrypt(data, ENCRYPT_KEY).toString();
    },
    decryptFn: (data: string) => {
        return CryptoJS.AES.decrypt(data, ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
    }
});

export const githubRequest = createRequest({
    requestType: 'axios',
    request: axios,
    accessToken: process.env.TEST_GITHUB_TOKEN as string,
    platform: 'github',
    owner: process.env.TEST_GITHUB_OWNER as string,
    repo: process.env.TEST_GITHUB_REPO as string
});

export const gitlabRequest = createRequest({
    requestType: 'axios',
    request: axios,
    accessToken: process.env.TEST_GITLAB_TOKEN as string,
    platform: 'gitlab',
    projectId: process.env.TEST_GITLAB_PROJECT_ID as string
});