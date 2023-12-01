import { WxInstance, TinyRequest } from './interfaces';

export class WxRequest implements TinyRequest {
    constructor(private wx: WxInstance, private accessToken: string) { }

    async get(url: string) {
        return this.wx.request({
            url,
            method: 'GET',
            header: {
                'Authorization': this.accessToken,
                'PRIVATE-TOKEN': this.accessToken
            }
        });
    }

    post(url: string) {
        this.wx.request({
            url,
            method: 'POST',
            header: {
                'Authorization': this.accessToken,
                'PRIVATE-TOKEN': this.accessToken
            }
        });
    }
}
