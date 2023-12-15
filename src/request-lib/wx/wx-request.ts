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
                success: (res: any) => {
                    resolve(res.data);
                },
                fail: (errMsg: string) => {
                    console.error(errMsg);
                    reject(errMsg);
                }
            });
        });
    }

    post<T>(url: string, data: any): Promise<T> {
        return new Promise((resolve, reject) => {
            this.wx.request({
                url,
                method: 'POST',
                data: data,
                header: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                success: (res: any) => {
                    resolve(res.data);
                },
                fail: (errMsg: string) => {
                    console.error(errMsg);
                    reject(errMsg);
                }
            });
        });
    }

    delete(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.wx.request({
                url,
                method: 'DELETE',
                header: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                success: (res: any) => {
                    resolve();
                },
                fail: (errMsg: string) => {
                    console.error(errMsg);
                    reject(errMsg);
                }
            });
        });
    }

    patch<T>(url: string, data: any): Promise<T> {
        return new Promise((resolve, reject) => {
            this.wx.request({
                url,
                method: 'POST',
                data: data,
                header: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'X-HTTP-Method-Override': 'PATCH'
                },
                success: (res: any) => {
                    resolve(res.data);
                },
                fail: (errMsg: string) => {
                    console.error(errMsg);
                    reject(errMsg);
                }
            });
        });
    }
}
