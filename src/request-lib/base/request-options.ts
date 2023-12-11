import { GiteeOptions, GithubOptions, GitlabOptions } from "../../storage-lib";
import { AxiosOptions } from "../axios/axios-options";
import { WxOptions } from "../wx/wx-options";

export type RequestOptions = {
    baseUrl?: string;
    accessToken: string;
}
    & (GiteeOptions | GithubOptions | GitlabOptions)
    & (AxiosOptions | WxOptions);