import { StoragePlatform } from "../enums";
import { RequestInstance, StoragePlatformUserMap } from "./interfaces";

export abstract class TinyRequest {
    constructor(
        protected instance: RequestInstance,
        protected baseUrl: string,
        protected accessToken: string
    ) { }

    abstract get<T>(url: string): Promise<T>;
    abstract post(url: string): void;

    async ping<P extends keyof typeof StoragePlatform>(platform: P): Promise<StoragePlatformUserMap[typeof StoragePlatform[P]]> {
        let url: string;
        switch (platform) {
            case StoragePlatform.gitee:
                url = `${this.baseUrl}/api/v5/user`;
                break;
            case StoragePlatform.github:
                url = `${this.baseUrl}/user`;
                break;
            case StoragePlatform.gitlab:
                url = `${this.baseUrl}/api/v3/user`;
                break;
            default:
                throw new Error('Unsupported platform');
        }
    
        return this.get<StoragePlatformUserMap[typeof StoragePlatform[P]]>(url);
    }
}