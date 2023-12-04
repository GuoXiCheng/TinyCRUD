import { AxiosInstance } from "axios";
import { AxiosRequestFactory, RequestInstance, WxRequestFactory } from "./request-factories";
import { WxInstance } from "./interfaces";
import { RequestLibType } from "../types";
import { RequestLib } from "../enums";

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