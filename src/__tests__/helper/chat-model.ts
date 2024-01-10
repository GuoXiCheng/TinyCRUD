import { BaseModel } from "../../repository-lib";

export interface ChatModel extends BaseModel {
    participants: string[];
    messages: Array<{from: string; to: string; message: string}>;
}