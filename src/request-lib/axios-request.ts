import { AxiosInstance } from 'axios';
import { TinyRequest } from './interfaces';

export class AxiosRequest implements TinyRequest {
    constructor(private axios: AxiosInstance) { }

    get(url: string) {
        this.axios.get(url);
    }

    post(url: string) {
        this.axios.post(url);
    }
}
