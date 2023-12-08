import { StoragePlatform } from '../enums';
import { WxInstance, TinyRequest, GiteeUser, GithubUser, GitlabUser, StoragePlatformUserMap } from './interfaces';

export class WxRequest implements TinyRequest {
    constructor(private wx: WxInstance, private baseUrl: string, private accessToken: string) { }

    async get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.wx.request({
                url,
                method: 'GET',
                header: {
                    'Authorization': this.accessToken
                },
                success: (res: {data: string | Object | ArrayBuffer, statusCode: number}) => {
                    resolve(res as T);
                },
                fail: (errMsg: string, errNo: number) => {
                    reject(errMsg);
                }
            });
        });
    }

    post(url: string) {
        // this.wx.request({
        //     url,
        //     method: 'POST',
        //     header: {
        //         'Authorization': this.accessToken,
        //         'PRIVATE-TOKEN': this.accessToken
        //     }
        // });
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
