import { GithubStorage } from "../../storage-lib";
import { BookModel } from "./book-model";
import { GITHUB_NUMBER, githubRequest } from "./helper";

export class BookStorage extends GithubStorage<BookModel> {
    constructor() {
        super(githubRequest, GITHUB_NUMBER);
    }
}