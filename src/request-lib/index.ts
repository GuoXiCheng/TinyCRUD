import { AxiosInstance } from "axios";
import { RequestLib, RequestLibType } from "..";
import { AxiosRequestFactory, RequestInstance, WxRequestFactory } from "./request-factories";
import { WxInstance } from "./interfaces";

export function TinyRequestInstance(requestLibType: RequestLibType, instance: RequestInstance, accessToken: string) {
    switch (requestLibType) {
        case RequestLib.axios:
            return new AxiosRequestFactory().createRequest(instance as AxiosInstance, accessToken);
        case RequestLib.wx:
            return new WxRequestFactory().createRequest(instance as WxInstance, accessToken);
        default:
            throw new Error('invalid request lib type');
    }
}