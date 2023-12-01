import {TinyRequestInstance} from "./request-lib";
export enum StoragePlatform {
    gitee = "gitee",
    github = "github",
    gitlab = "gitlab"
}

export enum RequestLib {
    axios = "axios",
    wx = "wx"
}

export type StoragePlatformType = keyof typeof StoragePlatform;
export type RequestLibType = keyof typeof RequestLib;
export {TinyRequestInstance};

