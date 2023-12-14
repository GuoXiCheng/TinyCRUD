import { AxiosInstance } from "axios";
import { RequestType } from "../enums";
import { AxiosRequest } from "./axios/axios-request";
import { WxRequest } from "./wx/wx-request";
import { WxInstance } from "./wx/wx-interface";
import { RequestOptions } from "./base/request-options";


export function createRequest(options: RequestOptions) {
    const { requestType, request } = options;
    switch (requestType) {
        case RequestType.axios:
            if (isAxiosInstance(request)) {
                return new AxiosRequest(options);
            }
        case RequestType.wx:
            if (isWxInstance(request)) {
                return new WxRequest(options);
            }
        default:
            throw new Error('invalid request lib type');
    }
}


function isAxiosInstance(instance: any): instance is AxiosInstance {
    return instance
        && typeof instance.get === 'function'
        && typeof instance.post === 'function'
        && typeof instance.put === 'function'
        && typeof instance.delete === 'function'
        && typeof instance.patch === 'function';
}

function isWxInstance(instance: any): instance is WxInstance {
    return instance && typeof instance.request === 'function';
}
