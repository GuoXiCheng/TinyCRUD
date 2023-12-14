import axios from 'axios';
import 'dotenv/config';
import { createRequest } from '../..';

export class StartTest {
    constructor() {
        
    }

    static createGiteeRequest() {
        return createRequest({
            requestType: 'axios',
            request: axios,
            accessToken: process.env.TEST_GITEE_TOKEN as string,
            storagePlatform: 'gitee',
            owner: process.env.TEST_GITEE_OWNER as string,
            repo: process.env.TEST_GITEE_REPO as string
        });
    }

    static getGiteeIssueNumber() {
        return process.env.TEST_GITEE_NUMBER as string;
    }

    static createGithubRequest() {
        return createRequest({
            requestType: 'axios',
            request: axios,
            accessToken: process.env.TEST_GITHUB_TOKEN as string,
            storagePlatform: 'github',
            owner: '',
            repo: ''
        });
    }

    static createGitlabRequest() {
        return createRequest({
            requestType: 'axios',
            request: axios,
            accessToken: process.env.TEST_GITLAB_TOKEN as string,
            storagePlatform: 'gitlab',
            projectId: ''
        });
    }
}