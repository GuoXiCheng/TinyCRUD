import { BaseRequest } from "../../request-lib";
import { BaseComment } from "./base-comment";
import { BaseModel } from "./base-model";
import { PlainObject } from "./plain-object";
import { RouteType } from "./route-type";

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

    protected getRoute(routeType: RouteType, id?: number): string {
        switch (routeType) {
            case 'find':
            case 'create':
                return `${this.endpoint}/issues/${this.issueNumber}/comments`;
            case 'findById':
            case 'updateById':
            case 'deleteById':
                return `${this.endpoint}/issues/comments/${id}`;
            default:
                throw new Error(`routeType ${routeType} is not supported`);
        }
    }

    /**
     * Retrieves a list of items from the storage.
     * @returns A promise that resolves to an array of items.
     */
    async find(): Promise<T[]> {
        const url = this.getRoute('find');
        const response = await this.request.get<BaseComment[]>(url);
        return response.map((item) => this.deserialize<T>(item));
    }

    /**
    * Find records by ID.
    * @param id Indicates the ID of the record
    * @returns Matches the record
    */
    async findById(id: number) {
        const url = this.getRoute('findById', id);
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
        const url = this.getRoute('create');
        const body = this.serialize<PlainObject<T>>(data);
        const response = await this.request.post<BaseComment>(url, body);
        return this.deserialize<T>(response);
    }

    /**
     * Updates a record by its ID.
     * @param id - The ID of the record to update.
     * @param data - The updated data for the record.
     * @returns A promise that resolves to the updated record.
     */
    async updateById(id: number, data: PlainObject<T>): Promise<T> {
        const url = this.getRoute('updateById', id);
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
        const url = this.getRoute('deleteById', id);
        await this.request.delete(url);
    }

    /**
     * Deletes all items from the storage.
     * @returns A Promise that resolves when all items are deleted.
     */
    async deleteAll(): Promise<void> {
        const findUrl = this.getRoute('find');
        const findResult = await this.request.get<BaseComment[]>(findUrl);
        await Promise.all(findResult.map((item) => this.deleteById(item.id)));
    }

    // 序列化: 将对象转换为字符串
    serialize<T>(obj: T): string {
        try {
            if (this.useEncrypt && this.encryptFn) {
                return this.encryptFn(JSON.stringify(obj));
            }
            return JSON.stringify(obj);
        } catch (error) {
            console.error(error);
            throw new Error(`can not serialize ${obj}`);
        }
    }

    // 反序列化: 将字符串转换为对象
    deserialize<T>(comment: BaseComment): T {
        try {
            const {id, body, created_at, updated_at} = comment;
            let obj;
            if (this.useEncrypt && this.decryptFn) {
                const decryptedBody = this.decryptFn(body);
                obj = JSON.parse(decryptedBody);
            } else {
                obj = JSON.parse(body);
            }
            return {id, ...obj, created_at, updated_at}
        } catch (error) {
            console.error(error);
            throw new Error(`can not deserialize ${comment}`);
        }
    }
}