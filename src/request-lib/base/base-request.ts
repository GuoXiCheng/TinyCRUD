import { StoragePlatform } from "../../enums";
import { GiteeUser, GithubUser, GitlabUser } from "../../storage-lib";
import { RequestMethods } from "./request-methods";
import { RequestOptions } from "./request-options";

export abstract class BaseRequest {
    protected readonly baseUrl: string;
    protected readonly accessToken: string;
    public readonly useEncrypt: boolean;
    public readonly encryptFn?: (data: string) => string;
    public readonly decryptFn?: (data: string) => string;
    constructor(
        protected options: RequestOptions
    ) { 
        this.baseUrl = options.baseUrl ? options.baseUrl : this.getBaseUrl();
        this.accessToken = options.accessToken;
        this.useEncrypt = options.useEncrypt || false;
        this.encryptFn = options.encryptFn;
        this.decryptFn = options.decryptFn;
    }

    protected abstract sendRequest<T>(method: RequestMethods, url: string, data?: any): Promise<T>;

    get<T>(url: string): Promise<T> {
        return this.sendRequest<T>('GET', url);
    }

    post<T>(url: string, data: any): Promise<T> {
        return this.sendRequest<T>('POST', url, data);
    }

    delete(url: string): Promise<void> {
        return this.sendRequest<void>('DELETE', url);
    }

    patch<T>(url: string, data: any): Promise<T> {
        return this.sendRequest<T>('PATCH', url, data);
    }

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

    private getBaseUrl() {
        switch(this.options.storagePlatform) {
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

    getEndpoint() {
        switch(this.options.storagePlatform) {
            case StoragePlatform.gitee:
                return `${this.baseUrl}/api/v5/repos/${this.options.owner}/${this.options.repo}`;
            case StoragePlatform.github:
                return `${this.baseUrl}/user`;
            case StoragePlatform.gitlab:
                return `${this.baseUrl}/api/v4/user`;
            default:
                throw new Error('Unsupported Platform');
        }
    }
}