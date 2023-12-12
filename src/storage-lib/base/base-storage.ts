import { BaseModel } from "./base-model";
import { BaseComment } from "./base-comment";

export abstract class BaseStorage {
    abstract findById(id: number): void;
    abstract find(): void;

    // 序列化: 将对象转换为字符串
    serialize() { }

    // 反序列化: 将字符串转换为对象
    deserialize<M>(comment: BaseComment): M {
        try {
            const {id, body, created_at, updated_at} = comment;
            const obj = JSON.parse(body);
            return {id, ...obj, created_at, updated_at}
        } catch (error) {
            console.error(error);
            throw new Error(`can not deserialize ${comment}`);
        }
    }
}