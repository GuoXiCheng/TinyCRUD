import { AxiosInstance } from 'axios';
import { TinyRequest } from './tiny-request';
import { TinyRequestOptions } from './interfaces';

export class AxiosRequest extends TinyRequest {
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
