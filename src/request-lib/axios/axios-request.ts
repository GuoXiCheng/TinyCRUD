import { AxiosInstance } from 'axios';
import { BaseRequest } from '../base/base-request';
import { RequestOptions } from '../base/request-options';
import { RequestMethods } from '../base/request-methods';

export class AxiosRequest extends BaseRequest {
    private axios: AxiosInstance;
    constructor(
        protected options: RequestOptions
    ) {
        super(options);
        this.axios = options.request as AxiosInstance;
    }

    async sendRequest<T>(method: RequestMethods, url: string, body?: string, params?: any): Promise<T> {
        try {
            const response = await this.axios.request<T>({
                url,
                method,
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                ...(body && { data: { body } }),
                ...(params && { params })
            });
            
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }
}
