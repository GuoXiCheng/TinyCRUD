import { BaseRequest } from "../../request-lib";
import { BaseComment } from "../base/base-comment";
import { BaseModel } from "../base/base-model";
import { BaseStorage } from "../base/base-storage";

export class GiteeStorage<T extends BaseModel> extends BaseStorage {
    private endpoint: string;

    constructor(private request: BaseRequest, private issueNumber: string) {
        super();
        this.endpoint = request.getEndpoint();
    }

    /**
     * Find records by ID.
     * @param id Indicates the ID of the record
     * @returns Matches the record
     */
    async findById(id: number) {
        const url = `${this.endpoint}/issues/comments/${id}`;
        const response = await this.request.get<BaseComment>(url);
        return this.deserialize<T>(response);
    }

    /**
     * Retrieves a list of comments from the Gitee storage.
     * @returns {Promise<T[]>} A promise that resolves to an array of deserialized comments.
     */
    async find(): Promise<T[]> {
        const url = `${this.endpoint}/issues/${this.issueNumber}/comments`;
        const response = await this.request.get<BaseComment[]>(url);
        return response.map((item)=>this.deserialize<T>(item));
    }

    /**
     * Creates a new record in the Gitee storage.
     * 
     * @param data - The data for the new record, excluding the 'id', 'created_at', and 'updated_at' fields.
     * @returns A promise that resolves to the created record.
     */
    async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>) {
        const url = `${this.endpoint}/issues/${this.issueNumber}/comments`;
        const response = await this.request.post<BaseComment>(url, {body: this.serialize<Omit<T, 'id' | 'created_at' | 'updated_at'>>(data)});
        return this.deserialize<T>(response);
    }

    /**
     * Deletes a comment by its ID.
     * @param id The ID of the comment to delete.
     * @returns A Promise that resolves when the comment is successfully deleted.
     */
    async deleteById(id: number): Promise<void> {
        const url = `${this.endpoint}/issues/comments/${id}`;
        return await this.request.delete(url);
    }

}