import { StartTest } from './start-test';
import { GiteeStorage } from '../../storage-lib/gitee-storage';

export class UserStorage extends GiteeStorage {
    constructor() {
        super(new StartTest().getRequest());
    }
}