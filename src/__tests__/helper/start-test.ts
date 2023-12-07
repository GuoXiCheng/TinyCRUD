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
            accessToken: process.env.GITEE_TOKEN as string
        });
    }

    static getGiteeOptions(): GiteeStorageOptions {
        return {
            request: this.getGiteeRequest(),
            owner: process.env.GITEE_OWNER as string,
            repo: process.env.GITEE_REPO as string,
            number: process.env.GITEE_NUMBER as string,
        }
    }
}