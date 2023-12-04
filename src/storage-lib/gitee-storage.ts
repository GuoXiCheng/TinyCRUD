import { TinyRequest } from "../request-lib/interfaces";
import { TinyStorage } from "./interfaces";

export class GiteeStorage implements TinyStorage {
    protected baseUrl = "https://gitee.com";
    constructor(private requestInstance: TinyRequest) { }

    async findOne(): Promise<void> {
        this.requestInstance.get("");
    }

    async findAll(): Promise<any> {
        const url = `${this.baseUrl}/api/v5/repos/guoxicheng/tiny-crud/issues/I8H4X2/comments`;
        return this.requestInstance.get(url);
    }

}