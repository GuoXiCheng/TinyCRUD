import { StartTest } from './start-test';
import { GiteeStorage } from '../../storage-lib/gitee-storage';
import { UserModel } from './user-model';

export class UserStorage extends GiteeStorage<UserModel> {
    issueNumber = "I8H4X2";
    constructor() {
        super(new StartTest().getRequest());
    }
}