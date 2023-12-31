import { RequestMethods } from "../base/request-methods";

export interface WxInstance {
    request(options: WxRequestOptions): void;
    [prop: string]: any;
}

export interface WxRequestOptions {
    url: string;
    method: RequestMethods;
    data?: string | object | ArrayBuffer;
    header: {
        'Authorization': string;
        'X-HTTP-Method-Override'?: string;
    };
    success: (res: { data: string | Object | ArrayBuffer, statusCode: number }) => void;
    fail: (errMsg: string, errNo: number) => void;
}