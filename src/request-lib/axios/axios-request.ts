import { AxiosInstance } from 'axios';
import { BaseRequest } from '../base/base-request';
import { RequestOptions } from '../base/request-options';

export class AxiosRequest extends BaseRequest {
    private axios: AxiosInstance;
    constructor(
        protected options: RequestOptions
    ) {
        super(options);
        this.axios = options.request as AxiosInstance;
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

    async post<T>(url: string, data: any): Promise<T> {
        return new Promise((resolve, reject) => {
            this.axios.post<T>(url, data, {
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

    async delete(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            }).then(() => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }

    patch<T>(url: string, data: any): Promise<T> {
        return new Promise((resolve, reject) => {
            this.axios.patch<T>(url, data, {
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
}
