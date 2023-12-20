import { BaseRequest } from "../../request-lib";
import { BaseComment } from "../base/base-comment";
import { BaseModel } from "../base/base-model";
import { BaseOptions } from "../base/base-options";
import { BaseStorage } from "../base/base-storage";
import { PlainObject } from "../base/plain-object";

export class GiteeStorage<T extends BaseModel> extends BaseStorage<T> {
    private endpoint: string;
    private request: BaseRequest;
    private issueNumber: string;

    constructor(baseOptions: BaseOptions) {
        super(baseOptions);

        const { request, issueNumber } = baseOptions;
        this.request = request;
        this.issueNumber = issueNumber;
        this.endpoint = request.getEndpoint();

    }


    /**
     * Retrieves a list of items from the Gitee storage.
     * @returns A promise that resolves to an array of items.
     */
    async find(): Promise<T[]> {
        const url = `${this.endpoint}/issues/${this.issueNumber}/comments`;
        const response = await this.request.get<BaseComment[]>(url);
        return response.map((item) => this.deserialize<T>(item));
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
     * Creates a new record in the Gitee storage.
     * 
     * @param data - The data for the new record, excluding the 'id', 'created_at', and 'updated_at' fields.
     * @returns A promise that resolves to the created record.
     */
    async create(data: PlainObject<T>) {
        const url = `${this.endpoint}/issues/${this.issueNumber}/comments`;
        const body = this.serialize<PlainObject<T>>(data);
        const response = await this.request.post<BaseComment>(url, body);
        return this.deserialize<T>(response);
    }

    /**
     * Updates a record by its ID.
     * @param id - The ID of the record to update.
     * @param data - The updated data for the record, excluding the id, created_at, and updated_at fields.
     * @returns The updated record.
     */
    async updateById(id: number, data: PlainObject<T>) {
        const url = `${this.endpoint}/issues/comments/${id}`;
        const body = this.serialize<PlainObject<T>>(data);
        const response = await this.request.patch<BaseComment>(url, body);
        return this.deserialize<T>(response);
    }

    /**
     * Deletes a comment by its ID.
     * @param id The ID of the comment to delete.
     * @returns A Promise that resolves when the comment is successfully deleted.
     */
    async deleteById(id: number): Promise<void> {
        const url = `${this.endpoint}/issues/comments/${id}`;
        await this.request.delete(url);
    }

    /**
     * Deletes all comments associated with the issue.
     * @returns {Promise<void>} A promise that resolves when all comments are deleted.
     */
    async deleteAll(): Promise<void> {
        const findUrl = `${this.endpoint}/issues/${this.issueNumber}/comments`;
        const findResult = await this.request.get<BaseComment[]>(findUrl);
        await Promise.all(findResult.map((item) => this.deleteById(item.id)));
    }

}