import { AxiosInstance } from "axios";
import { TinyRequest, WxInstance } from "./interfaces";
import { AxiosRequest } from "./axios-request";
import { WxRequest } from "./wx-request";

export type RequestInstance = WxInstance | AxiosInstance;

abstract class TinyRequestFactory {
    abstract createRequest(instance: RequestInstance): TinyRequest;
}

export class AxiosRequestFactory extends TinyRequestFactory {
    createRequest(instance: AxiosInstance) {
        return new AxiosRequest(instance);
    }
}

export class WxRequestFactory extends TinyRequestFactory {
    createRequest(instance: WxInstance) {
        return new WxRequest(instance);
    }
}
