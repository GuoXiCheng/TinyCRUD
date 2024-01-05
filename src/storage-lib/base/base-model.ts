import { Author } from "./author";
export interface BaseModel {
    id: number;
    updated_at: string;
    created_at: string;
    created_by: Author;
}