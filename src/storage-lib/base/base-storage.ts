import { BaseComment } from "./base-comment";
import { BaseModel } from "./base-model";
import { BaseOptions } from "./base-options";

export abstract class BaseStorage<T extends BaseModel> {
    public readonly useEncrypt: boolean;
    public readonly encryptFn?: (data: string) => string;
    public readonly decryptFn?: (data: string) => string;
    constructor(baseOptions: BaseOptions) {
        this.useEncrypt = baseOptions.request.useEncrypt || false;
        this.encryptFn = baseOptions.request.encryptFn;
        this.decryptFn = baseOptions.request.decryptFn;
    }

    abstract findById(id: number): void;
    abstract find(): Promise<T[]>;
    abstract create(data: any): void;
    abstract deleteById(id: number): Promise<void>;

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