import { BaseModel } from "../base/base-model";
import { BaseOptions } from "../base/base-options";
import { BaseStorage } from "../base/base-storage";

export class GiteeStorage<T extends BaseModel> extends BaseStorage<T> {
    
    constructor(baseOptions: BaseOptions) {
        super(baseOptions);
    }

}