import { RequestMethods } from "../base/request-methods";

export interface WxInstance {
    request(options: WxRequestOptions): void;
    [prop: string]: any;
}

export interface WxRequestOptions {
    url: string;
    method: Exclude<RequestMethods, 'PATCH'>;
    data?: string | object | ArrayBuffer;
    header?: object;
    success: (res: { data: string | Object | ArrayBuffer, statusCode: number }) => void;
    fail: (errMsg: string, errNo: number) => void;
}