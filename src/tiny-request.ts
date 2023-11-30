// import { RequestLib, RequestLibType } from ".";
// import { AxiosInstance } from 'axios';
// interface WxInstance {
//     request(options: WxRequestOptions): void;
//     [prop: string]: any;
// }

// interface WxRequestOptions {
//     url: string;
//     method: 'GET' | 'POST';
// }

// type RequestInstance = WxInstance | AxiosInstance;

// interface TinyRequest {
//     get(url: string): void;
//     post(url: string): void;
// };

// class AxiosRequest implements TinyRequest {
//     constructor(private axios: AxiosInstance) { }

//     get(url: string) {
//         this.axios.get(url);
//     }

//     post(url: string) {
//         this.axios.post(url);
//     }
// }

// class WxRequest implements TinyRequest {
//     constructor(private wx: WxInstance) { }

//     get(url: string) {
//         this.wx.request({
//             url,
//             method: 'GET'
//         });
//     }

//     post(url: string) {
//         this.wx.request({
//             url,
//             method: 'POST'
//         });
//     }
// }

// abstract class TinyRequestFactory {
//     abstract createRequest(instance: RequestInstance): TinyRequest;
// }

// class AxiosRequestFactory extends TinyRequestFactory {
//     createRequest(instance: AxiosInstance) {
//         return new AxiosRequest(instance);
//     }
// }

// class WxRequestFactory extends TinyRequestFactory {
//     createRequest(instance: WxInstance) {
//         return new WxRequest(instance);
//     }
// }

// function clientNode(requestLibType: RequestLibType, instance: RequestInstance) {
//     switch (requestLibType) {
//         case RequestLib.axios:
//             return new AxiosRequestFactory().createRequest(instance as AxiosInstance);
//         case RequestLib.wx:
//             return new WxRequestFactory().createRequest(instance as WxInstance);
//         default:
//             throw new Error("request lib not support");
//     }
// }

