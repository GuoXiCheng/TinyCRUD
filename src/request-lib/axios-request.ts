import { AxiosInstance } from 'axios';
import { TinyRequest } from './tiny-request';

export class AxiosRequest extends TinyRequest {
    constructor(
        protected axios: AxiosInstance,
        protected baseUrl: string,
        protected accessToken: string
    ) {
        super(axios, baseUrl, accessToken);
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
