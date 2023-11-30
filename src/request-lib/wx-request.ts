import { WxInstance, TinyRequest } from './interfaces';

export class WxRequest implements TinyRequest {
    constructor(private wx: WxInstance) { }

    get(url: string) {
        this.wx.request({
            url,
            method: 'GET'
        });
    }

    post(url: string) {
        this.wx.request({
            url,
            method: 'POST'
        });
    }
}
