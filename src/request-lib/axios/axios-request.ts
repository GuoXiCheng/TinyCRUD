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

    private async executeRequest<T>(method: RequestMethods, url: string, data?: any): Promise<T> {
        try {
            const response = await this.axios.request<T>({
                url,
                method,
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                },
                ...(data && { data: data })
            });

            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    async get<T>(url: string): Promise<T> {
        return this.executeRequest<T>('GET', url);
    }

    async post<T>(url: string, data: any): Promise<T> {
        return this.executeRequest<T>('POST', url, data);
    }

    async delete(url: string): Promise<void> {
        return this.executeRequest<void>('DELETE', url);
    }

    async patch<T>(url: string, data: any): Promise<T> {
        return this.executeRequest<T>('PATCH', url, data);
    }

}
