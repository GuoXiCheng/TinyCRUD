import { BaseRequest } from '../base/base-request';
import { RequestMethods } from '../base/request-methods';
import { RequestOptions } from '../base/request-options';

export class WxRequest extends BaseRequest {
    private wx: WechatMiniprogram.Wx;
    constructor(
        public options: RequestOptions
    ) {
        super(options);
        this.wx = options.httpClient as WechatMiniprogram.Wx;
    }

    protected async sendRequest<T>(method: RequestMethods, url: string, body?: string, params?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            const options: WechatMiniprogram.RequestOption = {
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
                options.header = options.header || {};
                options.header['X-HTTP-Method-Override'] = 'PATCH';
            }

            this.wx.request(options);
        });
    }
}
