import { AxiosInstance } from 'axios';
import { TinyRequest } from './interfaces';

export class AxiosRequest implements TinyRequest {
    constructor(private axios: AxiosInstance, private accessToken: string) { }

    async get(url: string) {
        const result = await this.axios.get(url, {
            headers: {
                'Authorization': this.accessToken,
                'PRIVATE-TOKEN': this.accessToken
            }
        });
        return result.data;
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
