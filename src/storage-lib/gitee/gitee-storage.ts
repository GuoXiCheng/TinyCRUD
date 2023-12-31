import { BaseRequest } from "../../request-lib";
import { BaseModel } from "../base/base-model";
import { BaseStorage } from "../base/base-storage";
import { GiteeParams } from "./gitee-params";

export class GiteeStorage<T extends BaseModel> extends BaseStorage<T> {
    
    constructor(protected request: BaseRequest, protected issueNumber: string) {
        super(request, issueNumber);
    }

    async find(params?: GiteeParams): Promise<T[]> {
        return super.find(params);
    }
}