import { BaseComment } from "./base-comment";

export abstract class BaseStorage {
    abstract findById(id: number): void;
    abstract find(): Promise<any[]>;
    abstract create(data: any): void;
    abstract deleteById(id: number): Promise<void>;

    async deleteAll() {
        const resultList = await this.find();
        const res = resultList.map((item)=>(this.deleteById(item.id)));
        return Promise.all(res);
    }

    // 序列化: 将对象转换为字符串
    serialize<M>(obj: M): string {
        try {
            return JSON.stringify(obj);
        } catch (error) {
            console.error(error);
            throw new Error(`can not serialize ${obj}`);
        }
    }

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