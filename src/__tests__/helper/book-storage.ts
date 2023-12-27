import { GithubStorage } from "../../storage-lib";
import { BookModel } from "./book-model";
import { GITHUB_NUMBER, githubRequest } from "./helper";

class BookStorage extends GithubStorage<BookModel> {
    private static instance: BookStorage;
    private constructor() {
        super(githubRequest, GITHUB_NUMBER);
    }

    public static getInstance(): BookStorage {
        if (!BookStorage.instance) {
            BookStorage.instance = new BookStorage();
        }
        return BookStorage.instance;
    }
}

/**
 * test github api with a book storage instance.
 */
export const Book = BookStorage.getInstance();