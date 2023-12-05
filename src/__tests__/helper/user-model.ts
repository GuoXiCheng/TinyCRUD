import { TinyModel } from "../../storage-lib/interfaces";

export class UserModel extends TinyModel {
    name: string;
    age: number;
}