import { TinyRequestOptions, WxInstance } from './interfaces';
import { TinyRequest } from './tiny-request';

export class WxRequest extends TinyRequest {
    private wx: WxInstance;
    private accessToken: string;
    constructor(
        protected options: TinyRequestOptions
    ) {
        super(options);
        this.wx = options.request as WxInstance;
        this.accessToken = options.accessToken;
    }

    async get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.wx.request({
                url,
                method: 'GET',
                header: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                success: (res: { data: string | Object | ArrayBuffer, statusCode: number }) => {
                    resolve(res as T);
                },
                fail: (errMsg: string, errNo: number) => {
                    reject(errMsg);
                }
            });
        });
    }

    post(url: string) {
        // this.wx.request({
        //     url,
        //     method: 'POST',
        //     header: {
        //         'Authorization': `Bearer ${this.accessToken}`
        //     }
        // });
    }
}
