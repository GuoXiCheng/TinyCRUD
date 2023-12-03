import { WxInstance, TinyRequest } from './interfaces';

export class WxRequest implements TinyRequest {
    constructor(private wx: WxInstance, private accessToken: string) { }

    async get(url: string) {
        return new Promise((resolve, reject) => {
            this.wx.request({
                url,
                method: 'GET',
                header: {
                    'Authorization': this.accessToken,
                    'PRIVATE-TOKEN': this.accessToken
                },
                success: (res: {data: string | Object | ArrayBuffer, statusCode: number}) => {
                    resolve(res);
                },
                fail: (errMsg: string, errNo: number) => {
                    reject(errMsg);
                }
            });
        });
    }

    post(url: string) {
        // this.wx.request({
        //     url,
        //     method: 'POST',
        //     header: {
        //         'Authorization': this.accessToken,
        //         'PRIVATE-TOKEN': this.accessToken
        //     }
        // });
    }
}
