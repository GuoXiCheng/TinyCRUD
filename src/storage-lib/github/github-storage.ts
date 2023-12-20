import { BaseRequest } from "../../request-lib";
import { BaseComment } from "../base/base-comment";
import { BaseModel } from "../base/base-model";
import { BaseOptions } from "../base/base-options";
import { BaseStorage } from "../base/base-storage";
import { PlainObject } from "../base/plain-object";

export class GithubStorage<T extends BaseModel> extends BaseStorage<T> {
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
     * Retrieves a list of comments from the GitHub API.
     * @returns A promise that resolves to an array of type T.
     */
    async find(): Promise<T[]> {
        const url = `${this.endpoint}/issues/${this.issueNumber}/comments`;
        const response = await this.request.get<BaseComment[]>(url);
        return response.map((item) => this.deserialize<T>(item));
    }

    /**
     * Find entities based on ID.
     * @param id ID of the entity
     * @returns Returns the found entity
     */
    async findById(id: number): Promise<T> {
        const url = `${this.endpoint}/issues/comments/${id}`;
        const response = await this.request.get<BaseComment>(url);
        return this.deserialize<T>(response);
    }

    /**
     * Creates a new record in the GitHub storage.
     * @param data The data to be stored.
     * @returns A promise that resolves to the created record.
     */
    async create(data: PlainObject<T>): Promise<T> {
        const url = `${this.endpoint}/issues/${this.issueNumber}/comments`;
        const body = this.serialize<PlainObject<T>>(data);
        const response = await this.request.post<BaseComment>(url, body);
        return this.deserialize<T>(response);
    }

    /**
     * Updates a record by its ID.
     * 
     * @param id - The ID of the record to update.
     * @param data - The updated data for the record.
     * @returns A promise that resolves to the updated record.
     */
    async updateById(id: number, data: PlainObject<T>): Promise<T> {
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
     * Deletes all comments associated with the GitHub storage.
     * @returns A Promise that resolves when all comments are deleted.
     */
    async deleteAll(): Promise<void> {
        const findUrl = `${this.endpoint}/issues/${this.issueNumber}/comments`;
        const findResult = await this.request.get<BaseComment[]>(findUrl);
        await Promise.all(findResult.map((item) => this.deleteById(item.id)));
    }
}