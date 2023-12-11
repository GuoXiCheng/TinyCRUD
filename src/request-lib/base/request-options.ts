import { RequestType } from "../../enums";
import { GiteeOptions, GithubOptions, GitlabOptions } from "../../storage-lib";
import { RequestInstance } from "../interfaces";

export type RequestOptions = {
    requestType: keyof typeof RequestType;
    request: RequestInstance;
    baseUrl: string;
    accessToken: string;
} & (GiteeOptions | GithubOptions | GitlabOptions);