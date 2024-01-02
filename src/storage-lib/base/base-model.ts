import { User } from "./user";

export interface BaseModel {
    id: number;
    created_at: string;
    updated_at: string;
    user: User;
}