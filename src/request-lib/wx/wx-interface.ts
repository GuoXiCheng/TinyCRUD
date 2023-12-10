export interface WxInstance {
    request(options: WxRequestOptions): void;
    [prop: string]: any;
}

export interface WxRequestOptions {
    url: string;
    method: 'GET' | 'POST';
    header?: object;
    success: (res: { data: string | Object | ArrayBuffer, statusCode: number }) => void;
    fail: (errMsg: string, errNo: number) => void;
}