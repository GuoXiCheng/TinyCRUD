import { TinyRequest } from "../request-lib/tiny-request";

export interface TinyStorage {
    findById(): void;
    find(): void;
}

export class TinyModel {
    id!: number;
    created_at!: string;
    updated_at!: string;
}

export interface GiteeResponse {
    id: number;
    body: string;
    user: object;
    created_at: string;
    updated_at: string;
}

export interface GiteeStorageOptions {
    request: TinyRequest;
    owner: string;
    repo: string;
    number: string;
    baseUrl?: string;
}