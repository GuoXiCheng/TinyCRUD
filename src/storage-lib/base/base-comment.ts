import { BaseModel } from "./base-model";

export interface BaseComment extends BaseModel {
    [x: string]: any;
    body: string;
}