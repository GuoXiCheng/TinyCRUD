import { BaseRequest } from "../../request-lib";
import { BaseComment } from "../base/base-comment";
import { BaseModel } from "../base/base-model";
import { BaseOptions } from "../base/base-options";
import { BaseStorage } from "../base/base-storage";
import { PlainObject } from "../base/plain-object";

export class GitlabStorage<T extends BaseModel> extends BaseStorage<T> {
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
     * Retrieves a list of items from the GitLab storage.
     * @returns A promise that resolves to an array of items.
     */
    async find(): Promise<T[]> {
        const url = `${this.endpoint}/issues/${this.issueNumber}/notes`;
        const response = await this.request.get<BaseComment[]>(url);
        return response.map((item) => this.deserialize<T>(item));
    }

    /**
     * Finds a record by its ID.
     * @param id - The ID of the record to find.
     * @returns A promise that resolves to the found record.
     */
    async findById(id: number): Promise<T> {
        const url = `${this.endpoint}/issues/${this.issueNumber}/notes/${id}`;
        const response = await this.request.get<BaseComment>(url);
        return this.deserialize<T>(response);
    }

    /**
     * Creates a new entry in the GitLab storage.
     * 
     * @param data The data to be stored.
     * @returns A promise that resolves to the created entry.
     */
    async create(data: PlainObject<T>): Promise<T> {
        const url = `${this.endpoint}/issues/${this.issueNumber}/notes`;
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
        const url = `${this.endpoint}/issues/${this.issueNumber}/notes/${id}`;
        const body = this.serialize<PlainObject<T>>(data);
        const response = await this.request.put<BaseComment>(url, body);
        return this.deserialize<T>(response);
    }

    /**
     * Deletes a note by its ID.
     * @param id - The ID of the note to delete.
     * @returns A Promise that resolves when the note is successfully deleted.
     */
    async deleteById(id: number): Promise<void> {
        const url = `${this.endpoint}/issues/${this.issueNumber}/notes/${id}`;
        await this.request.delete(url);
    }

    /**
     * Deletes all comments associated with the GitLab storage.
     * @returns A Promise that resolves when all comments are deleted.
     */
    async deleteAll(): Promise<void> {
        const findUrl = `${this.endpoint}/issues/${this.issueNumber}/notes`;
        const findResult = await this.request.get<BaseComment[]>(findUrl);
        await Promise.all(findResult.map((item) => this.deleteById(item.id)));
    }
    
}