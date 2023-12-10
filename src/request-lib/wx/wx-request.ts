import { BaseRequest } from '../base/base-request';
import { TinyRequestOptions } from '../interfaces';
import { WxInstance } from './wx-interface';

export class WxRequest extends BaseRequest {
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
