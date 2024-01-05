import { StoragePlatform } from "../../enums";
import { GiteeUser, GithubUser, GitlabUser } from "../../storage-lib";
import { RequestMethods } from "./request-methods";
import { RequestOptions } from "./request-options";

export abstract class BaseRequest {
    protected readonly baseUrl: string;
    protected readonly accessToken: string;

    constructor(
        public options: RequestOptions
    ) { 
        this.baseUrl = options.baseUrl ? options.baseUrl : this.getBaseUrl();
        this.accessToken = options.accessToken;
    }

    protected abstract sendRequest<T>(method: RequestMethods, url: string, body?: string, params?: any): Promise<T>;

    get<T>(url: string, params?: any): Promise<T> {
        return this.sendRequest<T>('GET', url, undefined, params);
    }

    post<T>(url: string, body: string): Promise<T> {
        return this.sendRequest<T>('POST', url, body);
    }

    delete(url: string): Promise<void> {
        return this.sendRequest<void>('DELETE', url);
    }

    patch<T>(url: string, body: string): Promise<T> {
        return this.sendRequest<T>('PATCH', url, body);
    }

    put<T>(url: string, body: string): Promise<T> {
        return this.sendRequest<T>('PUT', url, body);
    }

    async authenticate() {
        switch(this.options.platform) {
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
        switch(this.options.platform) {
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
        switch(this.options.platform) {
            case StoragePlatform.gitee:
                return `${this.baseUrl}/api/v5/repos/${this.options.owner}/${this.options.repo}`;
            case StoragePlatform.github:
                return `${this.baseUrl}/repos/${this.options.owner}/${this.options.repo}`;
            case StoragePlatform.gitlab:
                return `${this.baseUrl}/api/v4/projects/${this.options.projectId}`;
            default:
                throw new Error('Unsupported Platform');
        }
    }
}