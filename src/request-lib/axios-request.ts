import { AxiosInstance } from 'axios';
import { GiteeUser, GithubUser, GitlabUser, StoragePlatformUserMap, TinyRequest } from './interfaces';
import { StoragePlatform } from '../enums';

export class AxiosRequest implements TinyRequest {
    constructor(private axios: AxiosInstance, private baseUrl: string, private accessToken: string) { }

    async get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.axios.get(url, {
                headers: {
                    'Authorization': this.accessToken
                }
            }).then((res) => {
                resolve(res.data as T);
            }).catch(error => {
                reject(error);
            });
        });
    }

    post(url: string) {
        this.axios.post(url, undefined, {
            headers: {
                'Authorization': this.accessToken
            }
        });
    }

    async ping<P extends keyof typeof StoragePlatform>(platform: P): Promise<StoragePlatformUserMap[typeof StoragePlatform[P]]> {
        switch (platform) {
            case StoragePlatform.gitee:
                return this.get<GiteeUser>(`${this.baseUrl}/api/v5/user`) as Promise<StoragePlatformUserMap[typeof StoragePlatform[P]]>;
            case StoragePlatform.github:
                return this.get<GithubUser>(`${this.baseUrl}/api/v3/user`) as Promise<StoragePlatformUserMap[typeof StoragePlatform[P]]>;
            case StoragePlatform.gitlab:
                return this.get<GitlabUser>(`${this.baseUrl}/user`) as Promise<StoragePlatformUserMap[typeof StoragePlatform[P]]>;
            default:
                throw new Error('unsupported platform');
        }
    }
}
