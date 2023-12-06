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
export function createRequest(options: TinyRequestOptions) {
    const { requestType, request, accessToken } = options;
    switch (requestType) {
        case RequestType.axios:
            return new AxiosRequestFactory().createRequest(request as AxiosInstance, accessToken);
        case RequestType.wx:
            return new WxRequestFactory().createRequest(request as WxInstance, accessToken);
        default:
            throw new Error('invalid request lib type');
    }
}