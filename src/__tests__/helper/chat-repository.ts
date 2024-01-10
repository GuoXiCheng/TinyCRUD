import { GitlabRepository } from "../../repository-lib";
import { ChatModel } from "./chat-model";
import { GITLAB_NUMBER, gitlabRequest } from "./helper";
import { SingletonFactory } from "../../utils";

class ChatRepository extends GitlabRepository<ChatModel> {
    constructor() {
        super(gitlabRequest, GITLAB_NUMBER);
    }
}

/**
 * test gitlab api with a chat storage instance.
 */
export const Chat = SingletonFactory.createInstance(ChatRepository);