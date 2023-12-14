import { GiteeStorage } from '../..';
import { StartTest } from './start-test';
import { UserModel } from './user-model';

export class UserStorage extends GiteeStorage<UserModel> {
    constructor() {
        super(StartTest.createGiteeRequest(), StartTest.getGiteeIssueNumber());
    }
}