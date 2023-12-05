import { AxiosInstance } from 'axios';
import { TinyRequest } from './interfaces';

export class AxiosRequest implements TinyRequest {
    constructor(private axios: AxiosInstance, private accessToken: string) { }

    async get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.axios.get(url, {
                headers: {
                    'Authorization': this.accessToken,
                    'PRIVATE-TOKEN': this.accessToken
                }
            }).then((res) => {
                resolve(res.data as T);
            }).catch(error => {
                reject(error);
            });
        });
    }

    post(url: string) {
        this.axios.post(url, undefined, {
            headers: {
                'Authorization': this.accessToken,
                'PRIVATE-TOKEN': this.accessToken
            }
        });
    }
}
