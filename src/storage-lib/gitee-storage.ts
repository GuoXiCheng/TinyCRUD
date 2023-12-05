import { TinyRequest } from "../request-lib/interfaces";
import { TinyModel, TinyStorage } from "./interfaces";

export interface GiteeResponse {
    id: number;
    body: string;
    user: object;
    created_at: string;
    updated_at: string;
}

export abstract class GiteeStorage<T> implements TinyStorage<T> {
    protected baseUrl = "https://gitee.com";
    protected issueNumber!: string;
    constructor(private requestInstance: TinyRequest) { }

    async findOne(): Promise<void> {
        this.requestInstance.get("");
    }

    async findAll(): Promise<T[]> {
        const url = `${this.baseUrl}/api/v5/repos/guoxicheng/tiny-crud/issues/${this.issueNumber}/comments`;
        const response = await this.requestInstance.get<GiteeResponse[]>(url);
        return response.map(item => ({
            id: item.id,
            ...JSON.parse(item.body),
            created_at: item.created_at,
            updated_at: item.updated_at
        })) as T[];
    }

}