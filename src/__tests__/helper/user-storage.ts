import { GiteeStorage } from '../../storage-lib/gitee/gitee-storage';
import { StartTest } from './start-test';

export class UserStorage extends GiteeStorage {
    constructor() {
        super(StartTest.createGiteeRequest(), StartTest.getGiteeIssueNumber());
    }
}