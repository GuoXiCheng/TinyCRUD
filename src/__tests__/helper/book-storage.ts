import { GithubStorage } from "../../storage-lib";
import { BookModel } from "./book-model";
import { StartTest } from "./start-test";
const options = {
    request: StartTest.createGithubRequest(),
    issueNumber: StartTest.GITHUB_NUMBER
}
export class BookStorage extends GithubStorage<BookModel> {
    constructor() {
        super(options);
    }
}