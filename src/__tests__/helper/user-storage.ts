import { GiteeStorage } from '../../storage-lib/gitee-storage';
import { GiteeStorageOptions } from '../../storage-lib/interfaces';

export class UserStorage extends GiteeStorage {
    constructor(options: GiteeStorageOptions) {
        super(options);
    }
}