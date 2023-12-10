import { BaseStorage } from "../base/base-storage";
import { GiteeResponse } from "./gitee-response";
import { GiteeStorageOptions } from "./gitee-storage-options";

export abstract class GiteeStorage implements BaseStorage {
    private baseUrl = "https://gitee.com";
    constructor(private options: GiteeStorageOptions) { 
        this.baseUrl = options.baseUrl || this.baseUrl;
    }

    async findById(): Promise<void> {
        this.options.request.get("");
    }

    async find() {
        const {owner, repo, number} = this.options;
        const url = `${this.baseUrl}/api/v5/repos/${owner}/${repo}/issues/${number}/comments`;
        const response = await this.options.request.get<GiteeResponse[]>(url);
        return response.map((item: { id: any; body: string; created_at: any; updated_at: any; }) => ({
            id: item.id,
            ...JSON.parse(item.body),
            created_at: item.created_at,
            updated_at: item.updated_at
        }));
    }

}