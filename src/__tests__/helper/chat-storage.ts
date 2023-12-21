import { GitlabStorage } from "../../storage-lib";
import { ChatModel } from "./chat-model";
import { StartTest } from "./start-test";

const options = {
    request: StartTest.createGitlabRequest(),
    issueNumber: StartTest.GITLAB_NUMBER
}
export class ChatStorage extends GitlabStorage<ChatModel> {
    constructor() {
        super(options);
    }
}