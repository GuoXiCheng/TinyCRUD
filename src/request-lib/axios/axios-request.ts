import { BaseRequest } from '../base/base-request';
import { RequestOptions } from '../base/request-options';
import { RequestMethods } from '../base/request-methods';

export class AxiosRequest extends BaseRequest {
    private axios: any;
    constructor(
        public options: RequestOptions
    ) {
        super(options);
        this.axios = options.httpClient;
    }

    protected async sendRequest<T>(method: RequestMethods, url: string, body?: string, params?: any): Promise<T> {
        const response = await this.axios.request({
            url,
            method,
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            },
            ...(body && { data: { body } }),
            ...(params && { params })
        });
        
        return response.data;
    }
}
