import { GithubRepository, SingletonFactory } from "../../index";
import { BookModel } from "./book-model";
import { githubRequest } from "./helper";

class BookRepository extends GithubRepository<BookModel> {
    constructor() {
        super(githubRequest);
    }
}

/**
 * test github api with a book storage instance.
 */
export const Book = SingletonFactory.createInstance(BookRepository);