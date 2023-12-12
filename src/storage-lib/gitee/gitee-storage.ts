import { BaseRequest } from "../../request-lib";
import { BaseComment } from "../base/base-comment";
import { BaseModel } from "../base/base-model";
import { BaseStorage } from "../base/base-storage";

export abstract class GiteeStorage<M extends BaseModel> extends BaseStorage {
    private endpoint: string;

    constructor(private request: BaseRequest, private issueNumber: string) {
        super();
        this.endpoint = request.getEndpoint();
    }

    async findById(id: number) {
        const url = `${this.endpoint}/issues/comments/${id}`;
        const response = await this.request.get<BaseComment>(url);
        return this.deserialize<M>(response);
    }

    async find() {
        const url = `${this.endpoint}/issues/${this.issueNumber}/comments`;
        const response = await this.request.get<BaseComment[]>(url);
        return response.map((item)=>this.deserialize<M>(item));
    }

}