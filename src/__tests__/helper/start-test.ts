import axios from 'axios';
import 'dotenv/config';
import { RequestType } from '../../enums';
import { createRequest } from '../../request-lib';
import { GiteeStorageOptions } from '../../storage-lib/interfaces';

export class StartTest {
    constructor() {
        
    }

    static getGiteeRequest() {
        return createRequest({
            requestType: RequestType.axios,
            request: axios,
            accessToken: process.env.TEST_GITEE_TOKEN as string,
            baseUrl: "https://gitee.com",
        });
    }

    static getGiteeOptions(): GiteeStorageOptions {
        return {
            request: this.getGiteeRequest(),
            owner: process.env.TEST_GITEE_OWNER as string,
            repo: process.env.TEST_GITEE_REPO as string,
            number: process.env.TEST_GITEE_NUMBER as string,
        }
    }

    static getGithubRequest() {
        return createRequest({
            requestType: RequestType.axios,
            request: axios,
            accessToken: process.env.TEST_GITHUB_TOKEN as string,
            baseUrl: "https://api.github.com",
        });
    }

    static getGitlabRequest() {
        return createRequest({
            requestType: RequestType.axios,
            request: axios,
            accessToken: process.env.TEST_GITLAB_TOKEN as string,
            baseUrl: "https://gitlab.com",
        });
    }
}