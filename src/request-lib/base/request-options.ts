import { GiteeOptions, GithubOptions, GitlabOptions } from "../../storage-lib";
import { AxiosOptions } from "../axios/axios-options";
import { WxOptions } from "../wx/wx-options";

export type RequestOptions = {
    baseUrl?: string;
    issueNumber?: string;
    accessToken: string;
}
    & (GiteeOptions | GithubOptions | GitlabOptions)
    & (AxiosOptions | WxOptions)
    & (RequestWithEncrypt | RequestWithoutEncrypt);

type RequestWithEncrypt = {
    useEncrypt: true;
    encryptFn: (data: string) => string;
    decryptFn: (data: string) => string;
}

type RequestWithoutEncrypt = {
    useEncrypt?: false;
    encryptFn?: (data: string) => string;
    decryptFn?: (data: string) => string;
}