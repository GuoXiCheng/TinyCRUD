export interface TinyStorage<T> {
    findOne(): void;
    findAll(): Promise<T[]>;
}

export class TinyModel {
    id!: number;
    created_at!: string;
    updated_at!: string;
}