import { BaseRequest } from "../../request-lib/base/base-request";

export interface GiteeStorageOptions {
    request: BaseRequest;
    owner: string;
    repo: string;
    number: string;
    baseUrl?: string;
}