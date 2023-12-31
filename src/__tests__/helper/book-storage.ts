import { GithubStorage } from "../../storage-lib";
import { SingletonFactory } from "../../utils";
import { BookModel } from "./book-model";
import { GITHUB_NUMBER, githubRequest } from "./helper";

class BookStorage extends GithubStorage<BookModel> {
    constructor() {
        super(githubRequest, GITHUB_NUMBER);
    }
}

/**
 * test github api with a book storage instance.
 */
export const Book = SingletonFactory.createInstance(BookStorage);