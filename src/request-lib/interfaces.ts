import { AxiosInstance } from "axios";
import { RequestType, StoragePlatform } from "../enums";
import { WxInstance } from "./wx/wx-interface";
import { GiteeUser, GithubUser, GitlabUser } from "../storage-lib";

export type RequestInstance = WxInstance | AxiosInstance;

export const OfficialUrlValues = {
    gitee: "https://gitee.com",
    github: "https://api.github.com",
    gitlab: "https://gitlab.com"
} as const;

export type StoragePlatformUserMap = {
    [StoragePlatform.gitee]: GiteeUser;
    [StoragePlatform.github]: GithubUser;
    [StoragePlatform.gitlab]: GitlabUser;
}



