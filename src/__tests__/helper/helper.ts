import 'dotenv/config';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { createRequest } from '../../request-lib';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// const mock = new MockAdapter(axios);

// mock.onGet('https://fake-gitee/api/v5/user').reply(200, {
//     "id": 1000001,
//     "login": "***",
//     "name": "***",
//     "avatar_url": "https://foruda.gitee.com/avatar/***/***.png",
//     "url": "https://gitee.com/api/v5/users/***",
//     "html_url": "https://gitee.com/***",
//     "remark": "",
//     "followers_url": "https://gitee.com/api/v5/users/***/followers",
//     "following_url": "https://gitee.com/api/v5/users/***/following_url{/other_user}",
//     "gists_url": "https://gitee.com/api/v5/users/***/gists{/gist_id}",
//     "starred_url": "https://gitee.com/api/v5/users/***/starred{/owner}{/repo}",
//     "subscriptions_url": "https://gitee.com/api/v5/users/***/subscriptions",
//     "organizations_url": "https://gitee.com/api/v5/users/***/orgs",
//     "repos_url": "https://gitee.com/api/v5/users/***/repos",
//     "events_url": "https://gitee.com/api/v5/users/***/events{/privacy}",
//     "received_events_url": "https://gitee.com/api/v5/users/***/received_events",
//     "type": "User",
//     "blog": null,
//     "weibo": null,
//     "bio": "",
//     "public_repos": 0,
//     "public_gists": 0,
//     "followers": 0,
//     "following": 0,
//     "stared": 0,
//     "watched": 0,
//     "created_at": "2020-02-26T13:20:27+08:00",
//     "updated_at": "2024-01-10T22:27:59+08:00",
//     "email": null
// });

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

    baseURL: undefined,
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