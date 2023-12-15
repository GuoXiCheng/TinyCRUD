export interface WxInstance {
    request(options: WxRequestOptions): void;
    [prop: string]: any;
}

export interface WxRequestOptions {
    url: string;
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS' | 'HEAD' | 'TRACE' | 'CONNECT';
    data?: string | object | ArrayBuffer;
    header?: object;
    success: (res: { data: string | Object | ArrayBuffer, statusCode: number }) => void;
    fail: (errMsg: string, errNo: number) => void;
}