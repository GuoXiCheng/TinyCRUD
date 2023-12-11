import { BaseRequest } from "../../request-lib";
import { BaseStorage } from "../base/base-storage";
import { GiteeResponse } from "./gitee-response";

export abstract class GiteeStorage implements BaseStorage {
    constructor(private request: BaseRequest, private issueNumber: string) { }

    async findById(): Promise<void> {
        this.request.get("");
    }

    async find() {
        const url = `${this.request.getUrlPrefix()}/issues/${this.issueNumber}/comments`;
        const response = await this.request.get<GiteeResponse[]>(url);
        return response.map((item: { id: any; body: string; created_at: any; updated_at: any; }) => ({
            id: item.id,
            ...JSON.parse(item.body),
            created_at: item.created_at,
            updated_at: item.updated_at
        }));
    }

}