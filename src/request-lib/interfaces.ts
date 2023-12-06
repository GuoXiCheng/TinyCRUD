import { AxiosInstance } from "axios";
import { RequestType } from "../enums";

export interface WxInstance {
    request(options: WxRequestOptions): void;
    [prop: string]: any;
}

export interface WxRequestOptions {
    url: string;
    method: 'GET' | 'POST';
    header?: object;
    success: (res: {data: string | Object | ArrayBuffer, statusCode: number}) => void;
    fail: (errMsg: string, errNo: number) => void;
}

export interface TinyRequest {
    get<T>(url: string): Promise<T>;
    post(url: string): void;
};

export type RequestInstance = WxInstance | AxiosInstance;
export interface TinyRequestOptions {
    requestType: keyof typeof RequestType;
    request: RequestInstance; 
    accessToken: string;
}