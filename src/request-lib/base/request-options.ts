import { GiteeOptions } from "../../repository-lib/gitee/gitee-options";
import { GithubOptions } from "../../repository-lib/github/github-options";
import { GitlabOptions } from "../../repository-lib/gitlab/gitlab-options";

export type RequestOptions = {
    httpLib: "axios" | "wx";
    httpClient: any;
    accessToken: string;

    baseURL?: string;
    issueNumber?: string;
}
    & (GiteeOptions | GithubOptions | GitlabOptions)
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