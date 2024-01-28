import { writeJSONSync } from "../helper/helper";

export abstract class BaseMock {
    constructor(filename: string) {
        writeJSONSync(filename, []);
    }

    setUpMock() {
        this.mockUser();
        this.mockCreate();
        this.mockFind();
        this.mockFindById();
        this.mockUpdateById();
        this.mockDeleteById();
        this.mockDetail();
    }

    abstract mockUser(): void;
    abstract mockCreate(): void;
    abstract mockFind(): void;
    abstract mockFindById(): void;
    abstract mockUpdateById(): void;
    abstract mockDeleteById(): void;
    abstract mockDetail(): void;
}