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
    ping(): Promise<any>;
};

export type RequestInstance = WxInstance | AxiosInstance;

type RequestTypeMap = {
    [RequestType.wx]: WxInstance;
    [RequestType.axios]: AxiosInstance;
}
export interface TinyRequestOptions<T extends RequestType> {
    requestType: T;
    request: RequestTypeMap[T]; 
    accessToken: string;
}