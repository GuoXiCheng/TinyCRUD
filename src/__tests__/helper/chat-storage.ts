import { GitlabStorage } from "../../storage-lib";
import { ChatModel } from "./chat-model";
import { GITLAB_NUMBER, gitlabRequest } from "./helper";

export class ChatStorage extends GitlabStorage<ChatModel> {
    constructor() {
        super(gitlabRequest, GITLAB_NUMBER);
    }
}