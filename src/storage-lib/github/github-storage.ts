import { BaseRequest } from "../../request-lib";
import { BaseModel } from "../base/base-model";
import { BaseStorage } from "../base/base-storage";
import { GithubParams } from "./github-params";

export class GithubStorage<T extends BaseModel> extends BaseStorage<T> {

    constructor(protected request: BaseRequest, protected issueNumber: string) {
        super(request, issueNumber);
    }

    async find(params?: GithubParams): Promise<T[]> {
        return super.find(params);
    }
}