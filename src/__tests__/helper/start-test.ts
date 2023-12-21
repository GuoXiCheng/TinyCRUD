import axios from 'axios';
import 'dotenv/config';
import { createRequest } from '../..';
import CryptoJS from 'crypto-js';

export class StartTest {

    static GITEE_NUMBER = process.env.TEST_GITEE_NUMBER as string;

    static GITHUB_NUMBER = process.env.TEST_GITHUB_NUMBER as string;

    static GITLAB_NUMBER = process.env.TEST_GITLAB_NUMBER as string;

    static ENCRYPT_KEY = "MySecretPassphrase";

    constructor() {
        
    }

    static createGiteeRequest() {
        return createRequest({
            requestType: 'axios',
            request: axios,
            accessToken: process.env.TEST_GITEE_TOKEN as string,
            platform: 'gitee',
            owner: process.env.TEST_GITEE_OWNER as string,
            repo: process.env.TEST_GITEE_REPO as string,
            useEncrypt: false,
            encryptFn: (data: string) => {
                return CryptoJS.AES.encrypt(data, StartTest.ENCRYPT_KEY).toString();
            },
            decryptFn: (data: string) => {
                return CryptoJS.AES.decrypt(data, StartTest.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
            }
        });
    }

    static createGithubRequest() {
        return createRequest({
            requestType: 'axios',
            request: axios,
            accessToken: process.env.TEST_GITHUB_TOKEN as string,
            platform: 'github',
            owner: process.env.TEST_GITHUB_OWNER as string,
            repo: process.env.TEST_GITHUB_REPO as string
        });
    }

    static createGitlabRequest() {
        return createRequest({
            requestType: 'axios',
            request: axios,
            accessToken: process.env.TEST_GITLAB_TOKEN as string,
            platform: 'gitlab',
            projectId: process.env.TEST_GITLAB_PROJECT_ID as string
        });
    }
}