import { BaseModel } from "./base-model";

export type PlainObject<T extends BaseModel> = Omit<T, keyof BaseModel>;