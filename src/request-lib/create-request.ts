import { RequestType } from "../enums";
import { AxiosRequest } from "./axios/axios-request";
import { WxRequest } from "./wx/wx-request";
import { RequestOptions } from "./base/request-options";
import { BaseRequest } from "./base/base-request";


export function createRequest(options: RequestOptions): BaseRequest {
    const { httpLib, httpClient } = options;
    switch (httpLib) {
        case RequestType.axios:
            if (isAxiosInstance(httpClient)) {
                return new AxiosRequest(options);
            }
        case RequestType.wx:
            if (isWxInstance(httpClient)) {
                return new WxRequest(options);
            }
        default:
            throw new Error('invalid request lib type');
    }
}


function isAxiosInstance(instance: any): Boolean {
    return instance
        && typeof instance.get === 'function'
        && typeof instance.post === 'function'
        && typeof instance.put === 'function'
        && typeof instance.delete === 'function'
        && typeof instance.patch === 'function';
}

function isWxInstance(instance: any): Boolean {
    return instance && typeof instance.request === 'function';
}
