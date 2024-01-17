import { BaseModel } from "../../index";
export interface UserModel extends BaseModel {
    name: string;
    age: number;
}