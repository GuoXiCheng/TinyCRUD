import { GitlabStorage } from "../../storage-lib";
import { ChatModel } from "./chat-model";
import { GITLAB_NUMBER, gitlabRequest } from "./helper";

class ChatStorage extends GitlabStorage<ChatModel> {
    private static instance: ChatStorage;
    private constructor() {
        super(gitlabRequest, GITLAB_NUMBER);
    }

    public static getInstance(): ChatStorage {
        if (!ChatStorage.instance) {
            ChatStorage.instance = new ChatStorage();
        }
        return ChatStorage.instance;
    }
}

/**
 * test gitlab api with a chat storage instance.
 */
export const Chat = ChatStorage.getInstance();