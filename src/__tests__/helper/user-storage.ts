import { GiteeStorage } from '../../storage-lib/gitee-storage';
import { UserModel } from './user-model';
import { GiteeStorageOptions } from '../../storage-lib/interfaces';

export class UserStorage extends GiteeStorage<UserModel> {
    constructor(options: GiteeStorageOptions) {
        super(options);
    }
}