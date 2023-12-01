import { AxiosInstance } from "axios";
import { TinyRequest, WxInstance } from "./interfaces";
import { AxiosRequest } from "./axios-request";
import { WxRequest } from "./wx-request";

export type RequestInstance = WxInstance | AxiosInstance;

abstract class TinyRequestFactory {
    abstract createRequest(instance: RequestInstance, accessToken: string): TinyRequest;
}

export class AxiosRequestFactory extends TinyRequestFactory {
    createRequest(instance: AxiosInstance, accessToken: string) {
        return new AxiosRequest(instance, accessToken);
    }
}

export class WxRequestFactory extends TinyRequestFactory {
    createRequest(instance: WxInstance, accessToken: string) {
        return new WxRequest(instance, accessToken);
    }
}
