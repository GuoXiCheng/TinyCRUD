import { BaseRequest } from '../base/base-request';
import { RequestOptions } from '../base/request-options';
import { WxInstance } from './wx-interface';

export class WxRequest extends BaseRequest {
    private wx: WxInstance;
    constructor(
        protected options: RequestOptions
    ) {
        super(options);
        this.wx = options.request as WxInstance;
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

    // post(url: string) {
        // this.wx.request({
        //     url,
        //     method: 'POST',
        //     header: {
        //         'Authorization': `Bearer ${this.accessToken}`
        //     }
        // });
    // }
    post<T>(url: string, data: any): Promise<T> {
        throw new Error('Method not implemented.');
    }
    delete<T>(url: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
