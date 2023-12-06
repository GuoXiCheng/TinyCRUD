import { TinyRequest } from "../request-lib/interfaces";

export interface TinyStorage<T> {
    findOne(): void;
    findAll(): Promise<T[]>;
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