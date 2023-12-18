import { GiteeStorage } from '../..';
import { StartTest } from './start-test';
import { UserModel } from './user-model';

const options = {
    request: StartTest.createGiteeRequest(),
    issueNumber: StartTest.GITEE_NUMBER
}
export class UserStorage extends GiteeStorage<UserModel> {

    constructor() {
        super(options);
    }
    
}