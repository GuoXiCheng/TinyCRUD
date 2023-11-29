import { RequestLib, RequestLibType } from ".";

interface TinyRequest {
    get(): void;
    post(): void;
};

class AxiosRequest implements TinyRequest {
    constructor() {}
    get() { }
    post() { }
}

class WxRequest implements TinyRequest {
    get() { }
    post() { }
}

abstract class TinyRequestFactory {
    abstract createRequest(): TinyRequest;
}

class AxiosRequestFactory extends TinyRequestFactory {
    createRequest() {
        return new AxiosRequest();
    }
}

class WxRequestFactory extends TinyRequestFactory {
    createRequest() {
        return new WxRequest();
    }
}

function clientNode(requestLibType: RequestLibType, requestInstance: any) {
    switch(requestLibType) {
        case RequestLib.axios:
            return new AxiosRequestFactory().createRequest();
        case RequestLib.wx:
            return new WxRequestFactory().createRequest();
        default:
            throw new Error("request lib not support");
    }
}

