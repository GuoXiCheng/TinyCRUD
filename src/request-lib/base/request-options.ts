import { RequestType } from "../../enums";
import { RequestInstance } from "../interfaces";

export interface RequestOptions {
    requestType: keyof typeof RequestType;
    request: RequestInstance;
    baseUrl: string;
    accessToken: string;
}