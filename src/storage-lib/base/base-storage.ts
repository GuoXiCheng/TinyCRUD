import { BaseRequest } from "../../request-lib";
import { BaseComment } from "./base-comment";
import { BaseModel } from "./base-model";
import { BaseParams } from "./base-params";
import { PlainObject } from "./plain-object";
import { RouteType } from "./route-type";
import { User } from "./user";

export abstract class BaseStorage<T extends BaseModel> {
    public readonly useEncrypt: boolean;
    public readonly encryptFn?: (data: string) => string;
    public readonly decryptFn?: (data: string) => string;

    protected endpoint: string;
    constructor(protected request: BaseRequest, protected issueNumber: string) {
        this.endpoint = request.getEndpoint();

        this.useEncrypt = request.useEncrypt || false;
        this.encryptFn = request.encryptFn;
        this.decryptFn = request.decryptFn;
    }

    protected abstract extractUser(comment: BaseComment): User | null;

    protected getRoute(routeType: keyof typeof RouteType, id?: number): string {
        switch (routeType) {
            case RouteType.find:
            case RouteType.create:
                return `${this.endpoint}/issues/${this.issueNumber}/comments`;
            case RouteType.findById:
            case RouteType.updateById:
            case RouteType.deleteById:
                return `${this.endpoint}/issues/comments/${id}`;
            case RouteType.detail:
                return `${this.endpoint}/issues/${this.issueNumber}`
            default:
                throw new Error(`routeType ${routeType} is not supported`);
        }
    }

    /**
     * Finds items in the storage based on the provided parameters.
     * @param params - The parameters used for filtering the items.
     * @returns A promise that resolves to an array of items found in the storage.
     */
    async find(params?: BaseParams): Promise<T[]> {
        const url = this.getRoute(RouteType.find);
        const response = await this.request.get<BaseComment[]>(url, params);
        return response.map((item) => this.deserialize<T>(item));
    }

    /**
    * Find records by ID.
    * @param id Indicates the ID of the record
    * @returns Matches the record
    */
    async findById(id: number) {
        const url = this.getRoute(RouteType.findById, id);
        const response = await this.request.get<BaseComment>(url);
        return this.deserialize<T>(response);
    }

    /**
     * Creates a new record in the storage.
     * 
     * @param data The data to be stored.
     * @returns A promise that resolves to the created record.
     */
    async create(data: PlainObject<T>): Promise<T> {
        const url = this.getRoute(RouteType.create);
        const body = this.serialize<PlainObject<T>>(data);
        const response = await this.request.post<BaseComment>(url, body);
        return this.deserialize<T>(response);
    }


    /**
     * Creates multiple records in the storage.
     * 
     * @param data - An array of objects representing the records to be created.
     * @param order - Specifies whether the records should be created in the order they appear in the array. Default is false.
     * @returns A promise that resolves to an array of created records.
     */
    async createAll(data: PlainObject<T>[], order = false): Promise<T[]> {
        if (order === false) {
            return Promise.all(data.map((item) => this.create(item)));
        }

        const result: T[] = [];
        for (const item of data) {
            result.push(await this.create(item));
        }
        return result;
    }

    /**
     * Updates a record by its ID.
     * @param id - The ID of the record to update.
     * @param data - The updated data for the record.
     * @returns A promise that resolves to the updated record.
     */
    async updateById(id: number, data: PlainObject<T>): Promise<T> {
        const url = this.getRoute(RouteType.updateById, id);
        const body = this.serialize<PlainObject<T>>(data);
        const response = await this.request.patch<BaseComment>(url, body);
        return this.deserialize<T>(response);
    }

    /**
     * Deletes an item from the storage by its ID.
     * @param id The ID of the item to delete.
     * @returns A Promise that resolves when the item is successfully deleted.
     */
    async deleteById(id: number): Promise<void> {
        const url = this.getRoute(RouteType.deleteById, id);
        await this.request.delete(url);
    }

    /**
     * Deletes all items from the storage.
     * @returns A Promise that resolves when all items are deleted.
     */
    async deleteAll(): Promise<void> {
        const findUrl = this.getRoute(RouteType.find);
        const findResult = await this.request.get<BaseComment[]>(findUrl);
        await Promise.all(findResult.map((item) => this.deleteById(item.id)));
    }

    // 序列化: 将对象转换为字符串
    protected serialize<T>(obj: T): string {
        return (this.useEncrypt && this.encryptFn)
            ? this.encryptFn(JSON.stringify(obj))
            : JSON.stringify(obj);
    }

    // 反序列化: 将字符串转换为对象
    protected deserialize<T>(comment: BaseComment): T {
        const { id, body, created_at, updated_at } = comment;

        const parsedBody = this.useEncrypt && this.decryptFn
            ? JSON.parse(this.decryptFn(body))
            : JSON.parse(body);
        const user = this.extractUser(comment);

        return { id, ...parsedBody, created_at, updated_at, user };
    }
}