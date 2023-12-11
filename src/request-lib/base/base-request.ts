import { StoragePlatform } from "../../enums";
import { GiteeUser, GithubUser, GitlabUser } from "../../storage-lib";
import { RequestOptions } from "./request-options";

export abstract class BaseRequest {
    protected readonly baseUrl: string;
    protected readonly accessToken: string;
    constructor(
        protected options: RequestOptions
    ) { 
        this.baseUrl = options.baseUrl ? options.baseUrl : this.getBaseUrl(options.storagePlatform);
        this.accessToken = options.accessToken;
    }

    abstract get<T>(url: string): Promise<T>;
    abstract post(url: string): void;

    async authenticate() {
        switch(this.options.storagePlatform) {
            case StoragePlatform.gitee:
                return this.get<GiteeUser>(`${this.baseUrl}/api/v5/user`);
            case StoragePlatform.github:
                return this.get<GithubUser>(`${this.baseUrl}/user`);
            case StoragePlatform.gitlab:
                return this.get<GitlabUser>(`${this.baseUrl}/api/v4/user`);
            default:
                throw new Error('Unsupported Platform');
        }
    }

    private getBaseUrl(platform: keyof typeof StoragePlatform) {
        switch(platform) {
            case StoragePlatform.gitee:
                return 'https://gitee.com';
            case StoragePlatform.github:
                return 'https://api.github.com';
            case StoragePlatform.gitlab:
                return 'https://gitlab.com';
            default:
                throw new Error('Unsupported Platform');
        }
    }
}