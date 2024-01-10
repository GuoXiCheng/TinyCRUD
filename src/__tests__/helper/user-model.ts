import { BaseModel } from "../../repository-lib";
export interface UserModel extends BaseModel {
    name: string;
    age: number;
}