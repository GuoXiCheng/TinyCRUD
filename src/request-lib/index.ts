import { AxiosInstance } from "axios";
import { AxiosRequestFactory, WxRequestFactory } from "./request-factories";
import { TinyRequestOptions, WxInstance } from "./interfaces";
import { RequestType } from "../enums";

/**
 * Creates a request based on the provided options.
 * @param options - The options for creating the request.
 * @returns The created request.
 * @throws Error if the request lib type is invalid.
 */
export function createRequest<T extends RequestType>(options: TinyRequestOptions<T>) {
    const { requestType, request, accessToken } = options;
    switch (requestType) {
        case RequestType.axios:
            if (isAxiosInstance(request)) {
                return new AxiosRequestFactory().createRequest(request, accessToken);
            }
        case RequestType.wx:
            if (isWxInstance(request)) {
                return new WxRequestFactory().createRequest(request, accessToken);
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
