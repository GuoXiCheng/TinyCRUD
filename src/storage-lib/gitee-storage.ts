import { TinyRequest } from "../request-lib/interfaces";
import { GiteeResponse, GiteeStorageOptions, TinyStorage } from "./interfaces";

export abstract class GiteeStorage<T> implements TinyStorage<T> {
    private baseUrl = "https://gitee.com";
    constructor(private options: GiteeStorageOptions) { 
        this.baseUrl = options.baseUrl || this.baseUrl;
    }

    async findOne(): Promise<void> {
        this.options.request.get("");
    }

    async findAll(): Promise<T[]> {
        // const url = `${this.baseUrl}/api/v5/repos/guoxicheng/tiny-crud/issues/${this.issueNumber}/comments`;
        const {owner, repo, number} = this.options;
        const url = `${this.baseUrl}/api/v5/repos/${owner}/${repo}/issues/${number}/comments`;
        const response = await this.options.request.get<GiteeResponse[]>(url);
        return response.map(item => ({
            id: item.id,
            ...JSON.parse(item.body),
            created_at: item.created_at,
            updated_at: item.updated_at
        })) as T[];
    }

}