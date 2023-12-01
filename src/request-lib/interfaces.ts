export interface WxInstance {
    request(options: WxRequestOptions): void;
    [prop: string]: any;
}

export interface WxRequestOptions {
    url: string;
    method: 'GET' | 'POST';
    header?: object;
}

export interface TinyRequest {
    get(url: string): Promise<any>;
    post(url: string): void;
};

export interface TinyRequestOptions {
    accessToken?: string;
}