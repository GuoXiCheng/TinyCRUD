import { BaseModel } from "./base-model";

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PlainObject<T extends BaseModel> = MakeOptional<T, keyof BaseModel>;