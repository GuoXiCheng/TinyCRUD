import { AxiosInstance } from "axios";
import { RequestInstance, WxInstance } from "./interfaces";
import { AxiosRequest } from "./axios-request";
import { WxRequest } from "./wx-request";
import { TinyRequest } from "./tiny-request";

abstract class TinyRequestFactory {
    abstract createRequest(instance: RequestInstance, baseUrl: string, accessToken: string): TinyRequest;
}

export class AxiosRequestFactory extends TinyRequestFactory {
    createRequest(instance: AxiosInstance, baseUrl: string, accessToken: string) {
        return new AxiosRequest(instance, baseUrl, accessToken);
    }
}

export class WxRequestFactory extends TinyRequestFactory {
    createRequest(instance: WxInstance, baseUrl: string, accessToken: string) {
        return new WxRequest(instance, baseUrl, accessToken);
    }
}
