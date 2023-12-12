import { BaseModel } from '../../storage-lib/base/base-model';
export interface UserModel extends BaseModel {
    name: string;
    age: number;
}