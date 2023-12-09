import { WxInstance } from './interfaces';
import { TinyRequest } from './tiny-request';

export class WxRequest extends TinyRequest {
    constructor(
        protected wx: WxInstance,
        protected baseUrl: string,
        protected accessToken: string
    ) {
        super(wx, baseUrl, accessToken);
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
