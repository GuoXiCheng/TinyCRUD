export interface WxInstance {
    request(options: WxRequestOptions): void;
    [prop: string]: any;
}

export interface WxRequestOptions {
    url: string;
    method: 'GET' | 'POST';
}

export interface TinyRequest {
    get(url: string): void;
    post(url: string): void;
};

