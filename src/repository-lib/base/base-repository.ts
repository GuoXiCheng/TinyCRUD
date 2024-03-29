import { BaseRequest } from "../../request-lib/base/base-request";
import { Author } from "./author";
import { BaseComment } from "./base-comment";
import { BaseModel } from "./base-model";
import { BaseParams } from "./base-params";
import { PlainObject } from "./plain-object";
import { RouteType } from "./route-type";

export abstract class BaseRepository<T extends BaseModel> {
    protected endpoint: string;
    protected issueNumber: string;
    protected readonly useEncrypt: boolean;
    protected readonly encryptFn?: (data: string) => string;
    protected readonly decryptFn?: (data: string) => string;

    constructor(protected request: BaseRequest, issueNumber?: string) {
        this.endpoint = request.getEndpoint();

        const { useEncrypt, encryptFn, decryptFn } = request.options;
        this.useEncrypt = useEncrypt || false;
        this.encryptFn = encryptFn;
        this.decryptFn = decryptFn;

        if (request.options.issueNumber != null) {
            this.issueNumber = request.options.issueNumber;
        } else if (issueNumber != null) {
            this.issueNumber = issueNumber;
        } else {
            throw new Error('issueNumber is required');
        }
    }

    protected abstract extractUser(comment: BaseComment): Author | null;

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
     * Cleans the provided parameters by removing any properties with null or undefined values.
     * @param params - The parameters to be cleaned.
     * @returns The cleaned parameters or undefined if all properties are null or undefined.
     */
    protected cleanParams(params?: BaseParams): BaseParams | undefined {
        if (params == null) return;
        const copyParams = JSON.parse(JSON.stringify(params));
        return Object.keys(copyParams).length > 0 ? copyParams : undefined;
    }

    /**
     * Finds items in the storage based on the provided parameters.
     * @param params - The parameters used for filtering the items.
     * @returns A promise that resolves to an array of items found in the storage.
     */
    async find(params?: BaseParams): Promise<T[]> {
        const url = this.getRoute(RouteType.find);
        const response = await this.request.get<BaseComment[]>(url, this.cleanParams(params));
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
        const created_by = this.extractUser(comment);

        const result: T = {
            id,
            ...parsedBody,
            updated_at,
            created_at,
            created_by
        }

        return result;
    }
}