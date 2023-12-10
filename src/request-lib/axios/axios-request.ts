import { AxiosInstance } from 'axios';
import { TinyRequestOptions } from '../interfaces';
import { BaseRequest } from '../base/base-request';

export class AxiosRequest extends BaseRequest {
    private axios: AxiosInstance;
    private accessToken: string;
    constructor(
        protected options: TinyRequestOptions
    ) {
        super(options);
        this.axios = options.request as AxiosInstance;
        this.accessToken = options.accessToken;
    }

    async get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.axios.get<T>(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            }).then((res) => {
                resolve(res.data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    post(url: string) {
        this.axios.post(url, undefined, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        });
    }
}
