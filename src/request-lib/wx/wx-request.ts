import { BaseRequest } from '../base/base-request';
import { RequestMethods } from '../base/request-methods';
import { RequestOptions } from '../base/request-options';
import { WxInstance, WxRequestOptions } from './wx-interface';

export class WxRequest extends BaseRequest {
    private wx: WxInstance;
    constructor(
        public options: RequestOptions
    ) {
        super(options);
        this.wx = options.httpClient as WxInstance;
    }

    protected async sendRequest<T>(method: RequestMethods, url: string, body?: string, params?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            const options: WxRequestOptions = {
                url,
                method,
                ...(body && { data: { body } }),
                ...(params && { data: { ...params } }),
                header: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                success: (res: any) => {
                    resolve(res.data);
                },
                fail: (errMsg: string) => {
                    reject(errMsg);
                }
            };

            // wx不支持 PATCH，特别处理 PATCH 方法
            if (method === 'PATCH') {
                options.method = 'POST';
                options.header['X-HTTP-Method-Override'] = 'PATCH';
            }

            this.wx.request(options);
        });
    }
}
