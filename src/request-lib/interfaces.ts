import { AxiosInstance } from "axios";
import { RequestType, StoragePlatform } from "../enums";
import { GiteeUser, GithubUser, GitlabUser } from "./user";

export interface WxInstance {
    request(options: WxRequestOptions): void;
    [prop: string]: any;
}

export interface WxRequestOptions {
    url: string;
    method: 'GET' | 'POST';
    header?: object;
    success: (res: { data: string | Object | ArrayBuffer, statusCode: number }) => void;
    fail: (errMsg: string, errNo: number) => void;
}

export type RequestInstance = WxInstance | AxiosInstance;

export const OfficialUrlValues = {
    gitee: "https://gitee.com",
    github: "https://api.github.com",
    gitlab: "https://gitlab.com"
} as const;

type RequestTypeMap = {
    [RequestType.wx]: WxInstance;
    [RequestType.axios]: AxiosInstance;
}
export interface TinyRequestOptions {
    requestType: keyof typeof RequestType;
    request: RequestInstance;
    baseUrl: string;
    accessToken: string;
}

export type StoragePlatformUserMap = {
    [StoragePlatform.gitee]: GiteeUser;
    [StoragePlatform.github]: GithubUser;
    [StoragePlatform.gitlab]: GitlabUser;
}



